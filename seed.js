const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');

dotenv.config();

const seed = async () => {
  await connectDB();

  // Optional: Clear existing data
  await Order.deleteMany();
  await MenuItem.deleteMany();
  await User.deleteMany();

  // Seed users
  const password = await bcrypt.hash('password123', 10);
  const users = await User.insertMany([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password,
      role: 'admin',
    },
    {
      name: 'Test Customer',
      email: 'customer@example.com',
      password,
      // role defaults to 'customer'
    },
  ]);

  // Seed menu items
  const menuItems = await MenuItem.insertMany([
    {
      name: 'Chicken Biriyani',
      category: 'Biriyani',
      price: 250,
      description: 'Aromatic basmati rice with tender chicken pieces.',
      imageUrl: 'https://example.com/chicken-biriyani.jpg',
      available: true,
    },
    {
      name: 'Veg Biriyani',
      category: 'Biriyani',
      price: 200,
      description: 'Delicious biriyani with fresh vegetables.',
      imageUrl: 'https://example.com/veg-biriyani.jpg',
      available: true,
    },
    {
      name: 'Mango Lassi',
      category: 'Drinks',
      price: 80,
      description: 'Refreshing mango yogurt drink.',
      imageUrl: 'https://example.com/mango-lassi.jpg',
      available: true,
    },
  ]);

  // Optionally seed an order for the customer
  await Order.create({
    customer: users[1]._id,
    items: [
      { menuItem: menuItems[0]._id, quantity: 2 },
      { menuItem: menuItems[2]._id, quantity: 1 },
    ],
    totalAmount: menuItems[0].price * 2 + menuItems[2].price * 1,
    paymentMethod: 'cash',
    status: 'pending',
  });

  console.log('✅ Database seeded!');
  mongoose.connection.close();
};

seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  mongoose.connection.close();
}); 