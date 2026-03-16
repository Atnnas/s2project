import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la empresa es obligatorio'],
    unique: true,
    trim: true,
  },
  contactPerson: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
  },
  logoUrl: {
    type: String,
  },
  socialMedia: {
    instagram: String,
    linkedin: String,
    facebook: String,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);
