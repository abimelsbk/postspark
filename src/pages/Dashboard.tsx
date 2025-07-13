import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Calendar, Tag, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { Sidebar } from '../components/dashboard/Sidebar';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('postspark_notes') || '[]');
    // Convert date strings back to Date objects
    const notesWithDates = savedNotes.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt)
    }));
    setNotes(notesWithDates);
  }, []);

  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem('postspark_notes', JSON.stringify(updatedNotes));
    setShowDeleteConfirm(null);
    
    // Update user usage count for free users
    if (user?.plan === 'free' && !user?.permissions?.unlimitedNotes) {
      const updatedUser = {
        ...user,
        usage: {
          ...user.usage,
          notes: Math.max(0, user.usage.notes - 1)
        }
      };
      localStorage.setItem('postspark_user', JSON.stringify(updatedUser));
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const getPreviewText = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-accent-50">
      <DashboardHeader />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Notes</h1>
                <p className="text-accent-600">
                  {user?.plan === 'super' 
                    ? `${notes.length} notes created (Unlimited)` :
                    user?.plan === 'free' 
                    ? `${notes.length}/3 notes created this month` 
                    : `${notes.length} notes created`
                  }
                </p>
              </div>
              
              <button
                onClick={() => navigate('/editor')}
                disabled={user?.plan === 'free' && notes.length >= 3 && !user?.permissions?.unlimitedNotes}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Note
                {user?.plan === 'free' && notes.length >= 3 && !user?.permissions?.unlimitedNotes && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">
                    Limit Reached
                  </span>
                )}
              </button>
            </div>

            {/* Usage Warning for Free Users */}
            {user?.plan === 'free' && notes.length >= 2 && !user?.permissions?.unlimitedNotes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-yellow-800 font-medium">
                        {notes.length >= 3 ? 'Monthly limit reached!' : 'Almost at your monthly limit!'}
                      </p>
                      <p className="text-yellow-700 text-sm">
                        {notes.length >= 3 
                          ? 'Upgrade to Pro for unlimited notes and AI generations.'
                          : `You have ${3 - notes.length} note${3 - notes.length === 1 ? '' : 's'} remaining this month.`
                        }
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}

            {/* Super User Welcome */}
            {user?.plan === 'super' && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                    <div>
                      <p className="text-purple-800 font-medium">
                        ⚡ Super User Access Activated
                      </p>
                      <p className="text-purple-700 text-sm">
                        You have unlimited access to all features including unlimited AI generations, notes, and admin controls.
                      </p>
                    </div>
                  </div>
                  {user?.permissions?.adminAccess && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Admin Panel
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-accent-200 mb-6">
              <div className="p-6 border-b border-accent-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-400" />
                    <input
                      type="text"
                      placeholder="Search notes by title or content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent-400" />
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white min-w-[150px]"
                    >
                      <option value="">All tags</option>
                      {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                          #{tag}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Edit className="w-12 h-12 text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {notes.length === 0 ? 'No notes yet' : 'No notes match your search'}
                </h3>
                <p className="text-accent-600 mb-6 max-w-md mx-auto">
                  {notes.length === 0 
                    ? 'Create your first note to start generating amazing LinkedIn content with AI assistance.'
                    : 'Try adjusting your search terms or filters to find what you\'re looking for.'
                  }
                </p>
                {notes.length === 0 && (
                  <button
                    onClick={() => navigate('/editor')}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Create First Note
                  </button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <div key={note.id} className="bg-white rounded-2xl shadow-sm border border-accent-200 hover:shadow-lg transition-all duration-200 group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 group-hover:text-primary-500 transition-colors cursor-pointer"
                            onClick={() => navigate(`/editor/${note.id}`)}>
                          {note.title}
                        </h3>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => navigate(`/editor/${note.id}`)}
                            className="p-2 text-accent-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Edit note"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(note.id)}
                            className="p-2 text-accent-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete note"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-accent-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {getPreviewText(note.content)}
                      </p>
                      
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {note.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                          {note.tags.length > 3 && (
                            <span className="text-xs text-accent-500">
                              +{note.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-accent-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Updated {note.updatedAt.toLocaleDateString()}
                        </div>
                        <div className="text-accent-400">
                          {note.content.length} chars
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-accent-200 px-6 py-4">
                      <button
                        onClick={() => navigate(`/editor/${note.id}`)}
                        className="w-full text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors hover:bg-primary-50 py-2 rounded-lg"
                      >
                        Open & Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Note</h3>
            <p className="text-accent-600 mb-6">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteNote(showDeleteConfirm)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-accent-200 hover:bg-accent-300 text-accent-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};