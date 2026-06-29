/** Shared domain types for AI Mastery 28 Ngày. */

export interface CurriculumDay {
  day: number;
  /** 1–4, used to group the 28 days into weekly themes. */
  week: number;
  title: string;
  /** Primary tool / topic featured that day. */
  tool: string;
  objective: string;
  lessonSummary: string;
  assignment: string;
  /** Display name of the downloadable resource (placeholder for now). */
  resourceName: string;
  estimatedMinutes: number;
}

export type QuizQuestionType = "single" | "multi";

export interface QuizOption {
  value: string;
  label: string;
  emoji?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  helper?: string;
  type: QuizQuestionType;
  options: QuizOption[];
}

/** Map of questionId -> selected value (single) or values (multi). */
export type QuizAnswers = Record<string, string | string[]>;

export type PlanId = "starter" | "pro" | "premium";

export interface Persona {
  id: string;
  title: string;
  emoji: string;
  description: string;
  /** Short bullet points describing the tailored learning path. */
  path: string[];
  recommendedPlan: PlanId;
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  /** Price in VND. */
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type OrderStatus = "pending" | "paid" | "cancelled";

export interface Order {
  id: string;
  planId: PlanId;
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
}
