export interface Tour {
  id: string
  title: string
  description: string
  price: number
  duration: string
  location: string
  images: string[]
  is_active: boolean
  created_at: string
}

export interface Booking {
  id: string
  tour_id: string
  name: string
  email: string
  phone: string
  date: string
  guests: number
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  tours?: Tour
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface BookingStats {
  total: number
  pending: number
  confirmed: number
  cancelled: number
}

export interface BookingFormData {
  name: string
  email: string
  phone: string
  date: string
  guests: number
}

export interface TourFormData {
  title: string
  description: string
  price: number
  duration: string
  location: string
  images: string[]
  is_active: boolean
}

export interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  rating: number
  comment: string
}

export interface GalleryImage {
  id: number
  src: string
  alt: string
  span?: 'wide' | 'tall' | 'normal'
}
