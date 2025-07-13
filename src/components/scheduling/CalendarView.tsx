import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isSameDay, startOfDay } from 'date-fns';
import { Clock, Edit, Trash2, Eye, Calendar as CalendarIcon } from 'lucide-react';
import { ScheduledPost } from '../../types/scheduling';
import 'react-calendar/dist/Calendar.css';

interface CalendarViewProps {
  scheduledPosts: ScheduledPost[];
  onEditPost: (post: ScheduledPost) => void;
  onDeletePost: (postId: string) => void;
  onViewPost: (post: ScheduledPost) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  scheduledPosts,
  onEditPost,
  onDeletePost,
  onViewPost
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Get posts for selected date
  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      isSameDay(new Date(post.scheduledDate), date)
    );
  };

  // Get posts for selected date
  const selectedDatePosts = getPostsForDate(selectedDate);

  // Custom tile content for calendar
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const postsForDate = getPostsForDate(date);
      if (postsForDate.length > 0) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          </div>
        );
      }
    }
    return null;
  };

  // Custom tile class name
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const postsForDate = getPostsForDate(date);
      if (postsForDate.length > 0) {
        return 'has-posts';
      }
    }
    return '';
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getContentTypeEmoji = (contentType: string) => {
    switch (contentType) {
      case 'linkedin':
        return '💼';
      case 'twitter':
        return '🐦';
      case 'facebook':
        return '👥';
      case 'instagram':
        return '📸';
      default:
        return '📝';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-accent-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-primary-500" />
          Scheduled Posts
        </h3>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'calendar'
                ? 'bg-primary-500 text-white'
                : 'bg-accent-100 text-accent-600 hover:bg-accent-200'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-primary-500 text-white'
                : 'bg-accent-100 text-accent-600 hover:bg-accent-200'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <style jsx>{`
              .react-calendar {
                width: 100%;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 0.75rem;
                font-family: inherit;
              }
              .react-calendar__tile {
                position: relative;
                padding: 0.75rem 0.5rem;
                background: none;
                border: none;
                font-size: 0.875rem;
              }
              .react-calendar__tile:enabled:hover,
              .react-calendar__tile:enabled:focus {
                background-color: #f3f4f6;
              }
              .react-calendar__tile--active {
                background: #4C5FD5 !important;
                color: white;
              }
              .react-calendar__tile.has-posts {
                font-weight: 600;
              }
              .react-calendar__navigation button {
                color: #4C5FD5;
                font-weight: 600;
              }
              .react-calendar__navigation button:enabled:hover,
              .react-calendar__navigation button:enabled:focus {
                background-color: #f0f1fe;
              }
            `}</style>
            <Calendar
              onChange={(date) => setSelectedDate(date as Date)}
              value={selectedDate}
              tileContent={tileContent}
              tileClassName={tileClassName}
              className="w-full"
            />
          </div>

          {/* Selected Date Posts */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Posts for {format(selectedDate, 'MMMM d, yyyy')}
            </h4>
            
            {selectedDatePosts.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-accent-300 mx-auto mb-3" />
                <p className="text-accent-600">No posts scheduled for this date</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDatePosts.map((post) => (
                  <div key={post.id} className="border border-accent-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getContentTypeEmoji(post.contentType)}</span>
                        <span className="font-medium text-gray-900 text-sm">{post.title}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-xs text-accent-600 mb-3">
                      <Clock className="w-3 h-3 mr-1" />
                      {format(new Date(post.scheduledDate), 'h:mm a')}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.content.substring(0, 100)}...
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewPost(post)}
                        className="p-1 text-accent-400 hover:text-blue-500 transition-colors"
                        title="View post"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditPost(post)}
                        className="p-1 text-accent-400 hover:text-primary-500 transition-colors"
                        title="Edit post"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeletePost(post.id)}
                        className="p-1 text-accent-400 hover:text-red-500 transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {scheduledPosts.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-accent-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No scheduled posts</h3>
              <p className="text-accent-600">Schedule your first post to see it here</p>
            </div>
          ) : (
            scheduledPosts
              .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
              .map((post) => (
                <div key={post.id} className="border border-accent-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getContentTypeEmoji(post.contentType)}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{post.title}</h4>
                        <div className="flex items-center text-sm text-accent-600 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(new Date(post.scheduledDate), 'MMM d, yyyy • h:mm a')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onViewPost(post)}
                          className="p-2 text-accent-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View post"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditPost(post)}
                          className="p-2 text-accent-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeletePost(post.id)}
                          className="p-2 text-accent-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.content}
                  </p>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};