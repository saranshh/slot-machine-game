import axios from 'axios';
import { GameSession, SpinResult, CashOutResult } from '../types/game';

const API_URL = '/api';

export const gameApi = {
  // Create a new game session
  createSession: async (): Promise<GameSession> => {
    const response = await axios.post(`${API_URL}/sessions`);
    return response.data;
  },
  
  // Spin the slot machine
  spin: async (sessionId: string): Promise<SpinResult> => {
    const response = await axios.post(`${API_URL}/sessions/${sessionId}/spin`);
    return response.data;
  },
  
  // Cash out and end the session
  cashOut: async (sessionId: string): Promise<CashOutResult> => {
    const response = await axios.post(`${API_URL}/sessions/${sessionId}/cashout`);
    return response.data;
  },
  
  // Get current session status
  getSession: async (sessionId: string): Promise<GameSession> => {
    const response = await axios.get(`${API_URL}/sessions/${sessionId}`);
    return response.data;
  }
};