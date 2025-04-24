
import React, { createContext, useContext } from 'react';
import { TarotContextState } from './TarotTypes';
import { useTarotActions } from './TarotActions';

// Create the context
const TarotContext = createContext<TarotContextState | undefined>(undefined);

// Provider component
export const TarotProvider = ({ children }: { children: React.ReactNode }) => {
  const actions = useTarotActions();

  return (
    <TarotContext.Provider value={{
      readings: actions.readings,
      currentReading: actions.currentReading,
      sidebarOpen: actions.sidebarOpen,
      drawCard: actions.drawCard,
      resetReading: actions.resetReading,
      updateCardPosition: actions.updateCardPosition,
      toggleSidebar: actions.toggleSidebar,
      loadReading: actions.loadReading,
      deleteReading: actions.deleteReading,
      renameReading: actions.renameReading
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
