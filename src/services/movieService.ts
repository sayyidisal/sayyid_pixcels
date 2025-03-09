
import { Movie } from "../types/movie";
import { supabase } from "@/integrations/supabase/client";

const DELAY_MS = 300; // Small delay to simulate API call

/**
 * Gets all movies from the Supabase database
 */
export const getMovies = async (): Promise<Movie[]> => {
  try {
    const { data, error } = await supabase
      .from('movies')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    // Artificial delay for smoother loading states
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    
    return data || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

/**
 * Gets a single movie by ID from the Supabase database
 */
export const getMovieById = async (id: number): Promise<Movie | null> => {
  try {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    // Artificial delay for smoother loading states
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    
    return data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    return null;
  }
};
