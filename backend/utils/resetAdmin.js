const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📡 MongoDB Connected');

    // Delete existing admin
    const result = await User.deleteOne({ role: 'admin' });
    
    if (result.deletedCount > 0) {
      console.log('🗑️  Deleted existing admin user');
    } else {
      console.log('ℹ️  No admin user found to delete');
    }

    // Create new admin with credentials from .env
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@ottplatform.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin',
      phone: '+1234567890',
    });

    console.log('✅ New admin user created successfully!\n');
    console.log('New Admin Credentials:');
    console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@ottplatform.com'}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();
