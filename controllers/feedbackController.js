import Feedback from '../models/Feedback.js';

// User: Submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback({
      ...req.body,
      user: req.user._id
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Feedback submission failed', error });
  }
};

// User: Get own feedback with optional filters
export const getMyFeedback = async (req, res) => {
  try {
    const { from, to, lat, lng, radius, minRating } = req.query;
    const query = { user: req.user._id };

    // Time range filter
    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from);
      if (to) query.timestamp.$lte = new Date(to);
    }

    // Satisfaction filter
    if (minRating) {
      query.satisfaction = { $gte: parseInt(minRating) };
    }

    // Location filter
    if (lat && lng && radius) {
      query.location = {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            parseFloat(radius) / 6378.1 // radius in radians
          ]
        }
      };
    }

    const feedbacks = await Feedback.find(query).sort({ timestamp: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your feedback', error });
  }
};

// Admin: Get feedback for a specific user with same filters
export const getFeedbackByUser = async (req, res) => {
  try {
    const { from, to, lat, lng, radius, minRating } = req.query;
    const query = { user: req.params.userId };

    if (from || to) {
      query.timestamp = {};
      if (from) query.timestamp.$gte = new Date(from);
      if (to) query.timestamp.$lte = new Date(to);
    }

    if (minRating) {
      query.satisfaction = { $gte: parseInt(minRating) };
    }

    if (lat && lng && radius) {
      query.location = {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            parseFloat(radius) / 6378.1
          ]
        }
      };
    }

    const feedbacks = await Feedback.find(query).sort({ timestamp: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user feedback', error });
  }
};

// Admin: Delete feedback by ID
export const deleteFeedbackById = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete feedback', error });
  }
};
