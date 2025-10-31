const mongoose = require('mongoose');
const Video = require('../models/Video');
const User = require('../models/User');
require('dotenv').config();

const premiumMovies = [
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    videoUrl: '/uploads/videos/inception.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
    duration: 8880, // 148 minutes
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    cast: [
      { name: 'Leonardo DiCaprio', role: 'Dom Cobb' },
      { name: 'Joseph Gordon-Levitt', role: 'Arthur' },
      { name: 'Ellen Page', role: 'Ariadne' },
      { name: 'Tom Hardy', role: 'Eames' }
    ],
    director: 'Christopher Nolan',
    releaseYear: 2010,
    rating: 8.8,
    ageRating: 'U/A 13+',
    language: 'English',
    isPremium: true,
    isFeatured: true,
    isTrending: true,
    views: 2500000,
    likes: 450000
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    videoUrl: '/uploads/videos/dark-knight.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    duration: 9120, // 152 minutes
    genre: ['Action', 'Crime', 'Drama'],
    cast: [
      { name: 'Christian Bale', role: 'Bruce Wayne / Batman' },
      { name: 'Heath Ledger', role: 'Joker' },
      { name: 'Aaron Eckhart', role: 'Harvey Dent' },
      { name: 'Michael Caine', role: 'Alfred' }
    ],
    director: 'Christopher Nolan',
    releaseYear: 2008,
    rating: 9.0,
    ageRating: 'U/A 13+',
    language: 'English',
    isPremium: false,
    isFeatured: true,
    isTrending: true,
    views: 3000000,
    likes: 520000
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    videoUrl: '/uploads/videos/interstellar.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    duration: 10140, // 169 minutes
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    cast: [
      { name: 'Matthew McConaughey', role: 'Cooper' },
      { name: 'Anne Hathaway', role: 'Brand' },
      { name: 'Jessica Chastain', role: 'Murph' },
      { name: 'Michael Caine', role: 'Professor Brand' }
    ],
    director: 'Christopher Nolan',
    releaseYear: 2014,
    rating: 8.6,
    ageRating: 'U/A 13+',
    language: 'English',
    isPremium: true,
    isFeatured: true,
    isTrending: false,
    views: 2200000,
    likes: 380000
  },
  {
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    videoUrl: '/uploads/videos/shawshank.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
    duration: 8520, // 142 minutes
    genre: ['Drama'],
    cast: [
      { name: 'Tim Robbins', role: 'Andy Dufresne' },
      { name: 'Morgan Freeman', role: 'Ellis Boyd Redding' },
      { name: 'Bob Gunton', role: 'Warden Norton' },
      { name: 'William Sadler', role: 'Heywood' }
    ],
    director: 'Frank Darabont',
    releaseYear: 1994,
    rating: 9.3,
    ageRating: 'U/A 16+',
    language: 'English',
    isPremium: false,
    isFeatured: false,
    isTrending: true,
    views: 2800000,
    likes: 480000
  },
  {
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    videoUrl: '/uploads/videos/pulp-fiction.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80',
    duration: 9240, // 154 minutes
    genre: ['Crime', 'Drama'],
    cast: [
      { name: 'John Travolta', role: 'Vincent Vega' },
      { name: 'Samuel L. Jackson', role: 'Jules Winnfield' },
      { name: 'Uma Thurman', role: 'Mia Wallace' },
      { name: 'Bruce Willis', role: 'Butch Coolidge' }
    ],
    director: 'Quentin Tarantino',
    releaseYear: 1994,
    rating: 8.9,
    ageRating: 'A',
    language: 'English',
    isPremium: true,
    isFeatured: false,
    isTrending: false,
    views: 1800000,
    likes: 320000
  },
  {
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    videoUrl: '/uploads/videos/matrix.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    duration: 8160, // 136 minutes
    genre: ['Action', 'Sci-Fi'],
    cast: [
      { name: 'Keanu Reeves', role: 'Neo' },
      { name: 'Laurence Fishburne', role: 'Morpheus' },
      { name: 'Carrie-Anne Moss', role: 'Trinity' },
      { name: 'Hugo Weaving', role: 'Agent Smith' }
    ],
    director: 'The Wachowskis',
    releaseYear: 1999,
    rating: 8.7,
    ageRating: 'U/A 16+',
    language: 'English',
    isPremium: true,
    isFeatured: false,
    isTrending: true,
    views: 2100000,
    likes: 390000
  },
  {
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
    videoUrl: '/uploads/videos/forrest-gump.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    duration: 8520, // 142 minutes
    genre: ['Drama', 'Romance'],
    cast: [
      { name: 'Tom Hanks', role: 'Forrest Gump' },
      { name: 'Robin Wright', role: 'Jenny Curran' },
      { name: 'Gary Sinise', role: 'Lieutenant Dan Taylor' },
      { name: 'Sally Field', role: 'Mrs. Gump' }
    ],
    director: 'Robert Zemeckis',
    releaseYear: 1994,
    rating: 8.8,
    ageRating: 'U/A 13+',
    language: 'English',
    isPremium: false,
    isFeatured: false,
    isTrending: true,
    views: 2400000,
    likes: 420000
  },
  {
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    videoUrl: '/uploads/videos/godfather.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&q=80',
    duration: 10500, // 175 minutes
    genre: ['Crime', 'Drama'],
    cast: [
      { name: 'Marlon Brando', role: 'Don Vito Corleone' },
      { name: 'Al Pacino', role: 'Michael Corleone' },
      { name: 'James Caan', role: 'Sonny Corleone' },
      { name: 'Robert Duvall', role: 'Tom Hagen' }
    ],
    director: 'Francis Ford Coppola',
    releaseYear: 1972,
    rating: 9.2,
    ageRating: 'A',
    language: 'English',
    isPremium: true,
    isFeatured: true,
    isTrending: false,
    views: 1900000,
    likes: 350000
  },
  {
    title: 'The Hangover',
    description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.',
    videoUrl: '/uploads/videos/hangover.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&q=80',
    duration: 6000, // 100 minutes
    genre: ['Comedy'],
    cast: [
      { name: 'Bradley Cooper', role: 'Phil Wenneck' },
      { name: 'Ed Helms', role: 'Stu Price' },
      { name: 'Zach Galifianakis', role: 'Alan Garner' },
      { name: 'Justin Bartha', role: 'Doug Billings' }
    ],
    director: 'Todd Phillips',
    releaseYear: 2009,
    rating: 7.7,
    ageRating: 'A',
    language: 'English',
    isPremium: false,
    isFeatured: false,
    isTrending: true,
    views: 1500000,
    likes: 280000
  },
  {
    title: 'Avengers: Endgame',
    description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions.',
    videoUrl: '/uploads/videos/endgame.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80',
    duration: 10860, // 181 minutes
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    cast: [
      { name: 'Robert Downey Jr.', role: 'Tony Stark / Iron Man' },
      { name: 'Chris Evans', role: 'Steve Rogers / Captain America' },
      { name: 'Scarlett Johansson', role: 'Natasha Romanoff / Black Widow' },
      { name: 'Chris Hemsworth', role: 'Thor' }
    ],
    director: 'Anthony and Joe Russo',
    releaseYear: 2019,
    rating: 8.4,
    ageRating: 'U/A 13+',
    language: 'English',
    isPremium: true,
    isFeatured: true,
    isTrending: true,
    views: 3500000,
    likes: 600000
  }
];

const seedMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📡 MongoDB Connected');

    // Check if videos already exist
    const existingVideos = await Video.countDocuments();
    if (existingVideos > 0) {
      console.log(`ℹ️  Database already has ${existingVideos} videos`);
      console.log('💡 Skipping seed to avoid duplicates');
      process.exit(0);
    }

    // Get admin user
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.error('❌ Admin user not found. Run "npm run seed" first');
      process.exit(1);
    }

    // Add uploadedBy field
    const moviesWithUploader = premiumMovies.map(movie => ({
      ...movie,
      uploadedBy: admin._id
    }));

    // Insert movies
    await Video.insertMany(moviesWithUploader);
    
    console.log('✅ Premium movies added successfully!');
    console.log(`🎬 Added ${premiumMovies.length} movies to the database\n`);
    console.log('Movies added:');
    premiumMovies.forEach((movie, index) => {
      console.log(`   ${index + 1}. ${movie.title} (${movie.releaseYear}) - ${movie.genre.join(', ')}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding movies:', error);
    process.exit(1);
  }
};

seedMovies();
