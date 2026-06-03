# 📚 Complete Reference Guide

## 1. Database Schema

### Visitors Table
```sql
CREATE TABLE visitors (
  id uuid PRIMARY KEY,
  country text,
  city text,
  ip_hash text,              -- SHA256 hashed IP
  user_agent text,
  created_at timestamptz
);

-- Indexes for fast queries
CREATE INDEX idx_visitors_created_at ON visitors (created_at DESC);
CREATE INDEX idx_visitors_country ON visitors (country);
CREATE INDEX idx_visitors_ip_hash ON visitors (ip_hash);
```

### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz
);

-- Indexes for performance
CREATE INDEX idx_contact_messages_created_at ON contact_messages (created_at DESC);
CREATE INDEX idx_contact_messages_is_read ON contact_messages (is_read);
CREATE INDEX idx_contact_messages_read_created ON contact_messages (is_read, created_at DESC);
```

### Assistant Interactions Table
```sql
CREATE TABLE assistant_interactions (
  id uuid PRIMARY KEY,
  question text NOT NULL,
  created_at timestamptz
);

CREATE INDEX idx_assistant_interactions_created_at ON assistant_interactions (created_at DESC);
```

---

## 2. API Endpoints Reference

### Track Visitor
```
POST /api/track-visitor

Request:
{
  "country": "United States",
  "city": "San Francisco"
}

Response:
{
  "ok": true,
  "isDuplicate": false
}

Features:
- Automatic IP hashing (SHA256)
- 5-minute duplicate prevention
- Handles geolocation API failures gracefully
```

### Contact Form
```
POST /api/contact

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in..."
}

Response:
{
  "ok": true
}

Side Effects:
- Admin notification email sent
- Auto-reply email sent to sender
- Message stored in Supabase
- Emails are non-blocking
```

### Mark Message Read/Unread
```
POST /api/contact/mark-read

Request:
{
  "id": "uuid-here",
  "is_read": true
}

Response:
{
  "ok": true
}
```

### Delete Message
```
POST /api/contact/delete

Request:
{
  "id": "uuid-here"
}

Response:
{
  "ok": true
}
```

### Track AI Interaction
```
POST /api/mission-control/interactions

Request:
{
  "question": "How do you handle state management?"
}

Response:
{
  "ok": true
}
```

---

## 3. TypeScript Types

### DashboardMetrics
```typescript
export type DashboardMetrics = {
  totalVisitors: number;
  todayVisitors: number;
  weekVisitors: number;
  monthVisitors: number;
  countriesReached: number;
  totalMessages: number;
  unreadMessages: number;
  latestMessage?: ContactMessage;
  totalInteractions: number;
  recentInteractions: { question: string; timestamp: string }[];
  recentMessages: ContactMessage[];
  recentVisitors: RecentVisitor[];
  topCountries: { country: string; count: number }[];
  topCities: { city: string; count: number }[];
  recentActivity: ActivityEvent[];
};
```

### ContactMessage
```typescript
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  createdAt: string;
};
```

### RecentVisitor
```typescript
export type RecentVisitor = {
  id: string;
  country: string;
  city: string;
  visitedAt: string;
};
```

### ActivityEvent
```typescript
export type ActivityEvent = {
  id: string;
  type: "visitor" | "contact" | "question";
  title: string;
  detail: string;
  timestamp: string;
};
```

---

## 4. Component Props

### AdminDashboard
```typescript
<AdminDashboard metrics={DashboardMetrics} />
```

### RecentMessages
```typescript
<RecentMessages 
  initialMessages={ContactMessage[]} 
/>
```

### VisitorTracker
```typescript
<VisitorTracker />  // No props - self-contained
```

---

## 5. Utility Functions in lib/supabase.ts

### getDashboardMetrics()
```typescript
// Main function - fetches all dashboard data
// Returns: Promise<DashboardMetrics>
// Performance: Single function with 7+ batched queries
// Usage: const metrics = await getDashboardMetrics();
```

### getSupabaseAdminClient()
```typescript
// Creates Supabase client with service role
// Returns: SupabaseClient | null
// Security: Only exported for internal use
// Usage: const supabase = getSupabaseAdminClient();
```

### countRows()
```typescript
// Counts rows in table with optional filters
// Parameters: table, filters
// Returns: Promise<number>
// Usage: const count = await countRows(supabase, "visitors");
```

### countDistinct()
```typescript
// Counts distinct values in column
// Parameters: table, column, filters
// Returns: Promise<number>
// Usage: const countries = await countDistinct(supabase, "visitors", "country");
```

### getDateRangeFilters()
```typescript
// Gets ISO date N days in the past
// Parameters: days number
// Returns: string (ISO date)
// Usage: const weekAgo = getDateRangeFilters(7);
```

---

## 6. Environment Variables Required

```env
# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Service (Resend)
RESEND_API_KEY=re_xxxxx...
ADMIN_EMAIL=your-email@example.com
ADMIN_NAME=Darshil Modi (optional)

# NextAuth Configuration
NEXTAUTH_SECRET=generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
MISSION_CONTROL_EMAIL=admin@example.com
MISSION_CONTROL_PASSWORD=your_secure_password
```

---

## 7. File Locations Quick Reference

| Feature | File | Type |
|---------|------|------|
| Database Schema | `supabase/schema.sql` | SQL |
| Core Types & Queries | `lib/supabase.ts` | TypeScript |
| Dashboard Component | `components/admin-dashboard.tsx` | React |
| Message Inbox | `components/recent-messages.tsx` | React |
| Visitor Tracking | `components/visitor-tracker.tsx` | React |
| Home Page | `components/home-page.tsx` | React |
| Authentication | `lib/auth.ts` | TypeScript |
| Mission Control Page | `app/mission-control/page.tsx` | React |
| Contact API | `app/api/contact/route.ts` | Next.js API |
| Contact Delete API | `app/api/contact/delete/route.ts` | Next.js API |
| Contact Mark Read API | `app/api/contact/mark-read/route.ts` | Next.js API |
| Visitor Tracking API | `app/api/track-visitor/route.ts` | Next.js API |
| AI Interactions API | `app/api/mission-control/interactions/route.ts` | Next.js API |

---

## 8. Data Flow Diagrams

### Visitor Tracking Flow
```
HomePage.tsx
    ↓
VisitorTracker component
    ↓
useEffect hook
    ↓
fetch ipapi.co
    ↓
hash IP with SHA256
    ↓
POST /api/track-visitor
    ↓
Check for duplicates (5-min window)
    ↓
Insert into Supabase visitors table
    ↓
Dashboard query fetches updated data
    ↓
AdminDashboard displays new visitor
```

### Contact Form Flow
```
ContactForm.tsx
    ↓
User fills and submits
    ↓
POST /api/contact
    ↓
Validate email format
    ↓
Insert into Supabase contact_messages
    ↓
Send admin notification (non-blocking)
    ↓
Send auto-reply to user (non-blocking)
    ↓
Return { ok: true }
    ↓
Form shows success message
    ↓
Dashboard updates with new message
```

### Dashboard Load Flow
```
User navigates to /mission-control
    ↓
NextAuth checks session
    ↓
If authenticated, load mission-control/page.tsx
    ↓
Call getDashboardMetrics()
    ↓
7+ batched database queries
    ↓
Compute metrics (unique countries, aggregations)
    ↓
Return DashboardMetrics object
    ↓
Pass to AdminDashboard component
    ↓
Component renders all panels with live data
```

---

## 9. Email Templates

### Admin Notification
```html
<!-- Subject: New Contact: [subject] -->
<!-- Contains: -->
- Sender name, email, subject
- Full message text
- Submission timestamp
- Professional formatting
- Gold accent color (#d4af37)
```

### Auto-Reply
```html
<!-- Subject: Thank you for contacting me -->
<!-- Contains: -->
- Greeting with sender name
- Confirmation of receipt
- Next steps (24-48 hour response)
- Branding (Mission Log)
- Note not to reply
- Automatic message disclaimer
```

---

## 10. Performance Considerations

### Query Optimization
- Uses Supabase `head: true, count: "exact"` for count-only queries
- Selective field queries (not `SELECT *`)
- Indexed columns for WHERE clauses
- Batch queries with `Promise.all()` instead of sequential

### Caching Strategy
- Dashboard uses `force-dynamic` to always fetch fresh data
- Client-side aggregations for geographic data
- No Redis/in-memory cache (keep it simple)

### Network Optimization
- Visitor tracking is non-blocking
- Email sending is non-blocking
- API routes optimized for Vercel serverless
- Minimal payload sizes

### Database Optimization
- 9 indexes on key columns
- Composite indexes for common query patterns
- Row-level security enabled
- No N+1 query problems

---

## 11. Security Checklist

✅ **Authentication**
- [ ] NextAuth configured for /mission-control
- [ ] Credentials stored in env variables
- [ ] JWT tokens used for sessions
- [ ] Logout available

✅ **Authorization**
- [ ] Service role key only in server code
- [ ] Dashboard protected by NextAuth
- [ ] API routes validate input
- [ ] No public access to admin endpoints

✅ **Data Protection**
- [ ] IPs hashed with SHA256 + salt
- [ ] Email validation on forms
- [ ] Parameterized Supabase queries
- [ ] Row-level security enabled

✅ **Communication**
- [ ] HTTPS in production (Vercel)
- [ ] No sensitive data in logs
- [ ] Email from trusted domain

---

## 12. Troubleshooting Decision Tree

```
Issue: No data showing in dashboard?
├─ Check SUPABASE_URL and SERVICE_ROLE_KEY
├─ Verify tables exist: SELECT * FROM visitors;
├─ Manually insert test data
└─ Refresh dashboard

Issue: Emails not sending?
├─ Check RESEND_API_KEY format
├─ Verify ADMIN_EMAIL is set
├─ Check domain whitelisted in Resend
├─ Look in spam folder
└─ Check Resend logs

Issue: Visitor tracking not working?
├─ Check browser console for errors
├─ Verify geolocation API accessible
├─ Check ip_hash is being hashed
├─ Verify 5-min duplicate window
└─ Check Supabase visitors table

Issue: Dashboard shows 0 visitors?
├─ Check visitors table has data
├─ Verify date filter logic
├─ Check index performance
└─ Try manual count query

Issue: Login not working?
├─ Check MISSION_CONTROL_EMAIL/PASSWORD
├─ Verify NEXTAUTH_SECRET is set
├─ Clear browser cookies
└─ Check NextAuth configuration
```

---

## 13. Common Customizations

### Change Duplicate Prevention Window
`app/api/track-visitor/route.ts`
```typescript
// Change from 5 minutes to 10 minutes
const fiveMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
```

### Change Recent Visitors Limit
`lib/supabase.ts`
```typescript
// Change from 20 to 50 recent visitors
.limit(50)
```

### Change Top Countries/Cities Count
`lib/supabase.ts`
```typescript
// Change from top 10 to top 20
.slice(0, 20)
```

### Change Dashboard Refresh Rate
`app/mission-control/page.tsx`
```typescript
// Add ISR or revalidate
export const revalidate = 60; // Revalidate every 60 seconds
```

---

## 14. Testing Commands

```bash
# Test visitor tracking
curl -X POST http://localhost:3000/api/track-visitor \
  -H "Content-Type: application/json" \
  -d '{"country":"US","city":"SF"}'

# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test",
    "email":"test@example.com",
    "subject":"Test",
    "message":"Test message"
  }'

# Query visitors in Supabase
SELECT COUNT(*) FROM visitors;

# Query recent messages
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 10;

# Query by country
SELECT country, COUNT(*) as count 
FROM visitors 
GROUP BY country 
ORDER BY count DESC;
```

---

## 15. Deployment Checklist

- [ ] All env vars set in `.env.local`
- [ ] Database migration completed
- [ ] Tested locally with `npm run dev`
- [ ] Tested contact form (emails sent)
- [ ] Tested dashboard login
- [ ] Pushed to GitHub
- [ ] Added env vars to Vercel
- [ ] Vercel build completed
- [ ] Production URLs tested
- [ ] Real data flowing in
- [ ] Dashboard displaying metrics
- [ ] Emails delivering

---

## Reference Links

- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**You have everything you need. Let's build amazing analytics! 🚀**
