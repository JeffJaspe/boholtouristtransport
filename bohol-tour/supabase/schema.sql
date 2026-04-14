-- ============================================================
--  Bohol Tourist Transport — Supabase Database Schema
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- TOURS
-- ============================================================
create table if not exists public.tours (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  price       numeric(10, 2) not null check (price >= 0),
  duration    text not null,
  location    text not null,
  images      text[] not null default '{}',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Indexes
create index if not exists tours_is_active_idx on public.tours (is_active);
create index if not exists tours_created_at_idx on public.tours (created_at desc);

-- ============================================================
-- BOOKINGS
-- ============================================================
create table if not exists public.bookings (
  id         uuid primary key default gen_random_uuid(),
  tour_id    uuid not null references public.tours(id) on delete cascade,
  name       text not null,
  email      text not null,
  phone      text not null,
  date       date not null,
  guests     integer not null check (guests >= 1 and guests <= 100),
  status     text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists bookings_tour_id_idx    on public.bookings (tour_id);
create index if not exists bookings_status_idx     on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
create index if not exists bookings_date_idx       on public.bookings (date);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Tours: public read, admin write
alter table public.tours enable row level security;

create policy "Public can read active tours"
  on public.tours for select
  using (is_active = true);

create policy "Admins can read all tours"
  on public.tours for select
  to authenticated
  using (true);

create policy "Admins can insert tours"
  on public.tours for insert
  to authenticated
  with check (true);

create policy "Admins can update tours"
  on public.tours for update
  to authenticated
  using (true);

create policy "Admins can delete tours"
  on public.tours for delete
  to authenticated
  using (true);

-- Bookings: public insert, admin read/write
alter table public.bookings enable row level security;

create policy "Anyone can create a booking"
  on public.bookings for insert
  with check (true);

create policy "Admins can read all bookings"
  on public.bookings for select
  to authenticated
  using (true);

create policy "Admins can update booking status"
  on public.bookings for update
  to authenticated
  using (true);

-- ============================================================
-- SEED DATA (6 sample tours)
-- ============================================================
insert into public.tours (title, description, price, duration, location, images, is_active)
values
  (
    'Chocolate Hills Adventure',
    'Marvel at over 1,200 perfectly cone-shaped hills stretching as far as the eye can see. During summer, these grass-covered mounds turn a rich chocolate brown — a UNESCO World Heritage nominee and Bohol''s most iconic landmark.',
    2500, '1 Full Day', 'Carmen, Bohol',
    array['https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=800&q=80'],
    true
  ),
  (
    'Island Hopping & Snorkeling',
    'Explore the pristine Balicasag Island, swim with sea turtles in crystal-clear waters, and discover vibrant coral reefs. Includes Virgin Island sandbar and Pamilacan whale watching stop.',
    3200, '1 Full Day', 'Panglao, Bohol',
    array['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'],
    true
  ),
  (
    'Tarsier & Heritage Tour',
    'Meet the world''s smallest primate at the Philippine Tarsier Sanctuary, then journey through centuries of Bohol''s history — the Blood Compact Shrine, Baclayon Church, and the ancient Loboc River.',
    1800, 'Half Day', 'Loboc & Corella, Bohol',
    array['https://images.unsplash.com/photo-1571404114025-fcfda73cfca4?w=800&q=80'],
    true
  ),
  (
    'Panglao Beach Escape',
    'Spend a perfect day on Alona Beach, one of the most beautiful beaches in the Philippines. White sand, turquoise waters, and world-class diving right at your feet.',
    2800, '1 Full Day', 'Panglao Island, Bohol',
    array['https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80'],
    true
  ),
  (
    'Loboc River Cruise & Lunch',
    'Drift along the lush Loboc River on a floating restaurant while savoring a traditional Filipino buffet. Surrounded by jungle canopy, waterfalls, and the sounds of indigenous Ati performers.',
    1500, '3 Hours', 'Loboc, Bohol',
    array['https://images.unsplash.com/photo-1565363887715-1c35fba7e73d?w=800&q=80'],
    true
  ),
  (
    'Firefly Watching Night Tour',
    'As darkness falls on the Abatan River, thousands of fireflies transform the mangrove trees into living Christmas lights — a magical, unforgettable experience found nowhere else in Bohol.',
    1200, 'Evening (2 hrs)', 'Cortes, Bohol',
    array['https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80'],
    true
  )
on conflict do nothing;
