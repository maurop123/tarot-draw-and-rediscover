
import React, { useState, useRef, useEffect } from 'react';
import { TarotCard as TarotCardType } from '../data/tarotCards';
import { CardPosition } from '../context/TarotContext';

interface TarotCardProps {
  card: TarotCardType;
  initialPosition: CardPosition;
  onPositionChange: (position: CardPosition) => void;
  index: number;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  initialPosition, 
  onPositionChange,
  index 
}) => {
  const [position, setPosition] = useState<CardPosition>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Offset from the mouse/touch point to the card's top-left corner
  const dragOffset = useRef({ x: 0, y: 0 });
  
  // For staggered animation effect
  const animationDelay = index * 0.1;

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  // Start dragging
  const handleDragStart = (clientX: number, clientY: number) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      // Calculate the offset from where we clicked on the card
      dragOffset.current = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
      setIsDragging(true);
    }
  };

  // Handle mouse-specific events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newPosition = {
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      };
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onPositionChange(position);
    }
  };

  // Handle touch-specific events
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleDragStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      const newPosition = {
        x: touch.clientX - dragOffset.current.x,
        y: touch.clientY - dragOffset.current.y
      };
      setPosition(newPosition);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      onPositionChange(position);
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, position]);

  return (
    <div
      ref={cardRef}
      className={`absolute bg-tarot-purple text-white rounded-md p-3 w-[150px] h-[250px] 
        select-none flex flex-col justify-between items-center card-shadow
        animate-fade-in border-2 border-tarot-gold
        ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? 50 : 10 + index,
        animationDelay: `${animationDelay}s`,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="text-xs font-semibold text-tarot-gold">{card.suit || "Major Arcana"}</div>
      <div className="flex-1 flex items-center justify-center w-full">
        <svg
          className="w-full h-full text-white"
          viewBox="0 0 100 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Card back pattern */}
          <rect x="10" y="10" width="80" height="180" rx="5" fill="#6E59A5" />
          <path d={card.image} fill="#E6C06B" stroke="#33C3F0" strokeWidth="1" />
          <circle cx="50" cy="100" r="30" fill="none" stroke="#E6C06B" strokeWidth="1" />
          <polygon points="50,70 65,100 50,130 35,100" fill="none" stroke="#33C3F0" strokeWidth="1" />
        </svg>
      </div>
      <div className="text-sm font-bold">{card.name}</div>
    </div>
  );
};

export default TarotCard;
