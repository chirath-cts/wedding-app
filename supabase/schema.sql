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

-- Site content editable from Admin -> Site Content: names, date, venue,
-- story text, and the URLs of the uploaded hero/story photos and music
-- (the actual files live in the "site-assets" Storage bucket).
create table if not exists site_settings (
  id integer primary key default 1,
  partner1_name text not null default 'Alex',
  partner2_name text not null default 'Jordan',
  wedding_date timestamptz not null default '2026-12-12T16:00:00+05:30',
  venue_name text not null default 'Cinnamon Grand Colombo',
  venue_address text not null default '77 Galle Rd, Colombo 00300, Sri Lanka',
  story_text text,
  hero_image_url text,
  story_image_urls text[] not null default '{}',
  music_url text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into site_settings (id) values (1)
on conflict (id) do nothing;

alter table site_settings enable row level security;

-- Public storage bucket that holds uploaded hero/story photos and music.
-- Public so guests' browsers can load the images/audio directly; only the
-- admin panel (via the service role key) can write to it.
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;
