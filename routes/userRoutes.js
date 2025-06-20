import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteMyAccount,
  getAllUsers,
  deleteUserById,
  updateUserById
} from '../controllers/userController.js';

import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Authenticated user routes
router.get('/me', protect, getCurrentUser);
router.delete('/me', protect, deleteMyAccount);

// Admin routes
router.get('/all', protect, adminOnly, getAllUsers);
router.delete('/:id', protect, adminOnly, deleteUserById);
router.put('/:id', protect, updateUserById); // both admin and user can update

export default router;
