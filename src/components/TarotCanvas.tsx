
import React from 'react';
import { useTarot } from '../context/TarotContext';
import TarotCard from './TarotCard';
import { CardPosition } from '../context/TarotContext';

const TarotCanvas: React.FC = () => {
  const { currentReading, updateCardPosition } = useTarot();

  const handleCardPositionChange = (index: number, position: CardPosition) => {
    updateCardPosition(index, position);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Mystical background with stars */}
      <div className="absolute inset-0 bg-tarot-background">
        {/* Stars effect */}
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const animationDuration = Math.random() * 3 + 2;
          
          return (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${animationDuration}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          );
        })}
      </div>

      {/* Render all cards in the current reading */}
      {currentReading.cards.map((drawnCard, index) => (
        <TarotCard
          key={`${drawnCard.card.id}-${index}`}
          card={drawnCard.card}
          initialPosition={drawnCard.position}
          onPositionChange={(position) => handleCardPositionChange(index, position)}
          index={index}
        />
      ))}
    </div>
  );
};

export default TarotCanvas;
