-- Idempotent safety migration for portfolio contact storage.
-- Run in Supabase SQL Editor if production schema may be missing or outdated.

create extension if not exists pgcrypto;

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

create index if not exists idx_contact_messages_created_at on contact_messages (created_at desc);
create index if not exists idx_contact_messages_is_read on contact_messages (is_read);
create index if not exists idx_contact_messages_read_created on contact_messages (is_read, created_at desc);
