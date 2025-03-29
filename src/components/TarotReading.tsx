
import React from 'react';
import { useTarot } from '../context/TarotContext';
import TarotCanvas from './TarotCanvas';
import ReadingsSidebar from './ReadingsSidebar';
import { RotateCcw } from 'lucide-react';

const TarotReading: React.FC = () => {
  const { drawCard, resetReading } = useTarot();

  return (
    <div className="relative h-screen w-screen overflow-hidden touch-none">
      {/* Sidebar */}
      <ReadingsSidebar />
      
      {/* Canvas */}
      <TarotCanvas />
      
      {/* Reset button */}
      <button
        className="fixed top-4 right-4 z-30 bg-tarot-purple text-white p-2 rounded-md shadow-md"
        onClick={resetReading}
        aria-label="Reset reading"
      >
        <RotateCcw size={24} />
      </button>
      
      {/* Draw card button */}
      <button
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 
          bg-tarot-purple text-white py-3 px-6 rounded-full 
          font-bold text-lg shadow-lg draw-button
          active:scale-95 transition-transform"
        onClick={drawCard}
      >
        Draw Card
      </button>
    </div>
  );
};

export default TarotReading;
