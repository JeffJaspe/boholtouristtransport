import type { Booking, BookingFormData, BookingStats, BookingStatus } from '~/types'

export const useBookings = () => {
  const supabase = useSupabaseClient()

  const fetchBookings = async (): Promise<Booking[]> => {
    if (!supabase) return []

    const { data, error } = await supabase
      .from('bookings')
      .select('*, tours(title, location)')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Booking[]
  }

  const fetchBookingsByTour = async (tourId: string): Promise<Booking[]> => {
    if (!supabase) return []

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('tour_id', tourId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Booking[]
  }

  const createBooking = async (tourId: string, form: BookingFormData): Promise<Booking> => {
    if (!supabase) {
      // Demo mode — simulate success
      return {
        id: crypto.randomUUID(),
        tour_id: tourId,
        ...form,
        status: 'pending',
        created_at: new Date().toISOString(),
      } as Booking
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({ tour_id: tourId, ...form })
      .select()
      .single()

    if (error) throw error
    return data as Booking
  }

  const updateBookingStatus = async (id: string, status: BookingStatus): Promise<void> => {
    if (!supabase) throw new Error('Supabase not configured')

    const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
    if (error) throw error
  }

  const getBookingStats = async (): Promise<BookingStats> => {
    if (!supabase) return { total: 0, pending: 0, confirmed: 0, cancelled: 0 }

    const { data, error } = await supabase.from('bookings').select('status')
    if (error) throw error

    const total = data.length
    const pending = data.filter((b: { status: string }) => b.status === 'pending').length
    const confirmed = data.filter((b: { status: string }) => b.status === 'confirmed').length
    const cancelled = data.filter((b: { status: string }) => b.status === 'cancelled').length
    return { total, pending, confirmed, cancelled }
  }

  return { fetchBookings, fetchBookingsByTour, createBooking, updateBookingStatus, getBookingStats }
}
