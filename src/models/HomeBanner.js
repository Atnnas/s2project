import mongoose from 'mongoose';

const HomeBannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Por favor proporciona un título.'],
  },
  subtitle: {
    type: String,
  },
  topText: {
    type: String,
    default: 'S2 Project • Boutique Agency',
  },
  imageUrl: {
    type: String,
    required: [true, 'Por favor proporciona una URL de imagen.'],
  },
  mobileImageUrl: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: ['hero'],
    default: 'hero',
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
