
import React, { createContext, useState, useContext, useEffect } from 'react';
import { TarotCard, getRandomCard } from '../data/tarotCards';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

// Define the position type for a card on the canvas
export interface CardPosition {
  x: number;
  y: number;
}

// Define what a drawn card looks like with position
export interface DrawnCard {
  card: TarotCard;
  position: CardPosition;
}

// Define what a reading consists of
export interface Reading {
  id: string;
  title: string;
  timestamp: string;
  cards: DrawnCard[];
}

// Context state interface
interface TarotContextState {
  readings: Reading[];
  currentReading: Reading;
  sidebarOpen: boolean;
  drawCard: () => void;
  resetReading: () => void;
  updateCardPosition: (cardIndex: number, position: CardPosition) => void;
  toggleSidebar: () => void;
  loadReading: (readingId: string) => void;
}

// Create the context
const TarotContext = createContext<TarotContextState | undefined>(undefined);

// Helper function to create a new reading
const createNewReading = () => ({
  id: crypto.randomUUID(),
  title: `Reading - ${format(new Date(), 'MMM d, yyyy h:mm a')}`,
  timestamp: new Date().toISOString(),
  cards: []
});

// Provider component
export const TarotProvider = ({ children }: { children: React.ReactNode }) => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [currentReading, setCurrentReading] = useState<Reading>(createNewReading());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load readings from localStorage on mount
  useEffect(() => {
    const savedReadings = localStorage.getItem('tarotReadings');
    if (savedReadings) {
      try {
        setReadings(JSON.parse(savedReadings));
      } catch (error) {
        console.error('Failed to parse saved readings:', error);
      }
    }
  }, []);

  // Save readings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tarotReadings', JSON.stringify(readings));
  }, [readings]);

  // Draw a new card and add it to the current reading
  const drawCard = () => {
    const newCard = getRandomCard();
    // Place the card in the center of the screen with slight random offset
    const position = {
      x: window.innerWidth / 2 - 75 + (Math.random() * 30 - 15),
      y: window.innerHeight / 2 - 125 + (Math.random() * 30 - 15)
    };
    
    // Check if this is the first card of a reading
    const isFirstCard = currentReading.cards.length === 0;
    
    // Start a new reading if this is the first card
    const readingToUse = isFirstCard ? createNewReading() : currentReading;
    
    const updatedReading = {
      ...readingToUse,
      cards: [...readingToUse.cards, { card: newCard, position }]
    };
    
    setCurrentReading(updatedReading);
    
    // If this is the first card, add the new reading to the readings list
    if (isFirstCard) {
      setReadings([...readings, updatedReading]);
    } else {
      // Update the readings array if this reading already exists in it
      const readingIndex = readings.findIndex(r => r.id === currentReading.id);
      if (readingIndex >= 0) {
        const updatedReadings = [...readings];
        updatedReadings[readingIndex] = updatedReading;
        setReadings(updatedReadings);
      }
    }
    
    toast({
      title: isFirstCard ? "New Reading Started" : "Card Drawn",
      description: isFirstCard 
        ? `New reading started with ${newCard.name}`
        : `You've drawn ${newCard.name}`,
      duration: 3000,
    });
  };

  // Start a new reading
  const resetReading = () => {
    // Save the current reading if it has cards
    if (currentReading.cards.length > 0) {
      const readingExists = readings.some(r => r.id === currentReading.id);
      if (!readingExists) {
        setReadings([...readings, currentReading]);
      }
    }
    
    // Create a new reading
    setCurrentReading(createNewReading());
    
    toast({
      title: "New Reading",
      description: "Started a new tarot reading session",
      duration: 3000,
    });
  };

  // Update a card's position
  const updateCardPosition = (cardIndex: number, position: CardPosition) => {
    const updatedCards = [...currentReading.cards];
    if (updatedCards[cardIndex]) {
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        position
      };
      
      const updatedReading = {
        ...currentReading,
        cards: updatedCards
      };
      
      setCurrentReading(updatedReading);
      
      // Update the reading in the readings array if it exists there
      const readingIndex = readings.findIndex(r => r.id === currentReading.id);
      if (readingIndex >= 0) {
        const updatedReadings = [...readings];
        updatedReadings[readingIndex] = updatedReading;
        setReadings(updatedReadings);
      }
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Load a saved reading
  const loadReading = (readingId: string) => {
    // Save the current reading if it has cards before loading a new one
    if (currentReading.cards.length > 0) {
      const readingExists = readings.some(r => r.id === currentReading.id);
      if (!readingExists) {
        setReadings([...readings, currentReading]);
      }
    }
    
    const reading = readings.find(r => r.id === readingId);
    if (reading) {
      setCurrentReading(reading);
      setSidebarOpen(false);
      
      toast({
        title: "Reading Loaded",
        description: `Loaded reading: ${reading.title}`,
        duration: 3000,
      });
    }
  };

  return (
    <TarotContext.Provider value={{
      readings,
      currentReading,
      sidebarOpen,
      drawCard,
      resetReading,
      updateCardPosition,
      toggleSidebar,
      loadReading
    }}>
      {children}
    </TarotContext.Provider>
  );
};

// Hook to use the tarot context
export const useTarot = () => {
  const context = useContext(TarotContext);
  if (context === undefined) {
    throw new Error('useTarot must be used within a TarotProvider');
  }
  return context;
};
