
import React, { useState } from 'react';
import { useTarot } from '../context/TarotProvider';
import { format, parseISO } from 'date-fns';
import { Menu, X, Trash2, Pencil } from 'lucide-react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';

const ReadingsSidebar: React.FC = () => {
  const { readings, sidebarOpen, toggleSidebar, loadReading, currentReading, deleteReading, renameReading } = useTarot();
  const [deletingReadingId, setDeletingReadingId] = useState<string | null>(null);
  const [editingReadingId, setEditingReadingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // Sort readings by timestamp, newest first
  const sortedReadings = [...readings].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingReadingId(id);
  };

  const handleEditClick = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingReadingId(id);
    setEditTitle(title);
  };

  const handleSaveEdit = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      renameReading(id, editTitle.trim());
      setEditingReadingId(null);
    }
  };

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
                <li key={reading.id} className="relative">
                  {editingReadingId === reading.id ? (
                    <form onSubmit={(e) => handleSaveEdit(reading.id, e)} className="w-full">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full p-3 rounded-md bg-tarot-darkPurple text-white focus:outline-none focus:ring-2 focus:ring-tarot-purple"
                        autoFocus
                        onBlur={() => setEditingReadingId(null)}
                      />
                    </form>
                  ) : (
                    <button
                      className={`w-full text-left p-3 rounded-md transition-colors group
                        ${reading.id === currentReading.id 
                          ? 'bg-tarot-purple text-white' 
                          : 'bg-tarot-darkPurple text-white hover:bg-tarot-purple/80'}`}
                      onClick={() => loadReading(reading.id)}
                    >
                      <div className="font-medium pr-16">{reading.title}</div>
                      <div className="text-xs mt-1 opacity-80">
                        {format(parseISO(reading.timestamp), 'MMM d, yyyy h:mm a')}
                      </div>
                      <div className="text-xs mt-2">
                        {reading.cards.length} card{reading.cards.length !== 1 ? 's' : ''} drawn
                      </div>
                      
                      <div className="absolute top-3 right-3 flex space-x-2 opacity-70 hover:opacity-100">
                        <button
                          onClick={(e) => handleEditClick(reading.id, reading.title, e)}
                          className="p-1 hover:bg-tarot-purple/50 rounded"
                          aria-label="Edit reading"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(reading.id, e)}
                          className="p-1 hover:bg-tarot-purple/50 rounded"
                          aria-label="Delete reading"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingReadingId} onOpenChange={() => setDeletingReadingId(null)}>
        <AlertDialogContent className="bg-tarot-background border border-tarot-purple text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-tarot-purple">Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Are you sure you want to delete this reading? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-tarot-darkPurple text-white hover:bg-tarot-darkPurple/80 border-tarot-purple">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (deletingReadingId) {
                  deleteReading(deletingReadingId);
                  setDeletingReadingId(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReadingsSidebar;
