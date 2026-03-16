const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/s2_project?ssl=true&replicaSet=atlas-p0tcts-shard-0&authSource=admin&retryWrites=true&w=majority";

async function checkDb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully to database:', mongoose.connection.name);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections present:', collections.map(c => c.name));
    
    if (collections.some(c => c.name === 'projects')) {
      const projectCount = await mongoose.connection.db.collection('projects').countDocuments();
      console.log('Documents in "projects":', projectCount);
      
      const sample = await mongoose.connection.db.collection('projects').findOne();
      console.log('Sample project:', sample);
    } else {
      console.log('Collection "projects" NOT FOUND.');
    }
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

checkDb();
