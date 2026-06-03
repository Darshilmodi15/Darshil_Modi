# 🚀 Quick Start Checklist

## Before You Run

### Step 1: Environment Variables (.env.local)

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email (Resend)
RESEND_API_KEY=re_xxxxx...
ADMIN_EMAIL=your-email@example.com
ADMIN_NAME=Darshil Modi

# NextAuth
NEXTAUTH_SECRET=generate-with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
MISSION_CONTROL_EMAIL=admin@example.com
MISSION_CONTROL_PASSWORD=your_secure_password
```

### Step 2: Database Migration

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** → **New Query**
4. Copy **entire** contents of `supabase/schema.sql`
5. Paste into SQL editor
6. Click **Run**
7. Wait for "Query executed successfully"

### Step 3: Verify Tables Created

```sql
-- Run this query to verify:
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

Should show:
- `assistant_interactions`
- `contact_messages`
- `visitors`

---

## Local Testing

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Test homepage
# - Open http://localhost:3000
# - Check browser console for errors
# - Should see visitor tracked in Supabase

# 4. Test contact form
# - Fill form and submit
# - Check inbox for admin notification
# - Check spam folder for auto-reply

# 5. Test dashboard
# - Go to http://localhost:3000/mission-control/login
# - Login with MISSION_CONTROL_EMAIL and MISSION_CONTROL_PASSWORD
# - Verify metrics display
```

---

## Production Deployment (Vercel)

### Step 1: Add Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. **Settings** → **Environment Variables**
4. Add all 8 environment variables from `.env.local`
5. Click **Save**

### Step 2: Deploy

```bash
git add .
git commit -m "feat: real-time analytics dashboard with live data"
git push origin main
```

Vercel auto-deploys. Wait for build to complete.

### Step 3: Test Production

1. Visit your production domain
2. Contact form should work
3. Dashboard should display data
4. Check emails arrive

---

## Files Changed

✅ **New Files**
- `components/visitor-tracker.tsx`
- `app/api/contact/delete/route.ts`
- `IMPLEMENTATION_GUIDE.md` (this guide)
- `SETUP_CHECKLIST.md` (you're reading it!)

✅ **Enhanced Files**
- `supabase/schema.sql` - Added indexes, RLS
- `lib/supabase.ts` - Better types, more metrics
- `app/api/track-visitor/route.ts` - Duplicate prevention
- `app/api/contact/route.ts` - Auto-reply emails
- `components/admin-dashboard.tsx` - Real data panels
- `components/recent-messages.tsx` - Delete feature
- `components/home-page.tsx` - Visitor tracking

---

## What Gets Tracked

### Visitors Table
- Country (IP geolocation)
- City (IP geolocation)
- IP Hash (SHA256 with salt)
- User Agent
- Timestamp

### Contact Messages Table
- Name
- Email
- Subject (optional)
- Message
- Read/Unread Status
- Timestamp

### Assistant Interactions Table
- Question
- Timestamp

---

## Dashboard Features

✅ **Metrics**
- Total visitors (all-time)
- Today's visitors
- This week visitors (7 days)
- This month visitors (30 days)
- Countries reached (unique)
- Total messages
- Unread messages
- AI questions

✅ **Panels**
- Recent visitors (last 20) with country/city/time
- Recent messages (last 20) with read/unread/delete
- Top countries with visitor count
- Top cities with visitor count
- Recent activity feed (combined)
- Recent AI questions

---

## Troubleshooting

**No visitors appearing?**
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct
- Manually test: visit homepage, check browser console
- In Supabase, run: `SELECT * FROM visitors;`

**Emails not sending?**
- Check `RESEND_API_KEY` format (should start with `re_`)
- Check `ADMIN_EMAIL` is correct
- Verify domain is whitelisted in Resend
- Check email spam folder

**Dashboard shows 0 data?**
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Check tables exist in Supabase
- Try manual insert: `INSERT INTO visitors (country) VALUES ('Test');`
- Refresh dashboard

**Login not working?**
- Check `MISSION_CONTROL_EMAIL` and `MISSION_CONTROL_PASSWORD` match `.env.local`
- Verify `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again

---

## Key Security Points

✅ Service role key only in server code
✅ IPs hashed before storage (SHA256)
✅ Email validation on forms
✅ NextAuth protects dashboard
✅ No hardcoded credentials
✅ Parameterized database queries

---

## Support Resources

- **Schema Issues?** → Check `supabase/schema.sql`
- **Type Errors?** → Check `lib/supabase.ts`
- **API Issues?** → Check `/app/api/` routes
- **Email Issues?** → Check `RESEND_API_KEY` and `ADMIN_EMAIL`
- **Data Not Showing?** → Check environment variables

---

## Next Steps

1. ✅ Set environment variables
2. ✅ Run database migration
3. ✅ Test locally with `npm run dev`
4. ✅ Deploy to Vercel
5. ✅ Monitor real data flowing in
6. 🎉 Analytics dashboard live!

---

**Questions?** Check `IMPLEMENTATION_GUIDE.md` for detailed documentation.

Good luck! 🚀
