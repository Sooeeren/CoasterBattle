const fs = require('fs');

// --- DEBUGGING: Print the environment variables Vercel sees ---
console.log('--- Vercel Environment Variable Check ---');
console.log('API_KEY:', process.env.API_KEY ? 'Loaded' : '!!! UNDEFINED !!!');
console.log('AUTH_DOMAIN:', process.env.AUTH_DOMAIN ? 'Loaded' : '!!! UNDEFINED !!!');
console.log('PROJECT_ID:', process.env.PROJECT_ID ? 'Loaded' : '!!! UNDEFINED !!!');
console.log('STORAGE_BUCKET:', process.env.STORAGE_BUCKET ? 'Loaded' : '!!! UNDEFINED !!!');
console.log('MESSAGING_SENDER_ID:', process.env.MESSAGING_SENDER_ID ? 'Loaded' : '!!! UNDEFINED !!!');
console.log('APP_ID:', process.env.APP_ID ? 'Loaded' : '!!! UNDEFINED !!!');
console.log('------------------------------------');
// --- END DEBUGGING ---

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const configFileContent = `export default ${JSON.stringify(config, null, 2)};`;
fs.writeFileSync('firebase-config.js', configFileContent);
console.log('Successfully created firebase-config.js');