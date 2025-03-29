
import React from 'react';
import { TarotProvider } from '../context/TarotContext';
import TarotReading from '../components/TarotReading';

const Index = () => {
  return (
    <TarotProvider>
      <TarotReading />
    </TarotProvider>
  );
};

export default Index;
