const { execSync } = require('child_process');

console.log('Running custom build script...');
try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Build the app
  console.log('Building app...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
