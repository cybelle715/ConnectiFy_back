import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  networkType: String, // 3G, 4G, 5G
  signalStrength: Number,
  latency: Number,
  jitter: Number,
  packetLoss: Number,
  bandwidth: Number,
  deviceModel: String,
  osVersion: String,
  location: {
    type: {
      lat: Number,
      lng: Number
    },
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Metric = mongoose.model('Metric', metricSchema);
export default Metric;
