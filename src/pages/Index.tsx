
import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import { Movie } from '../types/movie';
import Header from '../components/Header';
import MovieGrid from '../components/MovieGrid';

const Index: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 pb-16 animate-fade-in">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 font-playfair">Discover Movies</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explore our curated collection of classic and contemporary films
          </p>
        </div>
        
        <MovieGrid movies={movies} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;
