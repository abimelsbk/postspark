import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Eye, X, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CalendarView } from '../components/scheduling/CalendarView';
import { ScheduleModal } from '../components/scheduling/ScheduleModal';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { Sidebar } from '../components/dashboard/Sidebar';
import { ScheduledPost, ReadyToSchedulePost } from '../types/scheduling';

export const SchedulingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [readyToSchedulePosts, setReadyToSchedulePosts] = useState<ReadyToSchedulePost[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [selectedContentForScheduling, setSelectedContentForScheduling] = useState<{content: string, type: string} | null>(null);

  // Load scheduled posts from localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('postspark_scheduled_posts') || '[]');
    const postsWithDates = savedPosts.map((post: any) => ({
      ...post,
      scheduledDate: new Date(post.scheduledDate),
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt)
    }));
    setScheduledPosts(postsWithDates);
  }, []);

  // Load ready-to-schedule posts
  useEffect(() => {
    const savedReadyPosts = JSON.parse(localStorage.getItem('postspark_ready_to_schedule') || '[]');
    const postsWithDates = savedReadyPosts.map((post: any) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt)
    }));
    setReadyToSchedulePosts(postsWithDates);
  }, []);

  const handleEditPost = (post: ScheduledPost) => {
    // Navigate to editor with the note
    navigate(`/editor/${post.noteId}`);
  };

  const handleDeletePost = (postId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this scheduled post?');
    if (confirmed) {
      const updatedPosts = scheduledPosts.filter(post => post.id !== postId);
      setScheduledPosts(updatedPosts);
      localStorage.setItem('postspark_scheduled_posts', JSON.stringify(updatedPosts));
    }
  };

  const handleViewPost = (post: ScheduledPost) => {
    setSelectedPost(post);
    setShowViewModal(true);
  };

  const handleScheduleFromScratch = (scheduledDate: Date, visibility: 'PUBLIC' | 'CONNECTIONS', platform: string) => {
    // This would typically create a new note and schedule it
    alert('This would create a new post and schedule it. Feature coming soon!');
    setShowScheduleModal(false);
  };

  const handleScheduleFromReady = (scheduledDate: Date, visibility: 'PUBLIC' | 'CONNECTIONS', platform: string) => {
    // Get the selected content from the modal
    const selectedReadyPost = readyToSchedulePosts.find(post => 
      // This would be determined by the modal's selection
      true // Placeholder - the modal will handle the actual selection
    );

    if (selectedReadyPost) {
      const scheduledPost: ScheduledPost = {
        id: Date.now().toString(),
        noteId: selectedReadyPost.noteId,
        title: selectedReadyPost.title,
        content: selectedReadyPost.content,
        contentType: platform as 'linkedin' | 'twitter' | 'facebook' | 'instagram',
        scheduledDate,
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to scheduled posts
      const updatedScheduledPosts = [...scheduledPosts, scheduledPost];
      setScheduledPosts(updatedScheduledPosts);
      localStorage.setItem('postspark_scheduled_posts', JSON.stringify(updatedScheduledPosts));

      // Remove from ready-to-schedule
      const updatedReadyPosts = readyToSchedulePosts.filter(post => post.id !== selectedReadyPost.id);
      setReadyToSchedulePosts(updatedReadyPosts);
      localStorage.setItem('postspark_ready_to_schedule', JSON.stringify(updatedReadyPosts));
    }

    setShowScheduleModal(false);
    alert('Post scheduled successfully!');
  };

  return (
    <div className="min-h-screen bg-accent-50">
      <DashboardHeader />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Scheduling</h1>
                <p className="text-accent-600">
                  Manage and schedule your content across LinkedIn and X (Twitter)
                </p>
              </div>
              
              <button
                onClick={() => {
                  setSelectedContentForScheduling(null);
                  setShowScheduleModal(true);
                }}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center transition-colors shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Schedule New Post
              </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-accent-600">Total Scheduled</p>
                    <p className="text-3xl font-bold text-gray-900">{scheduledPosts.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-accent-600">Published</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {scheduledPosts.filter(p => p.status === 'published').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-accent-600">Pending</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {scheduledPosts.filter(p => p.status === 'scheduled').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-accent-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-accent-600">Failed</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {scheduledPosts.filter(p => p.status === 'failed').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Ready to Schedule Section */}
            {readyToSchedulePosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-accent-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">📋 Ready to Schedule</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {readyToSchedulePosts.length} ready
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {readyToSchedulePosts.map((post) => (
                    <div key={post.id} className="border border-accent-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{post.title}</h4>
                        <span className="text-xs bg-accent-100 text-accent-600 px-2 py-1 rounded-full">
                          {post.contentType}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {post.content.substring(0, 80)}...
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-accent-500">
                          {post.createdAt.toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedContentForScheduling({ content: post.content, type: post.contentType });
                            setShowScheduleModal(true);
                          }}
                          className="flex items-center px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          Schedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar View */}
            <CalendarView
              scheduledPosts={scheduledPosts}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              onViewPost={handleViewPost}
            />
          </div>
        </main>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedContentForScheduling && (
        <ScheduleModal
          isOpen={showScheduleModal}
          onClose={() => {
            setShowScheduleModal(false);
            setSelectedContentForScheduling(null);
          }}
          onSchedule={handleScheduleFromReady}
          content={selectedContentForScheduling.content}
          contentType={selectedContentForScheduling.type}
          readyToSchedulePosts={readyToSchedulePosts}
          allowPostSelection={true}
        />
      )}

      {/* Schedule Modal for new content */}
      {showScheduleModal && !selectedContentForScheduling && (
        <ScheduleModal
          isOpen={showScheduleModal}
          onClose={() => {
            setShowScheduleModal(false);
            setSelectedContentForScheduling(null);
          }}
          onSchedule={handleScheduleFromScratch}
          content="Create new content to schedule..."
          contentType="linkedin"
          readyToSchedulePosts={readyToSchedulePosts}
          allowPostSelection={true}
        />
      )}

      {/* View Post Modal */}
      {showViewModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Post Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 text-accent-400 hover:text-accent-600 hover:bg-accent-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <p className="text-gray-900">{selectedPost.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <p className="text-gray-900 capitalize">{selectedPost.contentType}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                <p className="text-gray-900">{selectedPost.scheduledDate.toLocaleString()}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  selectedPost.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                  selectedPost.status === 'published' ? 'bg-green-100 text-green-700' :
                  selectedPost.status === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {selectedPost.status}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {selectedPost.content}
                  </pre>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEditPost(selectedPost);
                }}
                className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Edit Post
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 bg-accent-200 hover:bg-accent-300 text-accent-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};