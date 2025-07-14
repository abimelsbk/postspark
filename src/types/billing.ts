export interface Plan {
  id: string;
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  monthlyPosts: number;
  credits: number;
  features: string[];
  popular?: boolean;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  billingCycle: 'monthly' | 'annual';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'spent' | 'purchased';
  amount: number;
  action: 'ai_generation' | 'ai_enhance' | 'schedule_post' | 'carousel_generator' | 'export_pdf' | 'monthly_allotment' | 'top_up';
  description: string;
  createdAt: Date;
}

export interface UserBilling {
  userId: string;
  currentPlan: string;
  subscription?: Subscription;
  credits: number;
  monthlyPostsUsed: number;
  billingHistory: CreditTransaction[];
  lastCreditReset: Date;
}

export interface TopUpOption {
  credits: number;
  price: number;
  popular?: boolean;
}

export const CREDIT_COSTS = {
  ai_generation: 2,
  ai_enhance: 1,
  schedule_post: 2,
  carousel_generator: 8,
  export_pdf: 1,
  formatter_use: 0, // Free
} as const;

export const TOP_UP_OPTIONS: TopUpOption[] = [
  { credits: 50, price: 1.5 },
  { credits: 100, price: 2.5, popular: true },
  { credits: 250, price: 5 },
];

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    monthlyPosts: 3,
    credits: 10,
    features: [
      'Access all formatter styles',
      '1 AI generation per week',
      'No scheduling',
      'No analytics',
      'No carousel generator'
    ],
    color: 'from-gray-500 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 3, annual: 29 },
    monthlyPosts: 20,
    credits: 100,
    features: [
      'AI generation (expand + enhance)',
      'Post scheduling',
      'Export (copy/PDF)',
      'Basic analytics',
      'All formatter styles'
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
  },
  {
    id: 'creator',
    name: 'Creator',
    price: { monthly: 7, annual: 69 },
    monthlyPosts: 35,
    credits: 175,
    features: [
      'All Starter features',
      'Carousel generator',
      'Advanced analytics',
      'Priority support',
      '5 bonus monthly posts'
    ],
    popular: true,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
  },
  {
    id: 'creator-pro',
    name: 'Creator Pro',
    price: { monthly: 12, annual: 115 },
    monthlyPosts: 70,
    credits: 350,
    features: [
      'All Creator features',
      '24/7 support',
      'Early access to team tools',
      '10 bonus monthly posts'
    ],
    color: 'from-gradient-to-r from-purple-600 to-pink-600',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-300',
  },
];
