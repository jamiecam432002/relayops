/**
 * RelayOps Stage 2D — send-employee-invitation
 *
 * Authenticated caller -> RLS-scoped Supabase RPC -> Resend email.
 * This deliberately does not use a service-role database client.
 * Prerequisites: Stage 2C invitation RPCs have been deployed.
 */
import { withSupabase } from 'npm:@supabase/server@1'

type InviteRole = 'admin' | 'dispatcher' | 'technician'

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const roles = new Set<string>(['admin', 'dispatcher', 'technician'])

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }
    return entities[character]
  })
}

function config() {
  const resendKey = Deno.env.get('RESEND_API_KEY')
  const from = Deno.env.get('INVITE_FROM_EMAIL')
  const appUrl = Deno.env.get('APP_URL')
  if (!resendKey || !from || !appUrl) return null

  try {
    const url = new URL(appUrl)
    if (url.protocol !== 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
      return null
    }
    return { resendKey, from, appUrl: url }
  } catch {
    return null
  }
}

export default {
  fetch: withSupabase({ auth: 'user' }, async (request, ctx) => {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 })
    }

    // Validate configuration BEFORE inserting an invitation.
    const env = config()
    if (!env) {
      return Response.json({ error: 'Invitation email is not configured' }, { status: 503 })
    }

    let body: Record<string, unknown>
    try {
      const parsed: unknown = await request.json()
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body')
      body = parsed as Record<string, unknown>
    } catch {
      return Response.json({ error: 'A JSON request body is required' }, { status: 400 })
    }

    const organizationId = body.organizationId
    const rawEmail = body.email
    const rawRole = body.role

    if (typeof organizationId !== 'string' || !uuidPattern.test(organizationId)) {
      return Response.json({ error: 'Invalid organization' }, { status: 400 })
    }
    if (typeof rawEmail !== 'string') {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }
    const email = rawEmail.trim().toLowerCase()
    if (email.length > 254 || !emailPattern.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (typeof rawRole !== 'string' || !roles.has(rawRole)) {
      return Response.json({ error: 'Invalid role' }, { status: 400 })
    }
    const role = rawRole as InviteRole

    // This query is RLS-scoped: the caller must be an active member to see the org.
    const { data: organization, error: orgError } = await ctx.supabase
      .from('organizations')
      .select('name')
      .eq('id', organizationId)
      .single()

    if (orgError || !organization) {
      return Response.json({ error: 'Organization not available' }, { status: 403 })
    }

    // Important: THIS RPC checks active admin rights and writes the invitation.
    // No membership is created until a verified user accepts it.
    const { data: invitationId, error: invitationError } = await ctx.supabase.rpc(
      'create_employee_invitation',
      { p_organization_id: organizationId, p_email: email, p_role: role },
    )

    if (invitationError) {
      const status = invitationError.code === '23505' ? 409
        : invitationError.code === '42501' ? 403 : 400
      return Response.json(
        { error: status === 409 ? 'A pending invitation or membership already exists'
          : status === 403 ? 'Not authorized to invite employees' : 'Could not create invitation' },
        { status },
      )
    }

    if (typeof invitationId !== 'string') {
      return Response.json({ error: 'Invitation returned an unexpected result' }, { status: 500 })
    }

    // Fixed application URL from server configuration; no arbitrary redirect URL
    // can be supplied by the browser.
    const acceptUrl = new URL('/accept-invitation', env.appUrl)
    acceptUrl.searchParams.set('invitation', invitationId)
    const orgName = organization.name as string
    const html = `
      <p>You've been invited to join <strong>${escapeHtml(orgName)}</strong>
      on RelayOps as a <strong>${escapeHtml(role)}</strong>.</p>
      <p><a href="${escapeHtml(acceptUrl.toString())}">Accept your invitation</a></p>
      <p>This invitation expires in 7 days. Please sign in or create an account
      using the invited email address, and verify that email before accepting.</p>
    `
    const emailText = `You've been invited to join ${orgName} on RelayOps as a ${role}.\n\n` +
      `Accept invitation: ${acceptUrl.toString()}\n\n` +
      `This invitation expires in 7 days. Sign in using ${email} and verify that email before accepting.`

    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.resendKey}`,
          'Content-Type': 'application/json',
          // Resend deduplicates a given key for up to 24 hours.
          'Idempotency-Key': `relayops-invitation-${invitationId}`,
        },
        body: JSON.stringify({
          from: env.from,
          to: [email],
          subject: `Invitation to join ${orgName} on RelayOps`,
          html,
          text: emailText,
        }),
      })

      if (!emailResponse.ok) {
        console.error('Email provider rejected invitation', {
          invitationId, status: emailResponse.status,
        })
        // The invitation has ALREADY been saved to Postgres.
        return Response.json(
          { error: 'Invitation saved, but email delivery failed', invitationId },
          { status: 502 },
        )
      }
    } catch {
      console.error('Email provider request failed', { invitationId })
      return Response.json(
        { error: 'Invitation saved, but email delivery failed', invitationId },
        { status: 502 },
      )
    }

    return Response.json({ invitationId, emailRequested: true })
  }),
}
