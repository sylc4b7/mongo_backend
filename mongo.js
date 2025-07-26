const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/test_database';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a model
const User = mongoose.model('User', userSchema);

// Seed initial data (optional)
async function seedData() {
  const existingUser = await User.findOne({ email: 'test@example.com' });
  if (!existingUser) {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed_password', // Replace with a hashed password
    });
    await user.save();
    console.log('Initial user created:', user);
  } else {
    console.log('User already exists, skipping seeding.');
  }
}

// Initialize the database
async function initializeDatabase() {
  try {
    await seedData();
    console.log('Database initialization complete.');
  } catch (err) {
    console.error('Error during database initialization:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Run initialization
initializeDatabase();