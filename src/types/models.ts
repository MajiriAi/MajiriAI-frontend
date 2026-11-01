// These types mirror the Laravel API Resource shapes exactly (see backend/app/Http/Resources).
// Keep them in sync manually for the MVP — no codegen step yet.

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Founder {
  id: number;
  background: string | null;
  skills: string | null;
  experience: string | null;
  interests: string | null;
  personal_goals: string | null;
  resources: string | null;
}

export type StartupStage =
  | "idea"
  | "validation"
  | "building"
  | "launched"
  | "growth";

export interface Startup {
  id: number;
  name: string;
  description: string;
  problem: string;
  target_customers: string;
  industry: string;
  stage: StartupStage;
  solution: string;
  current_challenges: string | null;
  created_at: string;
}

export type GoalStatus = "active" | "completed" | "abandoned";

export interface Goal {
  id: number;
  startup_id: number;
  title: string;
  description: string | null;
  status: GoalStatus;
  progress: number; // 0-100
  deadline: string | null;
  created_at: string;
}

export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  startup_id: number;
  goal_id: number | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  created_at: string;
}

export type ActivityType =
  | "customer_interview"
  | "meeting"
  | "research"
  | "product_development"
  | "decision"
  | "experiment"
  | "milestone"
  | "note";

export interface Activity {
  id: number;
  startup_id: number;
  title: string;
  description: string | null;
  type: ActivityType;
  occurred_at: string;
  created_at: string;
}

export type MemoryCategory =
  | "founder"
  | "startup"
  | "customer"
  | "market"
  | "product"
  | "strategy"
  | "decision"
  | "constraint"
  | "insight";

export interface Memory {
  id: number;
  startup_id: number;
  content: string;
  category: MemoryCategory;
  importance: number; // 1-10
  source: string;
  created_at: string;
}

export type InsightType = "warning" | "recommendation" | "opportunity" | "observation";

export interface AiInsight {
  id: number;
  startup_id: number;
  title: string;
  content: string;
  type: InsightType;
  priority: TaskPriority;
  created_at: string;
}

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: number;
  conversation_id: number;
  role: MessageRole;
  content: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  startup_id: number;
  title: string | null;
  created_at: string;
}

export type GoalHealthStatus = "healthy" | "at_risk" | "stalled" | "completed";

export interface GoalHealth {
  id: number;
  title: string;
  status: GoalHealthStatus;
  reason: string;
  last_activity_at: string | null;
}

export interface NextAction {
  title: string;
  reason: string;
  priority: TaskPriority;
  source: string;
}

export interface FounderStateAnalysis {
  progress: { summary: string[] };
  stagnation: string[];
  neglected_areas: string[];
  patterns: string[];
  risks: string[];
  opportunities: string[];
  priorities: { item: string; priority: TaskPriority }[];
}

export interface StartupAnalysis {
  overall_summary: string;
  strengths: string[];
  concerns: string[];
  opportunities: string[];
  recommended_focus: string;
  next_actions: NextAction[];
}

export interface DashboardData {
  startup: Startup;
  founder_status: {
    stage: string;
    summary: string;
    priorities: FounderStateAnalysis["priorities"];
  };
  current_focus: string | null;
  goal_health: GoalHealth[];
  recommended_actions: NextAction[];
  ai_insight: AiInsight | null;
  current_goal: Goal | null;
  todays_tasks: Task[];
  recent_activities: Activity[];
  recent_progress: string[];
  state_analysis: FounderStateAnalysis;
}
