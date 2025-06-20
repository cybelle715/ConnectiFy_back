import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  satisfaction: {
    type: Number, // 1–5
    required: true,
  },
  responsiveness: Number,
  usability: Number,
  callReliability: Number,
  dataSpeed: Number,
  comment: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

// Add geospatial index
feedbackSchema.index({ location: '2dsphere' });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
