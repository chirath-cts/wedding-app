-- Wedding RSVP app — database schema (Phase 1)
-- Paste this whole file into the Supabase SQL editor and click "Run".

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),

  -- Unique code used in personal invite links: mysite.com/invite/ABC123
  -- Left null for anyone who RSVPs without a personal link.
  invite_code text unique,

  name text not null,
  phone text,

  -- How many seats this guest/household was invited for.
  seats_invited integer not null default 1,

  rsvp_status text not null default 'pending'
    check (rsvp_status in ('pending', 'attending', 'declined')),

  adults integer not null default 0,
  children integer not null default 0,

  dietary text
    check (dietary in ('normal', 'vegetarian', 'other')),
  dietary_other text,

  wish_message text,

  -- Left empty on purpose: Phase 2 will fill this in for the QR-code
  -- table-finder feature at the wedding entrance.
  table_number integer,

  responded_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists guests_invite_code_idx on guests (invite_code);

-- Row Level Security is enabled, but with NO public policies. All reads and
-- writes happen through the Next.js server using the Supabase service role
-- key, which bypasses RLS. This keeps every guest's data private — nobody
-- can query the guests table directly from a browser.
alter table guests enable row level security;
