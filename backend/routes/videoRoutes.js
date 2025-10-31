const express = require('express');
const router = express.Router();
const {
  getVideos,
  getVideoById,
  streamVideo,
  uploadVideo,
  updateVideo,
  deleteVideo,
  getRecommendedVideos,
} = require('../controllers/videoController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getVideos);
router.get('/:id', getVideoById);
router.get('/:id/recommended', getRecommendedVideos);

// Protected routes
router.get('/stream/:id', protect, streamVideo);

// Admin routes
router.post(
  '/',
  protect,
  admin,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  uploadVideo
);

router.put(
  '/:id',
  protect,
  admin,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  updateVideo
);

router.delete('/:id', protect, admin, deleteVideo);

module.exports = router;
