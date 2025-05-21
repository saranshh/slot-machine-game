"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashOut = exports.spin = exports.getSession = exports.createSession = void 0;
const uuid_1 = require("uuid");
const Session_1 = __importDefault(require("../models/Session"));
const gameService_1 = require("../services/gameService");
// Create a new game session
const createSession = async (req, res) => {
    try {
        const sessionId = (0, uuid_1.v4)();
        const newSession = new Session_1.default({
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
    }
    catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ message: "Failed to create session" });
    }
};
exports.createSession = createSession;
// Get session by ID
const getSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session_1.default.findOne({ sessionId, active: true });
        if (!session) {
            return res.status(404).json({ message: "Session not found or inactive" });
        }
        res.status(200).json({
            id: session.sessionId,
            credits: session.credits,
            active: session.active,
            createdAt: session.createdAt,
        });
    }
    catch (error) {
        console.error("Error fetching session:", error);
        res.status(500).json({ message: "Failed to fetch session" });
    }
};
exports.getSession = getSession;
// Spin the slot machine
const spin = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session_1.default.findOne({ sessionId, active: true });
        if (!session) {
            return res.status(404).json({ message: "Session not found or inactive" });
        }
        if (session.credits < 1) {
            return res.status(400).json({ message: "Not enough credits to spin" });
        }
        session.credits -= 1;
        const result = (0, gameService_1.spin)(session.credits + 1);
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
    }
    catch (error) {
        console.error("Error spinning:", error);
        res.status(500).json({ message: "Failed to process spin" });
    }
};
exports.spin = spin;
// Cash out from the session
const cashOut = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session_1.default.findOne({ sessionId, active: true });
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
    }
    catch (error) {
        console.error("Error cashing out:", error);
        res.status(500).json({ message: "Failed to process cash out" });
    }
};
exports.cashOut = cashOut;
