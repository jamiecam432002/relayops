import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.VITE_SUPABASE_URL,
	process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
		process.env.VITE_SUPABASE_ANON_KEY,
	{
		auth: {
			persistSession: false,
			autoRefreshToken: false,
		},
	},
);

async function acceptInvitation() {
	// Sign in as the invited Northstar administrator
	const { data: authData, error: authError } =
		await supabase.auth.signInWithPassword({
			email: process.env.TEST_RECIPIENT_EMAIL,
			password: process.env.TEST_RECIPIENT_PASSWORD,
		});

	if (authError) throw authError;

	console.log('Signed in as:', authData.user.email);

	// Accept Summit Electrical's invitation
	const { data: membershipId, error } = await supabase.rpc(
		'accept_employee_invitation',
		{
			p_invitation_id: process.env.TEST_INVITATION_ID,
		},
	);

	if (error) throw error;

	console.log('Invitation accepted!');
	console.log('New membership ID:', membershipId);
}

acceptInvitation().catch((error) => {
	console.error('Acceptance failed:', error.message);
	process.exitCode = 1;
});
