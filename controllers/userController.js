import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Feedback from '../models/Feedback.js';
import Metric from '../models/Metric.js';

// Register
export const registerUser = async (req, res) => {
  const { name, phone, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(409).json({ message: 'User already exists' });

  const user = await User.create({ name, phone, email, password });
  res.status(201).json({
    message: 'User registered successfully',
    user: { _id: user._id, name: user.name, email: user.email }
  });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({
    message: 'Login successful',
    token,
    user: { _id: user._id, name: user.name, email: user.email }
  });
};

// Get current user
export const getCurrentUser = async (req, res) => {
  res.json(req.user);
};

// Delete own account
export const deleteMyAccount = async (req, res) => {
  const userId = req.user._id;
  await Feedback.deleteMany({ user: userId });
  await Metric.deleteMany({ user: userId });
  await User.findByIdAndDelete(userId);
  res.json({ message: 'Your account and data have been deleted.' });
};

// Admin: Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Admin: Delete user
export const deleteUserById = async (req, res) => {
  await Feedback.deleteMany({ user: req.params.id });
  await Metric.deleteMany({ user: req.params.id });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted by admin.' });
};

// Admin/User: Update user
export const updateUserById = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
  res.json({ message: 'User updated', user });
};
