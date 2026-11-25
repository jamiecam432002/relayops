
import { createClient } from "@supabase/supabase-js";

// Use the same Supabase URL and public API key
// that your React application uses.
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function testInvitation() {
  // STEP 1: Sign in as your existing admin.
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: process.env.TEST_ADMIN_EMAIL,
      password: process.env.TEST_ADMIN_PASSWORD,
    });

  if (authError) {
    console.error("Login failed:", authError.message);
    return;
  }

    console.log("Logged in:", authData.user.email);
    return;

  // STEP 2: Invoke our deployed Edge Function.
  const { data, error } =
    await supabase.functions.invoke(
      "send-employee-invitation",
      {
        body: {
          organizationId:
            process.env.TEST_ORGANIZATION_ID,
          email: process.env.TEST_RECIPIENT_EMAIL,
          role: "technician",
        },
      }
    );

  if (error) {
    console.error("Invitation failed:", error.message);

    if (error.context instanceof Response) {
      console.error(
        "Function response:",
        await error.context.text()
      );
    }

    return;
  }

  console.log("Invitation result:", data);
}

testInvitation().catch(console.error);
