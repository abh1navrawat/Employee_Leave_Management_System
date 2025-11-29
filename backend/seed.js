// Run: node seed.js (ensure MONGO_URI set)
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/elms';
mongoose.connect(MONGO).then(async ()=> {
  const exists = await User.findOne({ email: 'manager@example.com' });
  if (exists) { console.log('Manager already exists'); process.exit(0); }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('password123', salt);
  const manager = new User({ name: 'Manager', email: 'manager@example.com', password: hashed, role: 'manager' });
  await manager.save();
  console.log('Manager created: manager@example.com / password123');
  process.exit(0);
}).catch(err=> { console.error(err); process.exit(1); });
