-- Hub contact form. Anonymous visitors may INSERT only; the admin (authenticated) reads and updates.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text check (email is null or char_length(email) <= 200),
  phone text check (phone is null or char_length(phone) <= 200),
  message text not null check (char_length(message) between 1 and 4000),
  lang text check (lang in ('en','ar')),
  source text not null default 'hub',
  status text not null default 'new' check (status in ('new','done'))
);
alter table public.contact_messages enable row level security;

create policy "anon can insert contact messages" on public.contact_messages
  for insert to anon with check (status = 'new');
create policy "admin reads contact messages" on public.contact_messages
  for select to authenticated using (true);
create policy "admin updates contact messages" on public.contact_messages
  for update to authenticated using (true) with check (true);
