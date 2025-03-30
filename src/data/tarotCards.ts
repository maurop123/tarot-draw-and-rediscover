
export interface SVGElement {
  type: 'circle' | 'rect' | 'polygon' | 'line' | 'path' | 'star';
  [key: string]: any;
}

export interface TarotCard {
  id: string;
  name: string;
  suit?: string;
  image: string; // Keep for backward compatibility
  svgElements: SVGElement[];
}

// Helper function to generate random SVG elements based on the card's id and name
const generateRandomSVGElements = (id: string, name: string, suit?: string): SVGElement[] => {
  // Create a pseudo-random seed based on the id
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (min: number, max: number) => {
    // Simple pseudo-random function based on the seed
    const x = Math.sin(seed * 9999 + name.length) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };
  
  const elements: SVGElement[] = [];
  
  // Choose colors based on suit
  let primaryColor = '#E6C06B'; // Gold
  let secondaryColor = '#33C3F0'; // Blue
  
  if (suit === 'Wands') {
    primaryColor = '#F97316'; // Orange for Wands
    secondaryColor = '#FBBF24'; // Lighter orange
  } else if (suit === 'Cups') {
    primaryColor = '#38BDF8'; // Blue for Cups
    secondaryColor = '#7DD3FC'; // Lighter blue
  } else if (suit === 'Swords') {
    primaryColor = '#A1A1AA'; // Silver for Swords
    secondaryColor = '#D4D4D8'; // Lighter silver
  } else if (suit === 'Pentacles') {
    primaryColor = '#16A34A'; // Green for Pentacles
    secondaryColor = '#4ADE80'; // Lighter green
  }
  
  // Add a central symbol
  if (suit) {
    // Add suit-specific central symbol
    if (suit === 'Wands') {
      // A vertical line (wand) with decorations
      elements.push({
        type: 'line',
        x1: 50,
        y1: 30,
        x2: 50,
        y2: 130,
        stroke: primaryColor,
        strokeWidth: 3
      });
      // Add decorative elements to the wand
      elements.push({
        type: 'circle',
        cx: 50,
        cy: 40,
        r: 8,
        fill: secondaryColor
      });
    } else if (suit === 'Cups') {
      // A cup shape
      elements.push({
        type: 'path',
        d: 'M35,70 Q50,40 65,70 L65,90 Q50,100 35,90 Z',
        fill: 'none',
        stroke: primaryColor,
        strokeWidth: 2
      });
    } else if (suit === 'Swords') {
      // A sword shape
      elements.push({
        type: 'path',
        d: 'M50,30 L50,130 M30,50 L70,50',
        fill: 'none',
        stroke: primaryColor,
        strokeWidth: 2
      });
      // Sword handle
      elements.push({
        type: 'circle',
        cx: 50,
        cy: 50,
        r: 10,
        fill: 'none',
        stroke: secondaryColor,
        strokeWidth: 1.5
      });
    } else if (suit === 'Pentacles') {
      // A pentacle (five-pointed star)
      elements.push({
        type: 'star',
        cx: 50,
        cy: 80,
        r: 25,
        points: 5,
        fill: 'none',
        stroke: primaryColor,
        strokeWidth: 1.5
      });
      // Circle around the pentacle
      elements.push({
        type: 'circle',
        cx: 50,
        cy: 80,
        r: 30,
        fill: 'none',
        stroke: secondaryColor,
        strokeWidth: 1
      });
    }
    
    // Add the number/court symbol based on the card name
    const nameParts = name.split(' of ');
    if (nameParts.length > 1) {
      const rank = nameParts[0].toLowerCase();
      
      if (rank === 'ace') {
        elements.push({
          type: 'circle',
          cx: 50,
          cy: 30,
          r: 15,
          fill: primaryColor,
          opacity: 0.7
        });
      } else if (['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].includes(rank)) {
        // For number cards, add that many small symbols
        const numSymbols = {
          'two': 2, 'three': 3, 'four': 4, 'five': 5,
          'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
        }[rank] || 1;
        
        for (let i = 0; i < numSymbols; i++) {
          // Arrange symbols in different patterns based on the number
          let x, y, size;
          
          if (numSymbols <= 3) {
            // Vertical arrangement for 1-3
            y = 30 + i * 50;
            x = 50;
            size = 8;
          } else if (numSymbols <= 6) {
            // 2x3 grid for 4-6
            x = 30 + (i % 2) * 40;
            y = 40 + Math.floor(i / 2) * 40;
            size = 7;
          } else {
            // More complex arrangement for 7-10
            if (i < 4) {
              // First 4 in corners
              x = 30 + (i % 2) * 40;
              y = 40 + Math.floor(i / 2) * 80;
              size = 6;
            } else if (i < 8) {
              // Next 4 in inner square
              x = 40 + ((i - 4) % 2) * 20;
              y = 50 + Math.floor((i - 4) / 2) * 60;
              size = 5;
            } else {
              // Last 2 in middle
              x = 40 + ((i - 8) % 2) * 20;
              y = 80;
              size = 5;
            }
          }
          
          elements.push({
            type: 'circle',
            cx: x,
            cy: y,
            r: size,
            fill: primaryColor,
            opacity: 0.8
          });
        }
      } else if (['page', 'knight', 'queen', 'king'].includes(rank)) {
        // For court cards, add a symbol representing the court figure
        if (rank === 'page') {
          elements.push({
            type: 'path',
            d: 'M45,40 C40,60 60,60 55,40 M40,70 C50,90 60,70',
            fill: 'none',
            stroke: primaryColor,
            strokeWidth: 1.5
          });
        } else if (rank === 'knight') {
          elements.push({
            type: 'path',
            d: 'M35,40 Q50,20 65,40 M40,50 L60,50 M40,60 Q50,80 60,60',
            fill: 'none',
            stroke: primaryColor,
            strokeWidth: 1.5
          });
        } else if (rank === 'queen') {
          elements.push({
            type: 'path',
            d: 'M40,40 L60,40 L60,70 L40,70 Z',
            fill: 'none',
            stroke: primaryColor,
            strokeWidth: 1.5
          });
          // Crown
          elements.push({
            type: 'path',
            d: 'M40,40 L45,30 L50,40 L55,30 L60,40',
            fill: 'none',
            stroke: secondaryColor,
            strokeWidth: 1.5
          });
        } else if (rank === 'king') {
          elements.push({
            type: 'path',
            d: 'M40,40 L60,40 L60,70 L40,70 Z',
            fill: 'none',
            stroke: primaryColor,
            strokeWidth: 1.5
          });
          // Crown
          elements.push({
            type: 'path',
            d: 'M40,40 L45,25 L50,35 L55,25 L60,40',
            fill: 'none',
            stroke: secondaryColor,
            strokeWidth: 1.5
          });
        }
      }
    }
  } else {
    // Major Arcana - create a unique symbol for each card
    // Central symbol
    elements.push({
      type: 'circle',
      cx: 50,
      cy: 80,
      r: 30,
      fill: 'none',
      stroke: primaryColor,
      strokeWidth: 1.5
    });
    
    // Specific symbol based on card name
    if (id === 'fool') {
      elements.push({
        type: 'path',
        d: 'M40,60 Q50,40 60,60 M40,100 Q50,120 60,100',
        stroke: secondaryColor,
        strokeWidth: 1.5
      });
    } else if (id === 'magician') {
      elements.push({
        type: 'path',
        d: 'M30,80 L70,80 M50,60 L50,100 M35,65 L65,95 M35,95 L65,65',
        stroke: secondaryColor,
        strokeWidth: 1.5
      });
    } else if (id === 'high-priestess') {
      elements.push({
        type: 'circle',
        cx: 50,
        cy: 60,
        r: 10,
        fill: 'none',
        stroke: secondaryColor,
        strokeWidth: 1.5
      });
      elements.push({
        type: 'path',
        d: 'M40,80 L60,80 L60,110 L40,110 Z',
        fill: 'none',
        stroke: secondaryColor,
        strokeWidth: 1.5
      });
    } else if (id === 'empress') {
      elements.push({
        type: 'circle',
        cx: 50,
        cy: 60,
        r: 15,
        fill: 'none',
        stroke: secondaryColor,
        strokeWidth: 1.5
      });
      elements.push({
        type: 'path',
        d: 'M50,75 L50,110 M40,90 L60,90',
        stroke: secondaryColor,
        strokeWidth: 1.5
      });
    } else {
      // For all other major arcana, create a unique geometric pattern
      const numPoints = (seed % 8) + 3; // 3 to 10 points
      let pathData = '';
      for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints;
        const r1 = 20 + (seed % 10);
        const r2 = 10 + (seed % 5);
        const x1 = 50 + r1 * Math.cos(angle);
        const y1 = 80 + r1 * Math.sin(angle);
        
        const innerAngle = angle + Math.PI / numPoints;
        const x2 = 50 + r2 * Math.cos(innerAngle);
        const y2 = 80 + r2 * Math.sin(innerAngle);
        
        pathData += (i === 0 ? 'M' : 'L') + x1 + ',' + y1 + ' L' + x2 + ',' + y2;
      }
      pathData += 'Z';
      
      elements.push({
        type: 'path',
        d: pathData,
        fill: 'none',
        stroke: secondaryColor,
        strokeWidth: 1.5
      });
    }
  }
  
  // Add some decorative elements
  for (let i = 0; i < 3; i++) {
    const size = 3 + random(1, 5);
    const x = 15 + random(0, 70);
    const y = 15 + random(0, 130);
    
    elements.push({
      type: 'circle',
      cx: x,
      cy: y,
      r: size,
      fill: random(0, 1) > 0.5 ? primaryColor : secondaryColor,
      opacity: 0.3 + random(0, 0.7)
    });
  }
  
  return elements;
};

export const tarotDeck: TarotCard[] = [
  // Major Arcana
  { id: 'fool', name: 'The Fool', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('fool', 'The Fool') },
  { id: 'magician', name: 'The Magician', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('magician', 'The Magician') },
  { id: 'high-priestess', name: 'The High Priestess', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('high-priestess', 'The High Priestess') },
  { id: 'empress', name: 'The Empress', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('empress', 'The Empress') },
  { id: 'emperor', name: 'The Emperor', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('emperor', 'The Emperor') },
  { id: 'hierophant', name: 'The Hierophant', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('hierophant', 'The Hierophant') },
  { id: 'lovers', name: 'The Lovers', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('lovers', 'The Lovers') },
  { id: 'chariot', name: 'The Chariot', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('chariot', 'The Chariot') },
  { id: 'strength', name: 'Strength', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('strength', 'Strength') },
  { id: 'hermit', name: 'The Hermit', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('hermit', 'The Hermit') },
  { id: 'wheel-of-fortune', name: 'Wheel of Fortune', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('wheel-of-fortune', 'Wheel of Fortune') },
  { id: 'justice', name: 'Justice', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('justice', 'Justice') },
  { id: 'hanged-man', name: 'The Hanged Man', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('hanged-man', 'The Hanged Man') },
  { id: 'death', name: 'Death', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('death', 'Death') },
  { id: 'temperance', name: 'Temperance', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('temperance', 'Temperance') },
  { id: 'devil', name: 'The Devil', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('devil', 'The Devil') },
  { id: 'tower', name: 'The Tower', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('tower', 'The Tower') },
  { id: 'star', name: 'The Star', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('star', 'The Star') },
  { id: 'moon', name: 'The Moon', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('moon', 'The Moon') },
  { id: 'sun', name: 'The Sun', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('sun', 'The Sun') },
  { id: 'judgement', name: 'Judgement', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('judgement', 'Judgement') },
  { id: 'world', name: 'The World', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('world', 'The World') },
  
  // Wands Suit
  { id: 'ace-of-wands', name: 'Ace of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('ace-of-wands', 'Ace of Wands', 'Wands') },
  { id: 'two-of-wands', name: 'Two of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('two-of-wands', 'Two of Wands', 'Wands') },
  { id: 'three-of-wands', name: 'Three of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('three-of-wands', 'Three of Wands', 'Wands') },
  { id: 'four-of-wands', name: 'Four of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('four-of-wands', 'Four of Wands', 'Wands') },
  { id: 'five-of-wands', name: 'Five of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('five-of-wands', 'Five of Wands', 'Wands') },
  { id: 'six-of-wands', name: 'Six of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('six-of-wands', 'Six of Wands', 'Wands') },
  { id: 'seven-of-wands', name: 'Seven of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('seven-of-wands', 'Seven of Wands', 'Wands') },
  { id: 'eight-of-wands', name: 'Eight of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('eight-of-wands', 'Eight of Wands', 'Wands') },
  { id: 'nine-of-wands', name: 'Nine of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('nine-of-wands', 'Nine of Wands', 'Wands') },
  { id: 'ten-of-wands', name: 'Ten of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('ten-of-wands', 'Ten of Wands', 'Wands') },
  { id: 'page-of-wands', name: 'Page of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('page-of-wands', 'Page of Wands', 'Wands') },
  { id: 'knight-of-wands', name: 'Knight of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('knight-of-wands', 'Knight of Wands', 'Wands') },
  { id: 'queen-of-wands', name: 'Queen of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('queen-of-wands', 'Queen of Wands', 'Wands') },
  { id: 'king-of-wands', name: 'King of Wands', suit: 'Wands', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('king-of-wands', 'King of Wands', 'Wands') },
  
  // Cups Suit
  { id: 'ace-of-cups', name: 'Ace of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('ace-of-cups', 'Ace of Cups', 'Cups') },
  { id: 'two-of-cups', name: 'Two of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('two-of-cups', 'Two of Cups', 'Cups') },
  { id: 'three-of-cups', name: 'Three of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('three-of-cups', 'Three of Cups', 'Cups') },
  { id: 'four-of-cups', name: 'Four of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('four-of-cups', 'Four of Cups', 'Cups') },
  { id: 'five-of-cups', name: 'Five of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('five-of-cups', 'Five of Cups', 'Cups') },
  { id: 'six-of-cups', name: 'Six of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('six-of-cups', 'Six of Cups', 'Cups') },
  { id: 'seven-of-cups', name: 'Seven of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('seven-of-cups', 'Seven of Cups', 'Cups') },
  { id: 'eight-of-cups', name: 'Eight of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('eight-of-cups', 'Eight of Cups', 'Cups') },
  { id: 'nine-of-cups', name: 'Nine of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('nine-of-cups', 'Nine of Cups', 'Cups') },
  { id: 'ten-of-cups', name: 'Ten of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('ten-of-cups', 'Ten of Cups', 'Cups') },
  { id: 'page-of-cups', name: 'Page of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('page-of-cups', 'Page of Cups', 'Cups') },
  { id: 'knight-of-cups', name: 'Knight of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('knight-of-cups', 'Knight of Cups', 'Cups') },
  { id: 'queen-of-cups', name: 'Queen of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('queen-of-cups', 'Queen of Cups', 'Cups') },
  { id: 'king-of-cups', name: 'King of Cups', suit: 'Cups', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('king-of-cups', 'King of Cups', 'Cups') },
  
  // Swords Suit
  { id: 'ace-of-swords', name: 'Ace of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('ace-of-swords', 'Ace of Swords', 'Swords') },
  { id: 'two-of-swords', name: 'Two of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('two-of-swords', 'Two of Swords', 'Swords') },
  { id: 'three-of-swords', name: 'Three of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('three-of-swords', 'Three of Swords', 'Swords') },
  { id: 'four-of-swords', name: 'Four of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('four-of-swords', 'Four of Swords', 'Swords') },
  { id: 'five-of-swords', name: 'Five of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('five-of-swords', 'Five of Swords', 'Swords') },
  { id: 'six-of-swords', name: 'Six of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('six-of-swords', 'Six of Swords', 'Swords') },
  { id: 'seven-of-swords', name: 'Seven of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('seven-of-swords', 'Seven of Swords', 'Swords') },
  { id: 'eight-of-swords', name: 'Eight of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('eight-of-swords', 'Eight of Swords', 'Swords') },
  { id: 'nine-of-swords', name: 'Nine of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('nine-of-swords', 'Nine of Swords', 'Swords') },
  { id: 'ten-of-swords', name: 'Ten of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('ten-of-swords', 'Ten of Swords', 'Swords') },
  { id: 'page-of-swords', name: 'Page of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('page-of-swords', 'Page of Swords', 'Swords') },
  { id: 'knight-of-swords', name: 'Knight of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('knight-of-swords', 'Knight of Swords', 'Swords') },
  { id: 'queen-of-swords', name: 'Queen of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('queen-of-swords', 'Queen of Swords', 'Swords') },
  { id: 'king-of-swords', name: 'King of Swords', suit: 'Swords', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('king-of-swords', 'King of Swords', 'Swords') },
  
  // Pentacles Suit
  { id: 'ace-of-pentacles', name: 'Ace of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('ace-of-pentacles', 'Ace of Pentacles', 'Pentacles') },
  { id: 'two-of-pentacles', name: 'Two of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('two-of-pentacles', 'Two of Pentacles', 'Pentacles') },
  { id: 'three-of-pentacles', name: 'Three of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('three-of-pentacles', 'Three of Pentacles', 'Pentacles') },
  { id: 'four-of-pentacles', name: 'Four of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('four-of-pentacles', 'Four of Pentacles', 'Pentacles') },
  { id: 'five-of-pentacles', name: 'Five of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('five-of-pentacles', 'Five of Pentacles', 'Pentacles') },
  { id: 'six-of-pentacles', name: 'Six of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('six-of-pentacles', 'Six of Pentacles', 'Pentacles') },
  { id: 'seven-of-pentacles', name: 'Seven of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('seven-of-pentacles', 'Seven of Pentacles', 'Pentacles') },
  { id: 'eight-of-pentacles', name: 'Eight of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('eight-of-pentacles', 'Eight of Pentacles', 'Pentacles') },
  { id: 'nine-of-pentacles', name: 'Nine of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('nine-of-pentacles', 'Nine of Pentacles', 'Pentacles') },
  { id: 'ten-of-pentacles', name: 'Ten of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('ten-of-pentacles', 'Ten of Pentacles', 'Pentacles') },
  { id: 'page-of-pentacles', name: 'Page of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('page-of-pentacles', 'Page of Pentacles', 'Pentacles') },
  { id: 'knight-of-pentacles', name: 'Knight of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('knight-of-pentacles', 'Knight of Pentacles', 'Pentacles') },
  { id: 'queen-of-pentacles', name: 'Queen of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('queen-of-pentacles', 'Queen of Pentacles', 'Pentacles') },
  { id: 'king-of-pentacles', name: 'King of Pentacles', suit: 'Pentacles', image: 'M10,50 L90,50 L90,150 L10,150 Z', svgElements: generateRandomSVGElements('king-of-pentacles', 'King of Pentacles', 'Pentacles') },
];

// Helper function to get a random card
export const getRandomCard = (): TarotCard => {
  const randomIndex = Math.floor(Math.random() * tarotDeck.length);
  return tarotDeck[randomIndex];
};
