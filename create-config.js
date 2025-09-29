// This is a Node.js script that runs on Vercel's servers during deployment.
const fs = require('fs');

// It reads the secret Environment Variables...
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// ...and writes them into the firebase-config.js file with the correct module syntax.
// The 'export default' is included here.
const configFileContent = `export default ${JSON.stringify(config, null, 2)};`;

fs.writeFileSync('firebase-config.js', configFileContent);

console.log('Successfully created firebase-config.js');