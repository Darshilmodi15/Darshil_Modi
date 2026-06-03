-- Supabase schema for Mission Log - Production Dashboard
-- Create these tables in your Supabase project to power the admin dashboard.

create extension if not exists pgcrypto;

-- Visitors table: Tracks all portfolio visits
create table if not exists visitors (
  id uuid primary key default gen_random_uuid(),
  country text,
  city text,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Contact messages table: Stores all contact form submissions
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Assistant interactions table: Tracks AI interaction questions
create table if not exists assistant_interactions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  created_at timestamptz not null default now()
);

-- Comprehensive indexes for performance and analytics
create index if not exists idx_visitors_created_at on visitors (created_at desc);
create index if not exists idx_visitors_country on visitors (country);
create index if not exists idx_visitors_city on visitors (city);
create index if not exists idx_visitors_ip_hash on visitors (ip_hash);
create index if not exists idx_visitors_created_country on visitors (created_at desc, country);

create index if not exists idx_contact_messages_created_at on contact_messages (created_at desc);
create index if not exists idx_contact_messages_is_read on contact_messages (is_read);
create index if not exists idx_contact_messages_read_created on contact_messages (is_read, created_at desc);

create index if not exists idx_assistant_interactions_created_at on assistant_interactions (created_at desc);

-- Row-level security (optional but recommended)
-- Enable RLS on all tables
alter table visitors enable row level security;
alter table contact_messages enable row level security;
alter table assistant_interactions enable row level security;

-- Allow admin-only access via service role (implicit)
-- Regular authenticated users have no direct access
