-- Dispatch subscribers — yinyan.news weekly digest.
-- Run once in the Supabase SQL editor before turning on the env vars.

create extension if not exists "pgcrypto";

create table if not exists public.dispatch_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  ip_hash text,
  source text default 'web',
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  unsubscribe_token uuid not null default gen_random_uuid()
);

create index if not exists dispatch_subscribers_created_at_idx
  on public.dispatch_subscribers (created_at desc);

revoke all on public.dispatch_subscribers from anon, authenticated;
