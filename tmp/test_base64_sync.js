const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const IMAGE_PATH = 'C:/Users/david/.gemini/antigravity/brain/0fa17bb8-8d7c-47a3-aa7f-982d118ac38e/test_agency_image_solution_1773527486699.png';

async function testUpload() {
  try {
    const imageData = fs.readFileSync(IMAGE_PATH);
    const base64Image = `data:image/png;base64,${imageData.toString('base64')}`;
    
    console.log('Image converted to Base64. Length:', base64Image.length);

    const payload = {
      title: "Base64 Quality Test",
      category: "Fotografía",
      client: "S2 Internal Test",
      imageUrl: base64Image
    };

    const res = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': 'next-auth.session-token=MANUAL_TEST' // Note: This might fail if middleware blocks it
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

testUpload();
