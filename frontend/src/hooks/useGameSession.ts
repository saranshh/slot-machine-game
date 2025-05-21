import { useState, useCallback } from 'react';
import { gameApi } from '../services/gameApi';
import { toast } from 'react-toastify';
import { GameSession, SpinResult } from '../types/game';

export const useGameSession = () => {
  const [session, setSession] = useState<GameSession | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initSession = useCallback(async () => {
    setLoading(true);
    try {
      const newSession = await gameApi.createSession();
      setSession(newSession);
      setCredits(newSession.credits);
      setError(null);
    } catch (err) {
      setError('Failed to create game session. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const pullLever = useCallback(async (): Promise<SpinResult> => {
    if (!session) {
      throw new Error('No active session');
    }
    
    setSpinning(true);
    try {
      const result = await gameApi.spin(session.id);
      setCredits(result.credits);
      
      if (result.win) {
        toast.success(`🎉 You won ${result.winAmount} credits!`);
      } else {
        toast.info('Better luck next time!');
      }
      
      return result;
    } catch (err) {
      toast.error('Spin failed. Please try again.');
      throw err;
    } finally {
      setSpinning(false);
    }
  }, [session]);

  const cashOut = useCallback(async () => {
    if (!session) {
      throw new Error('No active session');
    }
    
    try {
      const result = await gameApi.cashOut(session.id);
      setSession(null);
      setCredits(0);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, [session]);

  return {
    session,
    credits,
    loading,
    spinning,
    error,
    initSession,
    pullLever,
    cashOut
  };
};