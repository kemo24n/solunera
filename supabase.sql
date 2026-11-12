-- Run once in Supabase > SQL Editor (skip if the table already exists from the old site; v2 uses its own row)
create table if not exists solunera_store (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table solunera_store enable row level security;  -- only the server's secret key can read/write
