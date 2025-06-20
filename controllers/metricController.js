import Metric from '../models/Metric.js';

// User: Submit a metric
export const submitMetric = async (req, res) => {
  try {
    const metric = new Metric({ ...req.body, user: req.user._id });
    await metric.save();
    res.status(201).json({ message: 'Metric recorded', metric });
  } catch (error) {
    res.status(500).json({ message: 'Metric submission failed', error });
  }
};

// User: Get own metrics
export const getMyMetrics = async (req, res) => {
  try {
    const metrics = await Metric.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve your metrics', error });
  }
};

// Admin: Get metrics by user ID
export const getMetricsByUser = async (req, res) => {
  try {
    const metrics = await Metric.find({ user: req.params.userId }).sort({ timestamp: -1 });
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve metrics for user', error });
  }
};

// Admin: Delete a metric by ID
export const deleteMetricById = async (req, res) => {
  try {
    await Metric.findByIdAndDelete(req.params.id);
    res.json({ message: 'Metric deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete metric', error });
  }
};
