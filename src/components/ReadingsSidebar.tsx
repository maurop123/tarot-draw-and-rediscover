
import React from 'react';
import { useTarot } from '../context/TarotContext';
import { format, parseISO } from 'date-fns';
import { Menu, X } from 'lucide-react';

const ReadingsSidebar: React.FC = () => {
  const { readings, sidebarOpen, toggleSidebar, loadReading, currentReading } = useTarot();

  // Sort readings by timestamp, newest first
  const sortedReadings = [...readings].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <>
      {/* Hamburger menu button */}
      <button
        className="fixed top-4 left-4 z-50 bg-tarot-purple text-white p-2 rounded-md"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar content */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-tarot-background border-r border-tarot-purple
          transform transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? 'translate-x-0 animate-slide-in-left' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-tarot-darkPurple">
          <h2 className="text-xl font-bold text-tarot-purple">Reading History</h2>
          <button
            className="text-white hover:text-tarot-purple transition-colors"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)] p-4">
          {sortedReadings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No saved readings yet. Draw some cards to create a reading.
            </p>
          ) : (
            <ul className="space-y-3">
              {sortedReadings.map((reading) => (
                <li key={reading.id}>
                  <button
                    className={`w-full text-left p-3 rounded-md transition-colors
                      ${reading.id === currentReading.id 
                        ? 'bg-tarot-purple text-white' 
                        : 'bg-tarot-darkPurple text-white hover:bg-tarot-purple/80'}`}
                    onClick={() => loadReading(reading.id)}
                  >
                    <div className="font-medium">{reading.title}</div>
                    <div className="text-xs mt-1 opacity-80">
                      {format(parseISO(reading.timestamp), 'MMM d, yyyy h:mm a')}
                    </div>
                    <div className="text-xs mt-2">
                      {reading.cards.length} card{reading.cards.length !== 1 ? 's' : ''} drawn
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default ReadingsSidebar;
