const fs = require('fs');
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/s2_project?ssl=true&replicaSet=atlas-p0tcts-shard-0&authSource=admin&retryWrites=true&w=majority";
const IMAGE_PATH = 'C:/Users/david/.gemini/antigravity/brain/0fa17bb8-8d7c-47a3-aa7f-982d118ac38e/test_agency_image_solution_1773527486699.png';

async function verifyPersistence() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const imageData = fs.readFileSync(IMAGE_PATH);
    const base64Image = `data:image/png;base64,${imageData.toString('base64')}`;

    const projectData = {
      title: "Direct DB Storage Verification",
      category: "Fotografía",
      client: "Alejabot Agency",
      imageUrl: base64Image,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await mongoose.connection.db.collection('projects').insertOne(projectData);
    console.log('Project inserted directly with ID:', result.insertedId);
    console.log('Base64 Length:', base64Image.length);

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

verifyPersistence();
