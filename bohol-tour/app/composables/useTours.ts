import type { Tour, TourFormData } from '~/types'
import { mockTours } from '~/data/mockTours'

export const useTours = () => {
  const supabase = useSupabaseClient()

  const fetchTours = async (activeOnly = true): Promise<Tour[]> => {
    if (!supabase) return activeOnly ? mockTours.filter((t) => t.is_active) : mockTours

    let query = supabase.from('tours').select('*').order('created_at', { ascending: false })
    if (activeOnly) query = query.eq('is_active', true)

    const { data, error } = await query
    if (error) throw error
    return data as Tour[]
  }

  const fetchTourById = async (id: string): Promise<Tour | null> => {
    if (!supabase) return mockTours.find((t) => t.id === id) ?? null

    const { data, error } = await supabase.from('tours').select('*').eq('id', id).single()
    if (error) throw error
    return data as Tour
  }

  const createTour = async (tour: TourFormData): Promise<Tour> => {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase.from('tours').insert(tour).select().single()
    if (error) throw error
    return data as Tour
  }

  const updateTour = async (id: string, tour: Partial<TourFormData>): Promise<Tour> => {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase.from('tours').update(tour).eq('id', id).select().single()
    if (error) throw error
    return data as Tour
  }

  const deleteTour = async (id: string): Promise<void> => {
    if (!supabase) throw new Error('Supabase not configured')

    const { error } = await supabase.from('tours').delete().eq('id', id)
    if (error) throw error
  }

  return { fetchTours, fetchTourById, createTour, updateTour, deleteTour }
}
