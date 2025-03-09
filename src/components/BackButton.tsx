
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = 'Back to Movies' }) => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(-1)}
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full bg-accent hover:bg-accent/80 text-foreground transition-colors mb-6 subtle-animation"
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      {label}
    </button>
  );
};

export default BackButton;
