// Scheduling Service - handles background scheduling and publishing
import { ScheduledPost } from '../types/scheduling';
import { LinkedInAPI } from './linkedinApi';
import { TwitterAPI } from './twitterApi';

export class SchedulingService {
  private static instance: SchedulingService;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): SchedulingService {
    if (!SchedulingService.instance) {
      SchedulingService.instance = new SchedulingService();
    }
    return SchedulingService.instance;
  }

  // Start the scheduling service
  start() {
    if (this.intervalId) return;

    // Check every minute for posts to publish
    this.intervalId = setInterval(() => {
      this.checkAndPublishPosts();
    }, 60000); // 1 minute

    console.log('Scheduling service started');
  }

  // Stop the scheduling service
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Scheduling service stopped');
    }
  }

  // Check for posts that need to be published
  private async checkAndPublishPosts() {
    try {
      const scheduledPosts = this.getScheduledPosts();
      const now = new Date();

      for (const post of scheduledPosts) {
        if (post.status === 'scheduled' && new Date(post.scheduledDate) <= now) {
          await this.publishPost(post);
        }
      }
    } catch (error) {
      console.error('Error checking scheduled posts:', error);
    }
  }

  // Publish a single post
  private async publishPost(post: ScheduledPost) {
    try {
      console.log(`Publishing post ${post.id} to ${post.contentType}`);

      // In a real implementation, you would:
      // 1. Get the user's access tokens from secure storage
      // 2. Use the appropriate API to publish the post
      // 3. Handle rate limiting and retries
      // 4. Update the post status based on the result

      let success = false;
      let publishedId = '';

      if (post.contentType === 'linkedin') {
        // const linkedinApi = new LinkedInAPI(userAccessToken);
        // const result = await linkedinApi.createPost(post.content);
        // publishedId = result.id;
        success = true; // Simulated success
      } else if (post.contentType === 'twitter') {
        // const twitterApi = new TwitterAPI(userAccessToken);
        // const result = await twitterApi.createTweet(post.content);
        // publishedId = result.data.id;
        success = true; // Simulated success
      }

      // Update post status
      this.updatePostStatus(post.id, success ? 'published' : 'failed', publishedId);

      console.log(`Post ${post.id} ${success ? 'published successfully' : 'failed to publish'}`);
    } catch (error) {
      console.error(`Error publishing post ${post.id}:`, error);
      this.updatePostStatus(post.id, 'failed');
    }
  }

  // Get scheduled posts from storage
  private getScheduledPosts(): ScheduledPost[] {
    const posts = JSON.parse(localStorage.getItem('postspark_scheduled_posts') || '[]');
    return posts.map((post: any) => ({
      ...post,
      scheduledDate: new Date(post.scheduledDate),
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt)
    }));
  }

  // Update post status
  private updatePostStatus(postId: string, status: ScheduledPost['status'], publishedId?: string) {
    const posts = this.getScheduledPosts();
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          status,
          linkedInPostId: publishedId,
          updatedAt: new Date()
        };
      }
      return post;
    });

    localStorage.setItem('postspark_scheduled_posts', JSON.stringify(updatedPosts));
  }

  // Schedule a new post
  schedulePost(post: ScheduledPost): void {
    const posts = this.getScheduledPosts();
    posts.push(post);
    localStorage.setItem('postspark_scheduled_posts', JSON.stringify(posts));
    console.log(`Post scheduled for ${post.scheduledDate}`);
  }

  // Cancel a scheduled post
  cancelPost(postId: string): void {
    this.updatePostStatus(postId, 'cancelled');
  }

  // Get posts by status
  getPostsByStatus(status: ScheduledPost['status']): ScheduledPost[] {
    return this.getScheduledPosts().filter(post => post.status === status);
  }

  // Get upcoming posts (next 7 days)
  getUpcomingPosts(): ScheduledPost[] {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return this.getScheduledPosts().filter(post => 
      post.status === 'scheduled' &&
      new Date(post.scheduledDate) >= now &&
      new Date(post.scheduledDate) <= nextWeek
    );
  }
}

// Initialize and start the scheduling service
export const schedulingService = SchedulingService.getInstance();