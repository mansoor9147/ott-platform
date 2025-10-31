const express = require('express');
const router = express.Router();
const {
  getPlans,
  getPlanById,
  subscribe,
  getMySubscription,
  cancelSubscription,
  createPlan,
  updatePlan,
  deletePlan,
  getPaymentHistory,
} = require('../controllers/subscriptionController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/plans', getPlans);
router.get('/plans/:id', getPlanById);

// Protected routes
router.post('/subscribe', protect, subscribe);
router.get('/my-subscription', protect, getMySubscription);
router.post('/cancel', protect, cancelSubscription);
router.get('/payments', protect, getPaymentHistory);

// Admin routes
router.post('/plans', protect, admin, createPlan);
router.put('/plans/:id', protect, admin, updatePlan);
router.delete('/plans/:id', protect, admin, deletePlan);

module.exports = router;
