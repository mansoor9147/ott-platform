const mongoose = require('mongoose');
const Video = require('../models/Video');
require('dotenv').config();

const sampleVideos = [
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    videoUrl: '/uploads/videos/sample1.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    duration: 9120,
    genre: ['Action', 'Crime', 'Drama'],
    cast: [
      { name: 'Christian Bale', role: 'Bruce Wayne' },
      { name: 'Heath Ledger', role: 'Joker' }
    ],
    director: 'Christopher Nolan',
    releaseYear: 2008,
    rating: 9.0,
    ageRating: 'U/A 13+',
    language: 'English',
    isPremium: false,
    isFeatured: true,
    isTrending: true,
    views: 1500000,
    likes: 250000
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    videoUrl: '/uploads/videos/sample2.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
    duration: 8880,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    cast: [
      { name: 'Leonardo DiCaprio', role: 'Cobb' },
      { name: 'Joseph Gordon-Levitt', role: 'Arthur' }
    ],
    director: 'Christopher Nolan',
    releaseYear: 2010,
    rating: 8.8,
    ageRating: 'U/A 13+',
    language: 'English',
    isPremium: true,
    isFeatured: true,
    isTrending: true,
    views: 2000000,
    likes: 350000
  },
  {
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    videoUrl: '/uploads/videos/sample3.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
    duration: 8520,
    genre: ['Drama'],
    cast: [
      { name: 'Tim Robbins', role: 'Andy Dufresne' },
      { name: 'Morgan Freeman', role: 'Red' }
    ],
    director: 'Frank Darabont',
    releaseYear: 1994,
    rating: 9.3,
    ageRating: 'U/A 16+',
    language: 'English',
    isPremium: false,
    isFeatured: false,
    isTrending: true,
    views: 1800000,
    likes: 300000
  },
  {
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    videoUrl: '/uploads/videos/sample4.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
    duration: 9240,
    genre: ['Crime', 'Drama'],
    cast: [
      { name: 'John Travolta', role: 'Vincent Vega' },
      { name: 'Samuel L. Jackson', role: 'Jules Winnfield' }
    ],
    director: 'Quentin Tarantino',
    releaseYear: 1994,
    rating: 8.9,
    ageRating: 'A',
    language: 'English',
    isPremium: true,
    isFeatured: false,
    isTrending: false,
    views: 1200000,
    likes: 180000
  },
  {
    title: 'The Hangover',
    description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.',
    videoUrl: '/uploads/videos/sample5.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    duration: 6000,
    genre: ['Comedy'],
    cast: [
      { name: 'Bradley Cooper', role: 'Phil' },
      { name: 'Zach Galifianakis', role: 'Alan' }
    ],
    director: 'Todd Phillips',
    releaseYear: 2009,
    rating: 7.7,
    ageRating: 'A',
    language: 'English',
    isPremium: false,
    isFeatured: false,
    isTrending: true,
    views: 900000,
    likes: 120000
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    videoUrl: '/uploads/videos/sample6.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400',
    duration: 10140,
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper' },
      { name: 'Anne Hathaway', role: 'Brand' }
    ],
    director: 'Christopher Nolan',
    releaseYear: 2014,
    rating: 8.6,
    ageRating: 'U/A 13+',
    language: 'English',
    isPremium: true,
    isFeatured: true,
    isTrending: false,
    views: 1600000,
    likes: 280000
  }
];

const seedVideos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📡 MongoDB Connected');

    // Clear existing videos (optional)
    // await Video.deleteMany({});
    // console.log('🗑️  Cleared existing videos');

    // Check if videos already exist
    const existingVideos = await Video.countDocuments();
    if (existingVideos > 0) {
      console.log(`ℹ️  Database already has ${existingVideos} videos`);
      console.log('💡 Skipping seed to avoid duplicates');
      process.exit(0);
    }

    // Create admin user reference (use the seeded admin)
    const User = require('../models/User');
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.error('❌ Admin user not found. Run "npm run seed" first');
      process.exit(1);
    }

    // Add uploadedBy field to all videos
    const videosWithUploader = sampleVideos.map(video => ({
      ...video,
      uploadedBy: admin._id
    }));

    // Insert videos
    await Video.insertMany(videosWithUploader);
    
    console.log('✅ Sample videos created successfully!');
    console.log(`📹 Added ${sampleVideos.length} videos to the database`);
    console.log('\n🎬 Sample Videos:');
    sampleVideos.forEach((video, index) => {
      console.log(`   ${index + 1}. ${video.title} (${video.genre.join(', ')})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding videos:', error);
    process.exit(1);
  }
};

seedVideos();
