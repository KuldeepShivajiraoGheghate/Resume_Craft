const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

async function checkUser(email) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('User not found');
      return;
    }
    
    console.log('User found:', user.email);
    console.log('Password in DB starts with:', user.password.substring(0, 10));
    
    // Check if it's a valid bcrypt hash
    const isHash = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
    console.log('Is valid bcrypt hash format:', isHash);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Replace with the email the user is trying to login with
checkUser('ENTER_EMAIL_HERE');
