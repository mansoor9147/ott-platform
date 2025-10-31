const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');
const SubscriptionPlan = require('../models/SubscriptionPlan');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Create admin user
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL || 'admin@ottplatform.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin',
        phone: '+1234567890',
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create subscription plans
    const plansExist = await SubscriptionPlan.countDocuments();
    
    if (plansExist === 0) {
      const plans = [
        {
          name: 'Free',
          description: 'Basic access to limited content',
          price: 0,
          duration: 365, // 1 year
          features: [
            'Limited content library',
            'SD quality',
            'Ads included',
            '1 screen at a time',
          ],
          videoQuality: 'SD',
          simultaneousScreens: 1,
          downloadAllowed: false,
          adsEnabled: true,
        },
        {
          name: 'Standard',
          description: 'Full access with HD quality',
          price: 9.99,
          duration: 30,
          features: [
            'Full content library',
            'HD quality',
            'No ads',
            '2 screens at a time',
            'Download available',
          ],
          videoQuality: 'HD',
          simultaneousScreens: 2,
          downloadAllowed: true,
          adsEnabled: false,
        },
        {
          name: 'Premium',
          description: 'Ultimate streaming experience',
          price: 14.99,
          duration: 30,
          features: [
            'Full content library',
            '4K Ultra HD quality',
            'No ads',
            '4 screens at a time',
            'Download available',
            'Early access to new releases',
          ],
          videoQuality: '4K',
          simultaneousScreens: 4,
          downloadAllowed: true,
          adsEnabled: false,
        },
      ];

      await SubscriptionPlan.insertMany(plans);
      console.log('✅ Subscription plans created');
    } else {
      console.log('ℹ️  Subscription plans already exist');
    }

    console.log('\n✨ Seed completed successfully!\n');
    console.log('Admin Credentials:');
    console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@ottplatform.com'}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}\n`);

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
