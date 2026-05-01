-- Reader-submitted hopeful tips. Decoupled from dispatch_subscribers.
-- Editor reads these manually before deciding what becomes a pairing.

create extension if not exists "pgcrypto";

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  why text,
  email text,
  ip_hash text,
  status text default 'new',     -- new | reviewed | dismissed | published
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  notes text                     -- editor's private note
);

create index if not exists submissions_status_created_idx
  on public.submissions (status, created_at desc);

revoke all on public.submissions from anon, authenticated;
