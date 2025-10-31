const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL'],
  },
  posterUrl: {
    type: String,
    required: [true, 'Please provide a poster URL'],
  },
  thumbnailUrl: {
    type: String,
  },
  duration: {
    type: Number, // in seconds
    required: true,
  },
  genre: [{
    type: String,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Documentary', 'Animation', 'Fantasy', 'Crime', 'Adventure'],
  }],
  cast: [{
    name: String,
    role: String,
  }],
  director: String,
  releaseYear: {
    type: Number,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  ageRating: {
    type: String,
    enum: ['U', 'U/A 7+', 'U/A 13+', 'U/A 16+', 'A'],
    default: 'U',
  },
  language: {
    type: String,
    default: 'English',
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Index for search
videoSchema.index({ title: 'text', description: 'text', 'cast.name': 'text' });

module.exports = mongoose.model('Video', videoSchema);
