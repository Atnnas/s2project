import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI in .env.local");
  process.exit(1);
}

const HomeBannerSchema = new mongoose.Schema({
  type: String,
}, { timestamps: true });

const HomeBanner = mongoose.models.HomeBanner || mongoose.model('HomeBanner', HomeBannerSchema);

async function migrate() {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Updating all banners to 'hero'...");
    const result = await HomeBanner.updateMany({}, { $set: { type: 'hero' } });
    console.log(`✓ Migration complete. Updated ${result.modifiedCount} banners.`);
  } catch (e) {
    console.error("Database error:", e);
  } finally {
    await mongoose.disconnect();
  }
}

migrate();
