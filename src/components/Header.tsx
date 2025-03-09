
import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-8 border-b border-border/20 bg-background/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container max-w-6xl mx-auto px-4">
        <Link to="/" className="flex items-center justify-center md:justify-start">
          <Film className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight font-playfair">
            Sayyid--Pi-xcels
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
