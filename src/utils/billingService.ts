import { CREDIT_COSTS, PLANS, UserBilling, CreditTransaction, Subscription } from '../types/billing';

export class BillingService {
  private static instance: BillingService;

  private constructor() {}

  static getInstance(): BillingService {
    if (!BillingService.instance) {
      BillingService.instance = new BillingService();
    }
    return BillingService.instance;
  }

  // Get user's billing information
  getUserBilling(userId: string): UserBilling {
    const saved = localStorage.getItem(`billing_${userId}`);
    if (saved) {
      const billing = JSON.parse(saved);
      return {
        ...billing,
        lastCreditReset: new Date(billing.lastCreditReset),
        billingHistory: billing.billingHistory.map((tx: any) => ({
          ...tx,
          createdAt: new Date(tx.createdAt)
        })),
        subscription: billing.subscription ? {
          ...billing.subscription,
          currentPeriodStart: new Date(billing.subscription.currentPeriodStart),
          currentPeriodEnd: new Date(billing.subscription.currentPeriodEnd),
          createdAt: new Date(billing.subscription.createdAt),
          updatedAt: new Date(billing.subscription.updatedAt),
        } : undefined
      };
    }

    // Default billing for new users
    const defaultBilling: UserBilling = {
      userId,
      currentPlan: 'free',
      credits: 10,
      monthlyPostsUsed: 0,
      billingHistory: [],
      lastCreditReset: new Date(),
    };

    this.saveBilling(defaultBilling);
    return defaultBilling;
  }

  // Save billing information
  private saveBilling(billing: UserBilling): void {
    localStorage.setItem(`billing_${billing.userId}`, JSON.stringify(billing));
  }

  // Check if user can perform an action
  canPerformAction(userId: string, action: keyof typeof CREDIT_COSTS): { canPerform: boolean; reason?: string } {
    const billing = this.getUserBilling(userId);
    const cost = CREDIT_COSTS[action];

    if (cost === 0) {
      return { canPerform: true };
    }

    if (billing.credits < cost) {
      return { 
        canPerform: false, 
        reason: `Insufficient credits. Need ${cost} credits, have ${billing.credits}.` 
      };
    }

    // Check monthly post limit for certain actions
    if (action === 'schedule_post' || action === 'ai_generation') {
      const plan = PLANS.find(p => p.id === billing.currentPlan);
      if (plan && billing.monthlyPostsUsed >= plan.monthlyPosts) {
        return {
          canPerform: false,
          reason: `Monthly post limit reached (${plan.monthlyPosts} posts).`
        };
      }
    }

    return { canPerform: true };
  }

  // Spend credits for an action
  spendCredits(userId: string, action: keyof typeof CREDIT_COSTS, description: string): boolean {
    const canPerform = this.canPerformAction(userId, action);
    if (!canPerform.canPerform) {
      return false;
    }

    const billing = this.getUserBilling(userId);
    const cost = CREDIT_COSTS[action];

    if (cost > 0) {
      billing.credits -= cost;
      
      const transaction: CreditTransaction = {
        id: Date.now().toString(),
        userId,
        type: 'spent',
        amount: -cost,
        action,
        description,
        createdAt: new Date(),
      };

      billing.billingHistory.push(transaction);
    }

    // Increment monthly post usage for relevant actions
    if (action === 'schedule_post' || action === 'ai_generation') {
      billing.monthlyPostsUsed++;
    }

    this.saveBilling(billing);
    return true;
  }

  // Add credits (top-up or monthly allotment)
  addCredits(userId: string, amount: number, type: 'purchased' | 'earned', description: string): void {
    const billing = this.getUserBilling(userId);
    billing.credits += amount;

    const transaction: CreditTransaction = {
      id: Date.now().toString(),
      userId,
      type,
      amount,
      action: type === 'purchased' ? 'top_up' : 'monthly_allotment',
      description,
      createdAt: new Date(),
    };

    billing.billingHistory.push(transaction);
    this.saveBilling(billing);
  }

  // Subscribe to a plan
  subscribeToPlan(userId: string, planId: string, billingCycle: 'monthly' | 'annual'): Subscription {
    const billing = this.getUserBilling(userId);
    const plan = PLANS.find(p => p.id === planId);
    
    if (!plan) {
      throw new Error('Plan not found');
    }

    const now = new Date();
    const periodEnd = new Date(now);
    if (billingCycle === 'monthly') {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }

    const subscription: Subscription = {
      id: Date.now().toString(),
      userId,
      planId,
      status: 'active',
      billingCycle,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
      createdAt: now,
      updatedAt: now,
    };

    billing.currentPlan = planId;
    billing.subscription = subscription;
    billing.monthlyPostsUsed = 0; // Reset on new subscription
    billing.lastCreditReset = now;

    // Add initial credits for the plan
    this.addCredits(userId, plan.credits, 'earned', `${plan.name} plan credits`);

    this.saveBilling(billing);
    return subscription;
  }

  // Cancel subscription
  cancelSubscription(userId: string): void {
    const billing = this.getUserBilling(userId);
    if (billing.subscription) {
      billing.subscription.cancelAtPeriodEnd = true;
      billing.subscription.updatedAt = new Date();
      this.saveBilling(billing);
    }
  }

  // Check and reset monthly limits
  checkMonthlyReset(userId: string): void {
    const billing = this.getUserBilling(userId);
    const now = new Date();
    const lastReset = billing.lastCreditReset;
    
    // Check if a month has passed
    const monthsPassed = (now.getFullYear() - lastReset.getFullYear()) * 12 + 
                        (now.getMonth() - lastReset.getMonth());
    
    if (monthsPassed >= 1) {
      const plan = PLANS.find(p => p.id === billing.currentPlan);
      if (plan) {
        // Reset monthly posts
        billing.monthlyPostsUsed = 0;
        billing.lastCreditReset = now;
        
        // Add monthly credits
        this.addCredits(userId, plan.credits, 'earned', `Monthly ${plan.name} credits`);
      }
    }
  }

  // Get plan by ID
  getPlan(planId: string) {
    return PLANS.find(p => p.id === planId);
  }

  // Calculate savings for annual billing
  getAnnualSavings(planId: string): { amount: number; percentage: number } {
    const plan = PLANS.find(p => p.id === planId);
    if (!plan || plan.price.monthly === 0) {
      return { amount: 0, percentage: 0 };
    }

    const monthlyTotal = plan.price.monthly * 12;
    const annualPrice = plan.price.annual;
    const savings = monthlyTotal - annualPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);

    return { amount: savings, percentage };
  }
}

export const billingService = BillingService.getInstance();
