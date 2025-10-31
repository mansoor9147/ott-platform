const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a plan name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  duration: {
    type: Number, // in days
    required: [true, 'Please provide a duration'],
  },
  features: [{
    type: String,
  }],
  videoQuality: {
    type: String,
    enum: ['SD', 'HD', 'FHD', '4K'],
    default: 'SD',
  },
  simultaneousScreens: {
    type: Number,
    default: 1,
  },
  downloadAllowed: {
    type: Boolean,
    default: false,
  },
  adsEnabled: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  stripePriceId: String, // For Stripe integration
}, {
  timestamps: true,
});

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
