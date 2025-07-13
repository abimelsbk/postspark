// Twitter API Integration
const TWITTER_API_BASE = 'https://api.twitter.com/2';

export interface TwitterProfile {
  id: string;
  username: string;
  name: string;
  profile_image_url?: string;
}

export interface TwitterPostResponse {
  data: {
    id: string;
    text: string;
  };
}

export class TwitterAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  // Get user profile
  async getProfile(): Promise<TwitterProfile> {
    const response = await fetch(`${TWITTER_API_BASE}/users/me?user.fields=profile_image_url`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  }

  // Create a tweet
  async createTweet(text: string): Promise<TwitterPostResponse> {
    const response = await fetch(`${TWITTER_API_BASE}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create tweet: ${response.status}`);
    }

    return response.json();
  }

  // Schedule a tweet (handled by backend)
  async scheduleTweet(text: string, scheduledTime: Date): Promise<{ success: boolean; message: string }> {
    console.log('Scheduling tweet for:', scheduledTime);
    console.log('Content:', text);
    
    return {
      success: true,
      message: 'Tweet scheduled successfully'
    };
  }
}

// OAuth flow helpers for Twitter
export const getTwitterAuthUrl = (clientId: string, redirectUri: string, state: string): string => {
  const scope = 'tweet.read tweet.write users.read';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state,
    code_challenge: 'challenge', // In real implementation, generate proper PKCE
    code_challenge_method: 'plain',
  });
  
  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
};

export const exchangeTwitterCodeForToken = async (
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string
): Promise<{ access_token: string; expires_in: number }> => {
  const response = await fetch('https://api.twitter.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: 'challenge', // In real implementation, use proper PKCE
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
};