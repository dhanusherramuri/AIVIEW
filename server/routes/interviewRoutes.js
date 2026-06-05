import express from 'express';
import {
  startInterview,
  submitAnswer,
  getInterview,
  getInterviewHistory,
  completeInterview,
} from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All interview routes are protected
router.use(protect);

// Routes
router.post('/start', startInterview);
router.post('/:id/answer', submitAnswer);
router.post('/:id/complete', completeInterview);
router.get('/:id', getInterview);
router.get('/', getInterviewHistory);

export default router;