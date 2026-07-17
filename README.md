# 🌌 Mission Log

> A space-observatory themed portfolio and real-time analytics command center for **Darshil Modi**.

`Mission Log` is a premium, highly interactive portfolio site styled as an astronomical/observatory command console. Powered by **Next.js 15**, **Supabase**, **Resend**, and **Three.js / React Three Fiber / GSAP**, it tracks live visitor metrics, processes messages, monitors AI assistant interactions, and showcases projects via a command-center interface.

---

## 🛠️ Technology Stack

This project is built using a modern, performant, and highly visual tech stack:

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Styling & Motion:** [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
*   **3D Elements:** [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/)
*   **Database:** [Supabase](https://supabase.com/) (PostgreSQL with custom indexing and analytics queries)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Secure JWT credentials login)
*   **Email Engine:** [Resend](https://resend.com/) (HTML notifications & automatic responder templates)

---

## 🛰️ Key Features

### 📈 Real-Time Command Center
*   **Live Dashboard Metrics:** Displays total all-time visitors, today's visits, weekly/monthly growth curves, and message counts.
*   **Activity Feed:** A streaming telemetry log of recent visits, contact submissions, and AI conversations.
*   **Geographic Insights:** Interactive breakdowns of top visitor locations by country and city.

### ✉️ Intelligent Message Management
*   **Instant Notifications:** Receives instant SMTP alerts at the admin email via **Resend** upon contact form submission.
*   **Automatic Responder:** Sends a beautifully styled confirmation email to the visitor.
*   **Inbox Control:** Mark messages as read/unread or delete them permanently directly from the dashboard.

### 🛡️ Privacy & Security Features
*   **Privacy-First Analytics:** SHA-256 hashes IP addresses with a time-varying salt prior to storage.
*   **Spam Mitigation:** Enforces a 5-minute IP-hash-based visit cooldown to prevent rapid refresh double-counting.
*   **Server-Side Protection:** Restricts all read/write database actions to secure server APIs, keeping the service role key completely hidden.

---

## 🚀 Local Development Setup

Follow these steps to deploy your local Space Observatory:

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a file named `.env.local` in the root directory. Populate it with the following configuration:

```env
# Server URL for Authentication callbacks
NEXTAUTH_URL=http://localhost:3000
# Generate a secure key using: openssl rand -base64 32
NEXTAUTH_SECRET=your_nextauth_secret_key

# Credentials for accessing /mission-control
MISSION_CONTROL_EMAIL=admin@mission.local
MISSION_CONTROL_PASSWORD=secure_password_goes_here

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
# ⚠️ Keep this secret safe! Used only server-side
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration (Resend)
RESEND_API_KEY=re_your_resend_api_key
CONTACT_FROM_EMAIL="Darshil Modi <contact@darshilmodi.in>"
ADMIN_EMAIL=your_personal_email@example.com
ADMIN_NAME="Darshil Modi"
```

> [!NOTE]
> During local development, if `MISSION_CONTROL_EMAIL` and `MISSION_CONTROL_PASSWORD` are not configured in `.env.local`, the login page will display temporary local credentials for testing.

### 3. Initialize the Database

The dashboard requires three core tables. Run the migration script against your Supabase project.

#### Using the Supabase CLI:
```bash
supabase db query supabase/schema.sql
```

#### Manual Database Script:
Copy the contents of [supabase/schema.sql](supabase/schema.sql) and paste them directly into the **SQL Editor** in the Supabase Dashboard, then click **Run**.

This script sets up:
*   `visitors`: Country, city, and anonymized hash tracking.
*   `contact_messages`: Standard contact details with read/unread flags.
*   `assistant_interactions`: AI conversation queries.
*   Performance-optimized query indexes (`idx_visitors_created_at`, `idx_visitors_country`, etc.).
*   Row-Level Security (RLS) policies.

### 4. Add Profile Assets

For the custom portrait frames to display correctly in the Hero section:
1. Save your portrait image file.
2. Place it in the public assets folder at: `public/darshil-photo.jpg`.

*(If the file is absent, the UI will fall back to an elegant vector constellation/wireframe placeholder).*

### 5. Launch the Observatory

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.
Access the administration command center at [http://localhost:3000/mission-control](http://localhost:3000/mission-control).

---

## 🔍 Validation & Scripts

A set of diagnostic scripts is included to verify installation and service integrations:

*   **Linting & Verification:** Checks TypeScript compiling and copy conformity.
    ```bash
    npm run lint
    ```
*   **Contact & Email Test:** Verifies mail pipelines, server endpoints, and API parameters.
    ```bash
    npm run check:contact
    ```
