import express from 'express';
import {
  submitFeedback,
  getMyFeedback,
  getFeedbackByUser,
  deleteFeedbackById
} from '../controllers/feedbackController.js';

import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/', protect, submitFeedback);
router.get('/my', protect, getMyFeedback);

// Admin routes
router.get('/:userId', protect, adminOnly, getFeedbackByUser);
router.delete('/:id', protect, adminOnly, deleteFeedbackById);

export default router;
