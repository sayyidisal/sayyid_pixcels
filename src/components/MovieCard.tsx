
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import { Star, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // Format tanggal rilis untuk tampilan yang lebih menarik
  const formatReleaseDate = (dateStr: string) => {
    if (!dateStr) return 'Release date unknown';

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
        
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        return `${day} ${months[month]} ${year}`;
      }
      
      // Fallback for other date formats
      return dateStr;
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateStr; // Return original if parsing fails
    }
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card-hover block rounded-xl overflow-hidden glass-card h-full subtle-animation"
    >
      <div className="p-6 flex flex-col h-full justify-between">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="movie-title leading-7">{movie.title}</h2>
            <div className="rating-badge whitespace-nowrap">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
          
          {movie.tagline && (
            <p className="movie-tagline line-clamp-2 italic">{movie.tagline}</p>
          )}
          
          {!movie.tagline && movie.overview && (
            <p className="movie-tagline line-clamp-2">{movie.overview}</p>
          )}
        </div>
        
        <div className="mt-4 text-xs">
          {movie.release_date && (
            <div className="flex items-center justify-end mt-2 bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{formatReleaseDate(movie.release_date)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
