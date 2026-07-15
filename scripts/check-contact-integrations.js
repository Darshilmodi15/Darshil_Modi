const { createClient } = require('@supabase/supabase-js');

async function main() {
  const required = ['SUPABASE_URL', 'RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'ADMIN_EMAIL'];
  const missing = required.filter((name) => !process.env[name]);
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secret) missing.push('SUPABASE_SECRET_KEY');

  if (missing.length) {
    console.error('Missing environment variables:', missing.join(', '));
    process.exitCode = 1;
  } else {
    console.log('Environment configuration present.');
  }

  if (process.env.SUPABASE_URL && secret) {
    const supabase = createClient(process.env.SUPABASE_URL, secret, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const testEmail = `contact-test-${Date.now()}@example.com`;
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: 'Contact Integration Test',
        email: testEmail,
        subject: 'Integration test',
        message: 'This temporary row verifies contact_messages insert and delete access.',
        is_read: false
      })
      .select('id, created_at')
      .single();

    if (error) {
      console.error('[CONTACT_DB_ERROR]', { code: error.code, message: error.message, details: error.details, hint: error.hint });
      process.exitCode = 1;
    } else {
      console.log('Supabase test insert ok:', data.id);
      const { error: deleteError } = await supabase.from('contact_messages').delete().eq('id', data.id);
      if (deleteError) {
        console.error('[CONTACT_DB_ERROR] test cleanup failed:', deleteError.message);
        process.exitCode = 1;
      } else {
        console.log('Supabase test row deleted.');
      }
    }
  }

  if (process.env.CONTACT_INTEGRATION_TEST_EMAIL === 'true') {
    console.log('CONTACT_INTEGRATION_TEST_EMAIL=true detected. Run a manual contact form test to send real email.');
  } else {
    console.log('Email send skipped. Set CONTACT_INTEGRATION_TEST_EMAIL=true for manual email testing.');
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
