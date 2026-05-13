import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const SiteSettingsSchema = new mongoose.Schema({
  key: String,
  value: String,
  description: String
}, { timestamps: true });

const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    await SiteSettings.findOneAndUpdate(
      { key: 'pricing_tag' },
      { 
        value: 'Planes desde $500/mes', 
        description: 'Texto de precios que aparece en la página de servicios' 
      },
      { upsert: true }
    );

    console.log('Site settings seeded successfully');
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
