
export interface TarotCard {
  id: string;
  name: string;
  suit?: string;
  image: string;
}

export const tarotDeck: TarotCard[] = [
  // Major Arcana
  { id: 'fool', name: 'The Fool', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'magician', name: 'The Magician', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'high-priestess', name: 'The High Priestess', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'empress', name: 'The Empress', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'emperor', name: 'The Emperor', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'hierophant', name: 'The Hierophant', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'lovers', name: 'The Lovers', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'chariot', name: 'The Chariot', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'strength', name: 'Strength', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'hermit', name: 'The Hermit', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'wheel-of-fortune', name: 'Wheel of Fortune', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'justice', name: 'Justice', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'hanged-man', name: 'The Hanged Man', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'death', name: 'Death', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'temperance', name: 'Temperance', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'devil', name: 'The Devil', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'tower', name: 'The Tower', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'star', name: 'The Star', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'moon', name: 'The Moon', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'sun', name: 'The Sun', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'judgement', name: 'Judgement', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'world', name: 'The World', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  
  // Wands Suit
  { id: 'ace-of-wands', name: 'Ace of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'two-of-wands', name: 'Two of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'three-of-wands', name: 'Three of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'four-of-wands', name: 'Four of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'five-of-wands', name: 'Five of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'six-of-wands', name: 'Six of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'seven-of-wands', name: 'Seven of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'eight-of-wands', name: 'Eight of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'nine-of-wands', name: 'Nine of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'ten-of-wands', name: 'Ten of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'page-of-wands', name: 'Page of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'knight-of-wands', name: 'Knight of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'queen-of-wands', name: 'Queen of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'king-of-wands', name: 'King of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  
  // Cups Suit
  { id: 'ace-of-cups', name: 'Ace of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'two-of-cups', name: 'Two of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'three-of-cups', name: 'Three of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'four-of-cups', name: 'Four of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'five-of-cups', name: 'Five of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'six-of-cups', name: 'Six of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'seven-of-cups', name: 'Seven of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'eight-of-cups', name: 'Eight of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'nine-of-cups', name: 'Nine of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'ten-of-cups', name: 'Ten of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'page-of-cups', name: 'Page of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'knight-of-cups', name: 'Knight of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'queen-of-cups', name: 'Queen of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'king-of-cups', name: 'King of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  
  // Swords Suit
  { id: 'ace-of-swords', name: 'Ace of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'two-of-swords', name: 'Two of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'three-of-swords', name: 'Three of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'four-of-swords', name: 'Four of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'five-of-swords', name: 'Five of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'six-of-swords', name: 'Six of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'seven-of-swords', name: 'Seven of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'eight-of-swords', name: 'Eight of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'nine-of-swords', name: 'Nine of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'ten-of-swords', name: 'Ten of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'page-of-swords', name: 'Page of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'knight-of-swords', name: 'Knight of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'queen-of-swords', name: 'Queen of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'king-of-swords', name: 'King of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  
  // Pentacles Suit
  { id: 'ace-of-pentacles', name: 'Ace of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'two-of-pentacles', name: 'Two of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'three-of-pentacles', name: 'Three of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'four-of-pentacles', name: 'Four of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'five-of-pentacles', name: 'Five of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'six-of-pentacles', name: 'Six of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'seven-of-pentacles', name: 'Seven of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'eight-of-pentacles', name: 'Eight of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'nine-of-pentacles', name: 'Nine of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'ten-of-pentacles', name: 'Ten of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'page-of-pentacles', name: 'Page of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'knight-of-pentacles', name: 'Knight of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'queen-of-pentacles', name: 'Queen of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
  { id: 'king-of-pentacles', name: 'King of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z' },
];

// Helper function to get a random card
export const getRandomCard = (): TarotCard => {
  const randomIndex = Math.floor(Math.random() * tarotDeck.length);
  return tarotDeck[randomIndex];
};
