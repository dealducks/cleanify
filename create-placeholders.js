// Run this to create placeholder image references
// Usage: node create-placeholders.js

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create a simple placeholder image reference
const placeholders = [
  'hero-image.jpg',
  'home-cleaning.jpg',
  'office-cleaning.jpg',
  'about-hero.jpg',
  'why-choose-us.jpg',
  'office-benefits.jpg',
  'blog-1.jpg',
  'blog-2.jpg',
  'blog-3.jpg',
  'team-1.jpg',
  'team-2.jpg',
  'team-3.jpg',
  'avatar-1.jpg',
  'avatar-2.jpg',
  'avatar-3.jpg',
  'author-1.jpg',
  'author-2.jpg',
  'author-3.jpg',
];

console.log('Creating placeholder image files...\n');

placeholders.forEach(filename => {
  const filepath = path.join(imagesDir, filename);
  // Create empty file as placeholder
  fs.writeFileSync(filepath, '');
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All placeholder files created!');
console.log('\n⚠️  Note: These are empty files. Replace them with real images from:');
console.log('   - Unsplash.com (search "cleaning", "office cleaning", "home")');
console.log('   - Pexels.com');
console.log('   - Your own photos\n');
