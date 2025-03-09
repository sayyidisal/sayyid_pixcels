
import React from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-muted animate-pulse rounded-xl h-56"></div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {movies.map((movie, index) => (
        <div 
          key={movie.id} 
          className="animate-scale-in" 
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
