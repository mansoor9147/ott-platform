const Video = require('../models/Video');
const path = require('path');
const fs = require('fs');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getVideos = async (req, res) => {
  try {
    const { genre, search, featured, trending, premium, page = 1, limit = 20 } = req.query;

    const query = {};

    if (genre) {
      query.genre = genre;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (trending === 'true') {
      query.isTrending = true;
    }

    if (premium === 'true') {
      query.isPremium = true;
    } else if (premium === 'false') {
      query.isPremium = false;
    }

    const videos = await Video.find(query)
      .populate('uploadedBy', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Video.countDocuments(query);

    res.json({
      success: true,
      data: videos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get video by ID
// @route   GET /api/videos/:id
// @access  Public
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('uploadedBy', 'name');

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    // Increment views
    video.views += 1;
    await video.save();

    res.json({
      success: true,
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Stream video
// @route   GET /api/videos/stream/:id
// @access  Private
exports.streamVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    // Check if premium content requires subscription
    if (video.isPremium && req.user.role !== 'admin') {
      const subscription = req.user.subscription;
      if (!subscription || subscription.status !== 'active') {
        return res.status(403).json({
          success: false,
          message: 'Premium subscription required',
        });
      }
    }

    const videoPath = path.join(__dirname, '..', video.videoUrl);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({
        success: false,
        message: 'Video file not found',
      });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Upload video
// @route   POST /api/videos
// @access  Private/Admin
exports.uploadVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      genre,
      cast,
      director,
      releaseYear,
      rating,
      ageRating,
      language,
      isPremium,
      isFeatured,
      isTrending,
    } = req.body;

    if (!req.files || !req.files.video || !req.files.poster) {
      return res.status(400).json({
        success: false,
        message: 'Please upload video and poster files',
      });
    }

    const videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
    const posterUrl = `/uploads/images/${req.files.poster[0].filename}`;
    const thumbnailUrl = req.files.thumbnail 
      ? `/uploads/images/${req.files.thumbnail[0].filename}` 
      : posterUrl;

    const video = await Video.create({
      title,
      description,
      videoUrl,
      posterUrl,
      thumbnailUrl,
      duration,
      genre: JSON.parse(genre || '[]'),
      cast: JSON.parse(cast || '[]'),
      director,
      releaseYear,
      rating,
      ageRating,
      language,
      isPremium: isPremium === 'true',
      isFeatured: isFeatured === 'true',
      isTrending: isTrending === 'true',
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Video uploaded successfully',
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private/Admin
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    const updates = { ...req.body };

    if (req.files) {
      if (req.files.video) {
        updates.videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
      }
      if (req.files.poster) {
        updates.posterUrl = `/uploads/images/${req.files.poster[0].filename}`;
      }
      if (req.files.thumbnail) {
        updates.thumbnailUrl = `/uploads/images/${req.files.thumbnail[0].filename}`;
      }
    }

    if (updates.genre) {
      updates.genre = JSON.parse(updates.genre);
    }
    if (updates.cast) {
      updates.cast = JSON.parse(updates.cast);
    }

    Object.assign(video, updates);
    await video.save();

    res.json({
      success: true,
      message: 'Video updated successfully',
      data: video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    // Delete files
    const videoPath = path.join(__dirname, '..', video.videoUrl);
    const posterPath = path.join(__dirname, '..', video.posterUrl);

    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
    if (fs.existsSync(posterPath)) {
      fs.unlinkSync(posterPath);
    }

    await video.deleteOne();

    res.json({
      success: true,
      message: 'Video deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get recommended videos
// @route   GET /api/videos/:id/recommended
// @access  Public
exports.getRecommendedVideos = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    // Find videos with similar genre
    const recommended = await Video.find({
      _id: { $ne: video._id },
      genre: { $in: video.genre },
    })
      .limit(10)
      .sort({ views: -1 });

    res.json({
      success: true,
      data: recommended,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
