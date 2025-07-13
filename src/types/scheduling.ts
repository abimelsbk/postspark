export interface ScheduledPost {
  id: string;
  noteId: string;
  title: string;
  content: string;
  contentType: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  scheduledDate: Date;
  status: 'scheduled' | 'published' | 'failed' | 'cancelled';
  linkedInPostId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReadyToSchedulePost {
  id: string;
  noteId: string;
  title: string;
  content: string;
  contentType: 'linkedin' | 'twitter' | 'facebook' | 'instagram';
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkedInAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
}