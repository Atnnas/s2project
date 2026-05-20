import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this project.'],
    enum: ['Fotografía', 'Reels', 'Arte Digital', 'Todos'],
    index: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  client: {
    type: String,
    default: 'S2 Project',
  },
  gallery: [
    {
      type: { type: String, enum: ['image', 'video'], required: true },
      url: { type: String, required: true }
    }
  ],
  date: {
    type: String,
  },
  metadata: {
    type: Object,
    default: {},
  },
  subcategory: {
    type: String,
    default: '',
    trim: true,
  },
}, {
  timestamps: true,
});

ProjectSchema.index({ createdAt: -1 });

if (mongoose.models.Project) {
  delete mongoose.models.Project;
}
export default mongoose.model('Project', ProjectSchema);
