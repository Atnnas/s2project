const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://davidartaviarodriguez_db_user:UYUNlKLuR1rSoTsu@ac-cxc8kvq-shard-00-00.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-01.jodngjz.mongodb.net:27017,ac-cxc8kvq-shard-00-02.jodngjz.mongodb.net:27017/s2_project?ssl=true&replicaSet=atlas-p0tcts-shard-0&authSource=admin&retryWrites=true&w=majority";

async function checkDb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to:', mongoose.connection.name);
    
    // Check all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    const projects = await mongoose.connection.db.collection('projects').find({
      $or: [
        { title: /Acme/i },
        { client: /Acme/i },
        { title: /Test Agency/i }
      ]
    }).toArray();
    
    console.log('Results found:', projects.length);
    projects.forEach(p => {
      console.log(`Title: ${p.title}, Category: ${p.category}, Client: ${p.client}`);
    });
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

checkDb();
