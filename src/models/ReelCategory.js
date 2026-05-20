import mongoose from 'mongoose';

const ReelCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Proporciona un nombre para la subcategoría.'],
    unique: true,
    trim: true,
    index: true,
  },
  order: {
    type: Number,
    default: 0,
    index: true,
  },
}, { timestamps: true });

export default mongoose.models.ReelCategory || mongoose.model('ReelCategory', ReelCategorySchema);
