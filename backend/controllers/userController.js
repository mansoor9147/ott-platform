const User = require('../models/User');
const Video = require('../models/Video');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('subscription.plan')
      .populate('watchlist');

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    if (req.file) {
      user.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get watchlist
// @route   GET /api/users/watchlist
// @access  Private
exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('watchlist');

    res.json({
      success: true,
      data: user.watchlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add to watchlist
// @route   POST /api/users/watchlist/:videoId
// @access  Private
exports.addToWatchlist = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    const user = await User.findById(req.user._id);

    if (user.watchlist.includes(videoId)) {
      return res.status(400).json({
        success: false,
        message: 'Video already in watchlist',
      });
    }

    user.watchlist.push(videoId);
    await user.save();

    res.json({
      success: true,
      message: 'Added to watchlist',
      data: user.watchlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove from watchlist
// @route   DELETE /api/users/watchlist/:videoId
// @access  Private
exports.removeFromWatchlist = async (req, res) => {
  try {
    const { videoId } = req.params;

    const user = await User.findById(req.user._id);
    user.watchlist = user.watchlist.filter(id => id.toString() !== videoId);
    await user.save();

    res.json({
      success: true,
      message: 'Removed from watchlist',
      data: user.watchlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get watch history
// @route   GET /api/users/history
// @access  Private
exports.getWatchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('watchHistory.video');

    res.json({
      success: true,
      data: user.watchHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update watch progress
// @route   POST /api/users/watch-progress/:videoId
// @access  Private
exports.updateWatchProgress = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { progress } = req.body;

    const user = await User.findById(req.user._id);

    const existingIndex = user.watchHistory.findIndex(
      item => item.video.toString() === videoId
    );

    if (existingIndex !== -1) {
      user.watchHistory[existingIndex].progress = progress;
      user.watchHistory[existingIndex].watchedAt = Date.now();
    } else {
      user.watchHistory.push({
        video: videoId,
        progress,
        watchedAt: Date.now(),
      });
    }

    await user.save();

    res.json({
      success: true,
      message: 'Progress updated',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
