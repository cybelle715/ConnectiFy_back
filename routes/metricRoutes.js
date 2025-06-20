import express from 'express';
import {
  submitMetric,
  getMyMetrics,
  getMetricsByUser,
  deleteMetricById
} from '../controllers/metricController.js';

import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/', protect, submitMetric);
router.get('/my', protect, getMyMetrics);

// Admin routes
router.get('/:userId', protect, adminOnly, getMetricsByUser);
router.delete('/:id', protect, adminOnly, deleteMetricById);

export default router;
