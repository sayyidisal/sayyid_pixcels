
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/movieService';
import { Movie } from '../types/movie';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { Clock, Calendar, Star, Activity } from 'lucide-react';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const data = await getMovieById(parseInt(id));
          setMovie(data);
        } catch (error) {
          console.error('Failed to fetch movie:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMovie();
  }, [id]);

  // Format release date based on browser settings
  const formatReleaseDate = (dateStr: string) => {
    try {
      // Handle date format like "30/10/95"
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        // Assuming day/month/year format
        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1; // months are 0-indexed
        let year = parseInt(parts[2]);
        
        // Convert 2-digit year to 4-digit year
        if (year < 100) {
          year = year < 50 ? 2000 + year : 1900 + year;
        }
        
        const date = new Date(year, month, day);
        return date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      
      // Fallback for other date formats
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateStr; // Return original if parsing fails
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-3xl mx-auto px-4 pb-16 animate-fade-in">
          <div className="mt-8 space-y-6">
            <div className="h-8 bg-muted rounded-md animate-pulse w-1/3"></div>
            <div className="h-12 bg-muted rounded-md animate-pulse"></div>
            <div className="h-48 bg-muted rounded-md animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-muted rounded-md animate-pulse"></div>
              <div className="h-12 bg-muted rounded-md animate-pulse"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-3xl mx-auto px-4 pb-16">
          <BackButton />
          <div className="text-center py-12">
            <p className="text-2xl font-semibold mb-2 font-playfair">Movie Not Found</p>
            <p className="text-muted-foreground">The movie you are looking for does not exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-3xl mx-auto px-4 pb-16 animate-fade-in">
        <BackButton />
        
        <div className="glass-card rounded-xl p-8 mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-2 font-playfair">{movie.title}</h1>
          
          {movie.original_title !== movie.title && (
            <p className="text-muted-foreground mb-4">
              Original Title: {movie.original_title}
            </p>
          )}
          
          {movie.tagline && (
            <p className="text-lg italic text-muted-foreground mb-6 font-light">
              "{movie.tagline}"
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm">
                <span className="font-medium">Release Date:</span>{' '}
                {formatReleaseDate(movie.release_date)}
              </span>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm">
                <span className="font-medium">Runtime:</span>{' '}
                {movie.runtime} minutes
              </span>
            </div>
            
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm">
                <span className="font-medium">Rating:</span>{' '}
                {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
              </span>
            </div>
            
            <div className="flex items-center">
              <Activity className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm">
                <span className="font-medium">Status:</span>{' '}
                {movie.status}
              </span>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3 font-playfair">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {movie.overview || "No overview available."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
