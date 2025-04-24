
import { TarotCard } from '../data/tarotCards';

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
export interface TarotContextState {
  readings: Reading[];
  currentReading: Reading;
  sidebarOpen: boolean;
  drawCard: () => void;
  resetReading: () => void;
  updateCardPosition: (cardIndex: number, position: CardPosition) => void;
  toggleSidebar: () => void;
  loadReading: (readingId: string) => void;
  deleteReading: (readingId: string) => void;
  renameReading: (readingId: string, newTitle: string) => void;
}
