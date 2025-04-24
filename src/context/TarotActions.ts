
import { useState, useEffect } from 'react';
import { Reading, CardPosition } from './TarotTypes';
import { getRandomCard } from '../data/tarotCards';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

// Helper function to create a new reading
export const createNewReading = () => ({
  id: crypto.randomUUID(),
  title: `Reading - ${format(new Date(), 'MMM d, yyyy h:mm a')}`,
  timestamp: new Date().toISOString(),
  cards: []
});

export const useTarotActions = () => {
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

  // Delete a reading
  const deleteReading = (readingId: string) => {
    const updatedReadings = readings.filter(r => r.id !== readingId);
    setReadings(updatedReadings);

    // If the current reading is being deleted, create a new one
    if (currentReading.id === readingId) {
      setCurrentReading(createNewReading());
    }

    toast({
      title: "Reading Deleted",
      description: "The reading has been removed",
      duration: 3000,
    });
  };

  // Rename a reading
  const renameReading = (readingId: string, newTitle: string) => {
    // Update in the readings list
    const readingIndex = readings.findIndex(r => r.id === readingId);
    if (readingIndex >= 0) {
      const updatedReadings = [...readings];
      updatedReadings[readingIndex] = {
        ...updatedReadings[readingIndex],
        title: newTitle
      };
      setReadings(updatedReadings);

      // If current reading is being renamed, update it too
      if (currentReading.id === readingId) {
        setCurrentReading({
          ...currentReading,
          title: newTitle
        });
      }

      toast({
        title: "Reading Renamed",
        description: "The reading title has been updated",
        duration: 3000,
      });
    }
  };

  return {
    readings,
    currentReading,
    sidebarOpen,
    drawCard,
    resetReading,
    updateCardPosition,
    toggleSidebar,
    loadReading,
    deleteReading,
    renameReading
  };
};
