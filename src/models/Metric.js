import mongoose from 'mongoose';

const MetricSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.models.Metric || mongoose.model('Metric', MetricSchema);
