const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getWatchHistory,
  updateWatchProgress,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', upload.single('profilePicture'), updateProfile);
router.get('/watchlist', getWatchlist);
router.post('/watchlist/:videoId', addToWatchlist);
router.delete('/watchlist/:videoId', removeFromWatchlist);
router.get('/history', getWatchHistory);
router.post('/watch-progress/:videoId', updateWatchProgress);

module.exports = router;
