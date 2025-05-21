import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Session from "../models/Session";
import { spin as spinService } from "../services/gameService";

// Create a new game session
export const createSession = async (req: Request, res: Response) => {
  try {
    const sessionId = uuidv4();

    const newSession = new Session({
      sessionId,
      credits: 10,
      active: true,
    });

    await newSession.save();

    res.status(201).json({
      id: newSession.sessionId,
      credits: newSession.credits,
      active: newSession.active,
      createdAt: newSession.createdAt,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Failed to create session" });
  }
};

// Get session by ID
export const getSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ sessionId, active: true });

    if (!session) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }

    res.status(200).json({
      id: session.sessionId,
      credits: session.credits,
      active: session.active,
      createdAt: session.createdAt,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Failed to fetch session" });
  }
};

// Spin the slot machine
export const spin = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ sessionId, active: true });

    if (!session) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }

    if (session.credits < 1) {
      return res.status(400).json({ message: "Not enough credits to spin" });
    }

    session.credits -= 1;

    const result = spinService(session.credits + 1);

    if (result.win) {
      session.credits += result.winAmount;
    }

    await session.save();

    res.status(200).json({
      sessionId: session.sessionId,
      symbols: result.symbols,
      win: result.win,
      winAmount: result.win ? result.winAmount : 0,
      credits: session.credits,
    });
  } catch (error) {
    console.error("Error spinning:", error);
    res.status(500).json({ message: "Failed to process spin" });
  }
};

// Cash out from the session
export const cashOut = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ sessionId, active: true });

    if (!session) {
      return res.status(404).json({ message: "Session not found or inactive" });
    }

    // Mark session as inactive (cashed out)
    session.active = false;
    await session.save();

    res.status(200).json({
      sessionId: session.sessionId,
      credits: session.credits,
      success: true,
    });
  } catch (error) {
    console.error("Error cashing out:", error);
    res.status(500).json({ message: "Failed to process cash out" });
  }
};
