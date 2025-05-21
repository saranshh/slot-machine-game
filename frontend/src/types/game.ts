export interface GameSession {
  id: string;
  credits: number;
  active: boolean;
  createdAt: string;
}

export interface SpinResult {
  sessionId: string;
  symbols: string[];
  win: boolean;
  winAmount: number;
  credits: number;
}

export interface CashOutResult {
  sessionId: string;
  credits: number;
  success: boolean;
}