const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getAllUsers,
  getUserById,
  toggleBlockUser,
  deleteUser,
  getAllPayments,
  getAnalytics,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// All routes require admin access
router.use(protect, admin);

router.get('/dashboard', getDashboard);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/block', toggleBlockUser);
router.delete('/users/:id', deleteUser);
router.get('/payments', getAllPayments);
router.get('/analytics', getAnalytics);

module.exports = router;
