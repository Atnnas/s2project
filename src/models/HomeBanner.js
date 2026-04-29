import mongoose from 'mongoose';

const HomeBannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor proporciona un título.'],
  },
  subtitle: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: [true, 'Por favor proporciona una URL de imagen.'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: ['hero', 'grid'],
    default: 'grid',
  },
  focalPoint: {
    type: String,
    enum: ['center', 'top', 'bottom'],
    default: 'center',
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

if (mongoose.models.HomeBanner) {
  delete mongoose.models.HomeBanner;
}
export default mongoose.model('HomeBanner', HomeBannerSchema);
