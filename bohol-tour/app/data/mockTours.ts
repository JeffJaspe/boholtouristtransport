import type { Tour } from '~/types'

export const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Chocolate Hills Adventure',
    description:
      'Marvel at over 1,200 perfectly cone-shaped hills stretching as far as the eye can see. During summer, these grass-covered mounds turn a rich chocolate brown — a UNESCO World Heritage nominee and Bohol\'s most iconic landmark.',
    price: 2500,
    duration: '1 Full Day',
    location: 'Carmen, Bohol',
    images: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    ],
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Island Hopping & Snorkeling',
    description:
      'Explore the pristine Balicasag Island, swim with sea turtles in crystal-clear waters, and discover vibrant coral reefs. Includes Virgin Island sandbar and Pamilacan whale watching stop.',
    price: 3200,
    duration: '1 Full Day',
    location: 'Panglao, Bohol',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80',
    ],
    is_active: true,
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    title: 'Tarsier & Heritage Tour',
    description:
      'Meet the world\'s smallest primate at the Philippine Tarsier Sanctuary, then journey through centuries of Bohol\'s history — the Blood Compact Shrine, Baclayon Church, and the ancient Loboc River.',
    price: 1800,
    duration: 'Half Day',
    location: 'Loboc & Corella, Bohol',
    images: [
      'https://images.unsplash.com/photo-1571404114025-fcfda73cfca4?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    ],
    is_active: true,
    created_at: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    title: 'Panglao Beach Escape',
    description:
      'Spend a perfect day on Alona Beach, one of the most beautiful beaches in the Philippines. White sand, turquoise waters, and world-class diving right at your feet.',
    price: 2800,
    duration: '1 Full Day',
    location: 'Panglao Island, Bohol',
    images: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    ],
    is_active: true,
    created_at: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    title: 'Loboc River Cruise & Lunch',
    description:
      'Drift along the lush Loboc River on a floating restaurant while savoring a traditional Filipino buffet. Surrounded by jungle canopy, waterfalls, and the sounds of indigenous Ati performers.',
    price: 1500,
    duration: '3 Hours',
    location: 'Loboc, Bohol',
    images: [
      'https://images.unsplash.com/photo-1565363887715-1c35fba7e73d?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    ],
    is_active: true,
    created_at: '2024-01-05T00:00:00Z',
  },
  {
    id: '6',
    title: 'Firefly Watching Night Tour',
    description:
      'As darkness falls on the Abatan River, thousands of fireflies transform the mangrove trees into living Christmas lights — a magical, unforgettable experience found nowhere else in Bohol.',
    price: 1200,
    duration: 'Evening (2 hrs)',
    location: 'Cortes, Bohol',
    images: [
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    ],
    is_active: true,
    created_at: '2024-01-06T00:00:00Z',
  },
]
