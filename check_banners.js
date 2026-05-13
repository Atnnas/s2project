import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const HomeBannerSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
}, { timestamps: true });

const HomeBanner = mongoose.models.HomeBanner || mongoose.model('HomeBanner', HomeBannerSchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    const banners = await HomeBanner.find({});
    console.log(JSON.stringify(banners, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

check();
