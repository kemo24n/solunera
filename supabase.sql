-- Run once in Supabase → SQL Editor
create table if not exists solunera_store (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table solunera_store enable row level security;  -- only the server's secret key can read/write
