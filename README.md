# Mission Log

A space-observatory themed portfolio for Darshil Modi.

## Local Development

```bash
npm install
npm run dev
```

The private dashboard is available at `/mission-control`. In local development, if `MISSION_CONTROL_EMAIL` and `MISSION_CONTROL_PASSWORD` are not set, the login page shows temporary local credentials. Set the environment variables before deploying.

Create a `.env.local` file with at least these values:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MISSION_CONTROL_EMAIL`
- `MISSION_CONTROL_PASSWORD`
- `NEXTAUTH_SECRET` (required for production)
- `RESEND_API_KEY` (for email notifications; get from [resend.com](https://resend.com))
- `ADMIN_EMAIL` (address that receives contact notifications, e.g. your email)

Create the required Supabase tables using `supabase/schema.sql`:

- `visitors` (with country, city, ip_hash tracking)
- `contact_messages` (with subject and is_read status)
- `assistant_interactions` (with question tracking)

If using the Supabase CLI:

```bash
supabase db query supabase/schema.sql
```

Otherwise, paste the SQL from `supabase/schema.sql` into the Supabase SQL editor.

Add your profile portrait at `public/darshil-photo.jpg`; the hero has a fallback frame until that file exists.

## Features

- **Real-time Dashboard**: Live visitor, message, and interaction counts from Supabase
- **Email Notifications**: Instant email alerts when contact forms are submitted (via Resend)
- **Activity Feed**: Recent visitors, messages, and AI interactions
- **Geographic Insights**: Top countries and cities by visitor count
- **Message Management**: Track read/unread status for contact submissions
