import React, { useState } from 'react';
import { Calendar, Clock, X, Send, Globe, Users, Linkedin, Twitter, ChevronDown } from 'lucide-react';
import { format, addDays, addHours, startOfHour } from 'date-fns';
import { ReadyToSchedulePost } from '../../types/scheduling';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (scheduledDate: Date, visibility: 'PUBLIC' | 'CONNECTIONS', platform: string) => void;
  content: string;
  contentType: string;
  readyToSchedulePosts?: ReadyToSchedulePost[];
  allowPostSelection?: boolean;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onSchedule,
  content,
  contentType,
  readyToSchedulePosts = [],
  allowPostSelection = false
}) => {
  const [selectedDate, setSelectedDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState(format(addHours(startOfHour(new Date()), 1), 'HH:mm'));
  const [visibility, setVisibility] = useState<'PUBLIC' | 'CONNECTIONS'>('PUBLIC');
  const [selectedPlatform, setSelectedPlatform] = useState<string>(contentType === 'tweet' ? 'twitter' : 'linkedin');
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [currentContent, setCurrentContent] = useState(content);
  const [currentContentType, setCurrentContentType] = useState(contentType);

  const handlePostSelection = (postId: string) => {
    if (postId === '') {
      setCurrentContent(content);
      setCurrentContentType(contentType);
    } else {
      const selectedPost = readyToSchedulePosts.find(post => post.id === postId);
      if (selectedPost) {
        setCurrentContent(selectedPost.content);
        setCurrentContentType(selectedPost.contentType);
        setSelectedPlatform(selectedPost.contentType === 'twitter' ? 'twitter' : 'linkedin');
      }
    }
    setSelectedPostId(postId);
  };

  const handleSchedule = () => {
    const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
    
    if (scheduledDateTime <= new Date()) {
      alert('Please select a future date and time');
      return;
    }

    onSchedule(scheduledDateTime, visibility, selectedPlatform);
    onClose();
  };

  const quickScheduleOptions = [
    { label: 'In 1 hour', date: addHours(new Date(), 1) },
    { label: 'Tomorrow 9 AM', date: new Date(addDays(new Date(), 1).setHours(9, 0, 0, 0)) },
    { label: 'Tomorrow 2 PM', date: new Date(addDays(new Date(), 1).setHours(14, 0, 0, 0)) },
    { label: 'Next Monday 9 AM', date: new Date(addDays(new Date(), 7 - new Date().getDay() + 1).setHours(9, 0, 0, 0)) },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary-500" />
            Schedule Post
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-accent-400 hover:text-accent-600 hover:bg-accent-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        {allowPostSelection && readyToSchedulePosts.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Post to Schedule
            </label>
            <div className="relative">
              <select
                value={selectedPostId}
                onChange={(e) => handlePostSelection(e.target.value)}
                className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none bg-white"
              >
                <option value="">Create new content...</option>
                {readyToSchedulePosts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.title} ({post.contentType})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent-400 pointer-events-none" />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Preview ({currentContentType})
          </label>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-3 max-h-32 overflow-y-auto">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {currentContent.length > 200 ? `${currentContent.substring(0, 200)}...` : currentContent}
            </p>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Publishing Platform
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedPlatform('linkedin')}
              className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                selectedPlatform === 'linkedin'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-accent-200 bg-white text-accent-600 hover:border-accent-300'
              }`}
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </button>
            <button
              onClick={() => setSelectedPlatform('twitter')}
              className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                selectedPlatform === 'twitter'
                  ? 'border-blue-400 bg-blue-50 text-blue-700'
                  : 'border-accent-200 bg-white text-accent-600 hover:border-accent-300'
              }`}
            >
              <Twitter className="w-5 h-5 mr-2" />
              X (Twitter)
            </button>
          </div>
        </div>

        {/* Quick Schedule Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Schedule
          </label>
          <div className="grid grid-cols-2 gap-2">
            {quickScheduleOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedDate(format(option.date, 'yyyy-MM-dd'));
                  setSelectedTime(format(option.date, 'HH:mm'));
                }}
                className="p-2 text-sm border border-accent-300 rounded-lg hover:bg-accent-50 transition-colors text-left"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date & Time */}
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border border-accent-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Visibility Settings */}
        {selectedPlatform === 'linkedin' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Visibility
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="PUBLIC"
                  checked={visibility === 'PUBLIC'}
                  onChange={(e) => setVisibility(e.target.value as 'PUBLIC' | 'CONNECTIONS')}
                  className="mr-3 text-primary-500 focus:ring-primary-500"
                />
                <Globe className="w-4 h-4 mr-2 text-accent-500" />
                <span className="text-sm text-gray-700">Public - Anyone on LinkedIn</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="CONNECTIONS"
                  checked={visibility === 'CONNECTIONS'}
                  onChange={(e) => setVisibility(e.target.value as 'PUBLIC' | 'CONNECTIONS')}
                  className="mr-3 text-primary-500 focus:ring-primary-500"
                />
                <Users className="w-4 h-4 mr-2 text-accent-500" />
                <span className="text-sm text-gray-700">Connections only</span>
              </label>
            </div>
          </div>
        )}

        {/* Character Count for Twitter */}
        {selectedPlatform === 'twitter' && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Character count:</span>
              <span className={`font-medium ${currentContent.length > 280 ? 'text-red-500' : 'text-green-500'}`}>
                {currentContent.length}/280
              </span>
            </div>
            {currentContent.length > 280 && (
              <p className="text-red-500 text-xs mt-1">
                Content exceeds Twitter's 280 character limit
              </p>
            )}
          </div>
        )}

        {/* Schedule Info */}
        <div className="mb-6 bg-primary-50 border border-primary-200 rounded-lg p-3">
          <div className="flex items-center text-primary-700">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              Scheduled for: {format(new Date(`${selectedDate}T${selectedTime}`), 'PPP p')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-accent-200 hover:bg-accent-300 text-accent-700 py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            disabled={selectedPlatform === 'twitter' && currentContent.length > 280}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 mr-2" />
            Schedule Post
          </button>
        </div>
      </div>
    </div>
  );
};