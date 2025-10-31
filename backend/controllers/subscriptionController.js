const SubscriptionPlan = require('../models/SubscriptionPlan');
const Payment = require('../models/Payment');
const User = require('../models/User');
const crypto = require('crypto');

// @desc    Get all subscription plans
// @route   GET /api/subscriptions/plans
// @access  Public
exports.getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ isActive: true }).sort({ price: 1 });

    res.json({
      success: true,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get plan by ID
// @route   GET /api/subscriptions/plans/:id
// @access  Public
exports.getPlanById = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    res.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Subscribe to a plan
// @route   POST /api/subscriptions/subscribe
// @access  Private
exports.subscribe = async (req, res) => {
  try {
    const { planId, paymentMethod = 'mock' } = req.body;

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    const user = await User.findById(req.user._id);

    // Create payment record
    const transactionId = `TXN_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    
    const payment = await Payment.create({
      user: user._id,
      plan: plan._id,
      amount: plan.price,
      paymentMethod,
      transactionId,
      status: 'completed', // Mock payment - always successful
    });

    // Update user subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);

    user.subscription = {
      plan: plan._id,
      status: 'active',
      startDate,
      endDate,
    };

    await user.save();

    res.json({
      success: true,
      message: 'Subscription successful',
      data: {
        subscription: user.subscription,
        payment: {
          transactionId: payment.transactionId,
          amount: payment.amount,
          status: payment.status,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user subscription
// @route   GET /api/subscriptions/my-subscription
// @access  Private
exports.getMySubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('subscription.plan');

    res.json({
      success: true,
      data: user.subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Cancel subscription
// @route   POST /api/subscriptions/cancel
// @access  Private
exports.cancelSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.subscription.status = 'inactive';
    await user.save();

    res.json({
      success: true,
      message: 'Subscription cancelled',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create subscription plan (Admin)
// @route   POST /api/subscriptions/plans
// @access  Private/Admin
exports.createPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Plan created successfully',
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update subscription plan (Admin)
// @route   PUT /api/subscriptions/plans/:id
// @access  Private/Admin
exports.updatePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    res.json({
      success: true,
      message: 'Plan updated successfully',
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete subscription plan (Admin)
// @route   DELETE /api/subscriptions/plans/:id
// @access  Private/Admin
exports.deletePlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    await plan.deleteOne();

    res.json({
      success: true,
      message: 'Plan deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get payment history
// @route   GET /api/subscriptions/payments
// @access  Private
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('plan')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
