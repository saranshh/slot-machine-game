import express from 'express';
import * as sessionController from '../controllers/sessionController';

const router = express.Router();

// Create a new game session
router.post('/', sessionController.createSession);

// Get session by ID
router.get('/:sessionId', sessionController.getSession);

// Spin the slot machine
router.post('/:sessionId/spin', sessionController.spin);

// Cash out from the session
router.post('/:sessionId/cashout', sessionController.cashOut);

export default router;