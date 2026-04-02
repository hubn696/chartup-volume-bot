export type NavItem =
  | "dashboard"
  | "volume"
  | "dex"
  | "makers"
  | "holders"
  | "settings";

export type OrderStatus = "running" | "completed" | "paused";

export interface Order {
  id: string;
  token: string;
  service: string;
  speed?: string;
  intensity?: number;
  targetHolders?: number;
  status: OrderStatus;
  timestamp: Date;
  amount?: number;
  startedAt?: Date;
  durationMs?: number;
}

export interface VolumeFormState {
  token: string;
  dex: "Raydium" | "Jupiter";
  amount: string;
  speed: "slow" | "balanced" | "fast";
  duration: number;
  minOrder: string;
  maxOrder: string;
}
