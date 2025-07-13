// LinkedIn API Integration
const LINKEDIN_API_BASE = 'https://api.linkedin.com/v2';

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

export interface LinkedInPostResponse {
  id: string;
  activity: string;
}

export class LinkedInAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  // Get user profile
  async getProfile(): Promise<LinkedInProfile> {
    const response = await fetch(`${LINKEDIN_API_BASE}/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.status}`);
    }

    return response.json();
  }

  // Create a text post
  async createPost(content: string, visibility: 'PUBLIC' | 'CONNECTIONS' = 'PUBLIC'): Promise<LinkedInPostResponse> {
    const profile = await this.getProfile();
    
    const postData = {
      author: `urn:li:person:${profile.id}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': visibility
      }
    };

    const response = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create LinkedIn post: ${response.status}`);
    }

    return response.json();
  }

  // Schedule a post (this would typically be handled by your backend)
  async schedulePost(content: string, scheduledTime: Date): Promise<{ success: boolean; message: string }> {
    // In a real implementation, this would send the post data to your backend
    // which would store it and publish it at the scheduled time
    console.log('Scheduling post for:', scheduledTime);
    console.log('Content:', content);
    
    return {
      success: true,
      message: 'Post scheduled successfully'
    };
  }
}

// OAuth flow helpers
export const getLinkedInAuthUrl = (clientId: string, redirectUri: string, state: string): string => {
  const scope = 'r_liteprofile,r_emailaddress,w_member_social';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope,
  });
  
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
};

export const exchangeCodeForToken = async (
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<{ access_token: string; expires_in: number }> => {
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
};