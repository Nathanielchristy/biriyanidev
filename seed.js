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
  // Seed menu items with image URLs
  const menuItems = [
    // — Soups
    { name: 'Healthy Fitness Soup (Yakhni Shorba)', category: 'Soup', price: 16, description: 'A light and aromatic slow-cooked mutton broth, perfect for a healthy start.', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Spicy Seafood Soup', category: 'Soup', price: 21, description: 'A fiery and flavorful soup packed with a medley of fresh seafood.', imageUrl: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Manchow Soup Veg', category: 'Soup', price: 15, description: 'A popular Indo-Chinese soup with mixed vegetables, topped with crispy fried noodles.', imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Manchow Chicken Soup', category: 'Soup', price: 20, description: 'A hearty Indo-Chinese soup with tender chicken and vegetables, topped with crispy fried noodles.', imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Hot & Sour Veg Soup', category: 'Soup', price: 15, description: 'A classic spicy and tangy soup loaded with shredded vegetables.', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Hot & Sour Chicken Soup', category: 'Soup', price: 20, description: 'The classic spicy and tangy soup, enriched with tender pieces of chicken.', imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    {
      name: 'Sweet Corn Soup',
      category: 'Soup',
      price: 15,
      description: 'A comforting, mildly seasoned soup made with sweet corn kernels, perfect for a light start.',
      imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&h=300&fit=crop',
      available: true,
      foodType: 'Veg'
    },
    // — Hyderabadi Specialities
    { name: 'Talawa Gosht', category: 'Hyderabadi Specialities', price: 33, description: 'Tender mutton pieces pan-fried with traditional Hyderabadi spices until crisp.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Keema Fry', category: 'Hyderabadi Specialities', price: 20, description: 'Spiced minced mutton, pan-fried with onions, tomatoes, and aromatic herbs.', imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Khatti Dal', category: 'Hyderabadi Specialities', price: 16, description: 'A tangy and savory lentil curry made with tamarind, a true Hyderabadi comfort food.', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Mutton Marag (Special) (Regular)', category: 'Hyderabadi Specialities', price: 19, description: 'A rich and spicy Hyderabadi mutton soup, slow-cooked with bone-in mutton and fragrant spices.', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Mutton Marag (Special) (Large)', category: 'Hyderabadi Specialities', price: 28, description: 'A rich and spicy Hyderabadi mutton soup, slow-cooked with bone-in mutton and fragrant spices.', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },

    // — Famous Kebab (Chicken)
    { name: 'Chicken Reshmi Kabab (Regular) 4pcs', category: 'Kebab – Chicken', price: 19, description: 'Succulent, silky-smooth chicken kebabs marinated in cream, cheese, and mild spices.', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Reshmi Kabab (Large) 8pcs', category: 'Kebab – Chicken', price: 32, description: 'Succulent, silky-smooth chicken kebabs marinated in cream, cheese, and mild spices.', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Haryali Kabab (Regular) 4pcs', category: 'Kebab – Chicken', price: 19, description: 'Juicy chicken pieces marinated in a vibrant blend of mint, cilantro, and green chilies.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Haryali Kabab (Large) 8pcs', category: 'Kebab – Chicken', price: 32, description: 'Juicy chicken pieces marinated in a vibrant blend of mint, cilantro, and green chilies.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Kasturi Tikka (Regular) 4pcs', category: 'Kebab – Chicken', price: 19, description: 'Tender chicken tikka flavored with fenugreek leaves (kasuri methi) for a unique, aromatic taste.', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Kasturi Tikka (Large) 8pcs', category: 'Kebab – Chicken', price: 32, description: 'Tender chicken tikka flavored with fenugreek leaves (kasuri methi) for a unique, aromatic taste.', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Malai Tikka (Regular) 4pcs', category: 'Kebab – Chicken', price: 19, description: 'Creamy and mild chicken kebabs marinated in cheese, cream, and cashew paste.', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Malai Tikka (Large) 8pcs', category: 'Kebab – Chicken', price: 32, description: 'Creamy and mild chicken kebabs marinated in cheese, cream, and cashew paste.', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Murgh Ke Shole (Regular) 4pcs', category: 'Kebab – Chicken', price: 20, description: 'Spicy and smoky chicken kebabs, marinated in yogurt and a special blend of spices.', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Murgh Ke Shole (Large) 8pcs', category: 'Kebab – Chicken', price: 34, description: 'Spicy and smoky chicken kebabs, marinated in yogurt and a special blend of spices.', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Achari Tikka (Regular) 4pcs', category: 'Kebab – Chicken', price: 19, description: 'Tangy and spicy chicken tikka infused with the bold flavors of Indian pickles.', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Achari Tikka (Large) 8pcs', category: 'Kebab – Chicken', price: 32, description: 'Tangy and spicy chicken tikka infused with the bold flavors of Indian pickles.', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Seekh Kabab (Regular) 2 Seekh', category: 'Kebab – Chicken', price: 18, description: 'Minced chicken blended with aromatic spices, skewered and grilled to perfection.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Seekh Kabab (Large) 4 Seekh', category: 'Kebab – Chicken', price: 30, description: 'Minced chicken blended with aromatic spices, skewered and grilled to perfection.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Zaffrani Irani Jujeh Kabab (Regular) 4pcs', category: 'Kebab – Chicken', price: 20, description: 'Saffron-infused grilled chicken kebabs, a classic Persian delicacy with a rich flavor.', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Zaffrani Irani Jujeh Kabab (Large) 8pcs', category: 'Kebab – Chicken', price: 34, description: 'Saffron-infused grilled chicken kebabs, a classic Persian delicacy with a rich flavor.', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Pathar Ka Chicken (Speciality)', category: 'Kebab – Chicken', price: 34, description: 'A unique Hyderabadi specialty where chicken is marinated and cooked on a hot stone.', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    // { name: 'Afghani Murgh (Quarter)', category: 'Kebab – Chicken', price: 19.95, description: 'Mildly spiced and creamy grilled chicken marinated in yogurt and cashews, cooked in a tandoor.', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    // { name: 'Afghani Murgh (Half)', category: 'Kebab – Chicken', price: 37.8, description: 'Mildly spiced and creamy grilled chicken marinated in yogurt and cashews, cooked in a tandoor.', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    // { name: 'Afghani Murgh (Full)', category: 'Kebab – Chicken', price: 67.2, description: 'Mildly spiced and creamy grilled chicken marinated in yogurt and cashews, cooked in a tandoor.', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Tangdi Kabab (1 Pcs)', category: 'Kebab – Chicken', price: 10, description: 'Juicy and flavorful chicken drumsticks marinated in yogurt and spices, grilled to perfection.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Tangdi Kabab (2 Pcs)', category: 'Kebab – Chicken', price: 18, description: 'Juicy and flavorful chicken drumsticks marinated in yogurt and spices, grilled to perfection.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Tangdi Kabab (4 Pcs)', category: 'Kebab – Chicken', price: 32, description: 'Juicy and flavorful chicken drumsticks marinated in yogurt and spices, grilled to perfection.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Tandoori Chicken (Quarter)', category: 'Kebab – Chicken', price: 19.95, description: 'Classic tandoori-spiced chicken, marinated and roasted in a traditional clay oven.', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Tandoori Chicken (Half)', category: 'Kebab – Chicken', price: 37.8, description: 'Classic tandoori-spiced chicken, marinated and roasted in a traditional clay oven.', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Tandoori Chicken (Full)', category: 'Kebab – Chicken', price: 67.2, description: 'Classic tandoori-spiced chicken, marinated and roasted in a traditional clay oven.', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },

    // — Famous Kebab (Mutton)
    { name: 'Mutton Boti Kabab', category: 'Kebab – Mutton', price: 39.9, description: 'Tender chunks of mutton marinated in spices and yogurt, grilled to a smoky perfection.', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Mutton Seekh Kabab', category: 'Kebab – Mutton', price: 37.8, description: 'Spiced minced mutton, molded onto skewers and grilled in a tandoor for a juicy finish.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Pathar Ka Gosht (Speciality)', category: 'Kebab – Mutton', price: 44.1, description: 'A royal Hyderabadi dish of thinly sliced mutton, marinated and slow-cooked on a stone slab.', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Burrah Chops Lazeez', category: 'Kebab – Mutton', price: 44.1, description: 'Succulent mutton chops marinated overnight in a rich blend of spices and grilled until tender.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },

    // — Famous Kebab (Veg/Seafood)
    { name: 'Paneer Lahori', category: 'Kebab – Veg', price: 29.4, description: 'Cubes of paneer marinated in a spicy, tangy Lahori-style masala and grilled.', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Paneer Malai Tikka', category: 'Kebab – Veg', price: 29.4, description: 'Soft paneer cubes marinated in a creamy and cheesy mixture, grilled to perfection.', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Veg Seekh Kabab', category: 'Kebab – Veg', price: 29.4, description: 'Minced vegetables and spices, skewered and grilled for a delicious vegetarian delight.', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Achari Mushroom', category: 'Kebab – Veg', price: 29.4, description: 'Button mushrooms marinated in a tangy pickle-spiced masala and grilled.', imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Konkan Fish Tikka', category: 'Kebab – Seafood', price: 39.9, description: 'Fish marinated in coastal Konkani spices with a hint of coconut, grilled to perfection.', imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Fish Tikka Hyderabadi', category: 'Kebab – Seafood', price: 39.9, description: 'Chunks of fish marinated in a rich, spicy Hyderabadi masala and grilled.', imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Aatish E Jhinga', category: 'Kebab – Seafood', price: 39.9, description: 'Fiery prawns marinated in a spicy tandoori masala and grilled, translating to \'Flames of Prawn\'.', imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Prawns Balaika', category: 'Kebab – Seafood', price: 39.9, description: 'Juicy prawns marinated in a creamy, mild spice blend and grilled for a delicate flavor.', imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },

    // — Platters (Mixed Veg & non‑Veg)
    { name: 'Mini Chicken Platter', category: 'Platters', price: 40.95, description: 'An assortment of our popular chicken kebabs, perfect for one.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Platter', category: 'Platters', price: 81.9, description: 'A generous platter featuring a variety of our best chicken kebabs.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Mini Mutton Platter', category: 'Platters', price: 47.25, description: 'A selection of our signature mutton kebabs, ideal for one.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Mutton Platter', category: 'Platters', price: 82.95, description: 'A hearty assortment of our finest mutton kebabs.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Mix Veg Platter', category: 'Platters', price: 50.4, description: 'A delightful mix of our best vegetarian kebabs and tikkas.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Mixed Grilled Platter', category: 'Platters', price: 92.4, description: 'The ultimate non-vegetarian feast with a mix of chicken, mutton, and seafood kebabs.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Sea Food Platter', category: 'Platters', price: 97.65, description: 'A lavish selection of our grilled fish and prawn specialties.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },

    // — Chinese Specialities
    { name: 'Paneer 65', category: 'Chinese – Veg', price: 29.4, description: 'Spicy, deep-fried paneer cubes tossed in a tangy yogurt-based sauce.', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Baby Corn Schezwan', category: 'Chinese – Veg', price: 29.4, description: 'Crispy baby corn tossed in a fiery and pungent Schezwan sauce.', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Veg Manchurian (Dry)', category: 'Chinese – Veg', price: 29.4, description: 'Vegetable fritters tossed in a classic soy-ginger-garlic sauce, served dry.', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Veg Manchurian (Wet)', category: 'Chinese – Veg', price: 29.4, description: 'Vegetable fritters simmered in a classic soy-ginger-garlic gravy.', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Gobhi Manchurian (Dry)', category: 'Chinese – Veg', price: 29.4, description: 'Crispy cauliflower florets in a savory and tangy Manchurian sauce, served dry.', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Gobhi Manchurian (Gravy)', category: 'Chinese – Veg', price: 29.4, description: 'Crispy cauliflower florets in a savory and tangy Manchurian gravy.', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Chilli Paneer (Dry)', category: 'Chinese – Veg', price: 29.4, description: 'Cubes of paneer stir-fried with bell peppers and onions in a spicy chili sauce.', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Chilli Paneer (Wet)', category: 'Chinese – Veg', price: 29.4, description: 'Cubes of paneer with bell peppers and onions in a spicy chili gravy.', imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Crispy Veg', category: 'Chinese – Veg', price: 29.4, description: 'Assorted vegetables batter-fried until golden and crisp, tossed in a sweet and spicy sauce.', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', available: true, foodType: 'Veg' },
    { name: 'Chicken Manchurian (Dry/Wet)', category: 'Chinese – Non-Veg', price: 33.6, description: 'Tender chicken pieces in a classic soy-ginger-garlic sauce, available dry or with gravy.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chilli Chicken (Dry/Wet)', category: 'Chinese – Non-Veg', price: 33.6, description: 'A popular Indo-Chinese dish of crispy chicken tossed with onions and bell peppers in a spicy sauce.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Majestic Chicken', category: 'Chinese – Non-Veg', price: 33.6, description: 'Boneless chicken strips marinated in yogurt and spices, deep-fried and tossed in a tangy sauce.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Pepper Chicken', category: 'Chinese – Non-Veg', price: 33.6, description: 'Spicy chicken stir-fried with black pepper, onions, and curry leaves.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken 65', category: 'Chinese – Non-Veg', price: 33.6, description: 'A famous spicy, deep-fried chicken appetizer originating from Chennai.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Apollo Fish', category: 'Chinese – Non-Veg', price: 35.7, description: 'Boneless fish fillets marinated in spices, deep-fried, and tossed in a tangy, garlicky sauce.', imageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Prawns Butter Chili Fry', category: 'Chinese – Non-Veg', price: 39.9, description: 'Juicy prawns sautéed with butter, garlic, and chilies for a rich and spicy flavor.', imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Lollypop', category: 'Chinese – Non-Veg', price: 33.6, description: 'Frenched chicken winglets shaped like a lollipop, marinated and deep-fried.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },
    { name: 'Chicken Drums Of Heaven', category: 'Chinese – Non-Veg', price: 37.8, description: 'Chicken lollipops tossed in a sweet, spicy, and tangy sauce.', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop', available: true, foodType: 'Non-Veg' },

    // Rice & Noodle
    { name: "Fried Rice Veg", category: "Rice & Noodle", price: 29.4, description: "Classic stir-fried rice with assorted fresh vegetables.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Fried Rice (Chicken)", category: "Rice & Noodle", price: 33.6, description: "Wok-tossed rice with tender chicken, egg, and vegetables.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Fried Rice (Prawns)", category: "Rice & Noodle", price: 37.8, description: "Flavorful fried rice with succulent prawns, egg, and vegetables.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Fried Rice (Mix)", category: "Rice & Noodle", price: 39.9, description: "A hearty combination of chicken, prawns, egg, and vegetables in stir-fried rice.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Schezwan Fried Rice (Veg)", category: "Rice & Noodle", price: 29.4, description: "Spicy stir-fried rice with vegetables in a bold Schezwan sauce.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Schezwan Fried Rice (Chicken)", category: "Rice & Noodle", price: 35.7, description: "Fiery fried rice with chicken and vegetables, tossed in Schezwan sauce.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Schezwan Fried Rice (Prawns)", category: "Rice & Noodle", price: 37.8, description: "A spicy mix of prawns and vegetables in Schezwan fried rice.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Schezwan Fried Rice (Mix)", category: "Rice & Noodle", price: 39.9, description: "The ultimate spicy fried rice with chicken, prawns, egg, and vegetables in Schezwan sauce.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Egg Fried Rice", category: "Rice & Noodle", price: 33.6, description: "Simple and delicious stir-fried rice with scrambled eggs and vegetables.", imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Hakka Noodles (Veg)", category: "Rice & Noodle", price: 29.4, description: "Classic Indo-Chinese noodles stir-fried with a variety of shredded vegetables.", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Hakka Noodles (Egg)", category: "Rice & Noodle", price: 33.6, description: "Stir-fried Hakka noodles with scrambled egg and vegetables.", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Hakka Noodles (Chicken)", category: "Rice & Noodle", price: 35.7, description: "Wok-tossed noodles with tender chicken strips, egg, and vegetables.", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Chilly Garlic Noodles (Veg)", category: "Rice & Noodle", price: 23.1, description: "Noodles tossed in a spicy sauce with pungent garlic and chili flakes.", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Chilly Garlic Noodles (Chicken)", category: "Rice & Noodle", price: 32.55, description: "Spicy garlic noodles stir-fried with tender chicken pieces.", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Chilly Garlic Noodles (Prawn)", category: "Rice & Noodle", price: 39.9, description: "Flavorful chili garlic noodles with juicy prawns.", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Chilly Garlic Noodles (Mix)", category: "Rice & Noodle", price: 39.9, description: "A fiery combination of chicken, prawns, and egg in chili garlic noodles.", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },

    // Famous Gravy
    { name: "Dal Makhani", category: "Famous Gravy", price: 22.05, description: "Creamy and rich black lentils and kidney beans slow-cooked with butter and cream.", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Dal Tadka", category: "Famous Gravy", price: 19.95, description: "Yellow lentils tempered with aromatic spices, ghee, and herbs.", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Dal Fry", category: "Famous Gravy", price: 17.85, description: "A simple yet flavorful dish of cooked lentils tempered with spices.", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Dal Palak Double Tadka", category: "Famous Gravy", price: 23.1, description: "Nutritious spinach and lentils with a double tempering of spices.", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Kadai Paneer", category: "Famous Gravy", price: 33.6, description: "Paneer and bell peppers cooked in a spicy masala with freshly ground spices.", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Paneer Lajjatdar", category: "Famous Gravy", price: 33.6, description: "Soft paneer cubes in a rich, flavorful, and luscious tomato-based gravy.", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Paneer Makhani", category: "Famous Gravy", price: 33.6, description: "Cubes of paneer simmered in a creamy, buttery, and tangy tomato gravy.", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Paneer Butter Masala", category: "Famous Gravy", price: 33.6, description: "A classic rich and creamy dish of paneer in a tomato, butter, and cashew sauce.", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Palak Paneer", category: "Famous Gravy", price: 33.6, description: "Soft paneer cubes cooked in a smooth, creamy spinach gravy.", imageUrl: "https://images.unsplash.com/photo-1631452180539-96aca2b33c0b?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Palak Malai Kofta", category: "Famous Gravy", price: 33.6, description: "Soft vegetable and paneer dumplings served in a creamy spinach gravy.", imageUrl: "https://images.unsplash.com/photo-1631452180539-96aca2b33c0b?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Malai Kofta", category: "Famous Gravy", price: 31.5, description: "Deep-fried paneer and vegetable dumplings in a rich and creamy tomato-onion gravy.", imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Kadai Veg", category: "Famous Gravy", price: 29.4, description: "Mixed vegetables cooked in a spicy gravy with traditional Kadai spices.", imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Paneer Badami", category: "Famous Gravy", price: 33.6, description: "A rich and creamy curry made with paneer, almonds, and aromatic spices.", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Murgh Kalimirch Masala", category: "Famous Gravy", price: 33.6, description: "Tender chicken cooked in a creamy gravy with the bold flavor of black pepper.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Dhaniya Adraki", category: "Famous Gravy", price: 33.6, description: "Chicken cooked in a fragrant gravy flavored with fresh coriander and ginger.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Peshawari", category: "Famous Gravy", price: 33.6, description: "A rustic and robust chicken curry with tomatoes and coarse spices, a specialty from Peshawar.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Lababdar", category: "Famous Gravy", price: 33.6, description: "Succulent chicken tikka pieces simmered in a luscious and tangy tomato gravy.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Kadai Masala", category: "Famous Gravy", price: 33.6, description: "Chicken cooked with bell peppers and onions in a spicy, freshly ground masala.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Lajjatdar", category: "Famous Gravy", price: 33.6, description: "A rich and flavorful chicken curry that is truly 'lajjatdar' (delicious).", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Methi Khaas", category: "Famous Gravy", price: 33.6, description: "Chicken cooked with fresh fenugreek leaves in a creamy, aromatic gravy.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Rogni", category: "Famous Gravy", price: 33.6, description: "A flavorful chicken curry with a rich, red gravy, slow-cooked to perfection.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Makhani (Butter Chicken)", category: "Famous Gravy", price: 39.9, description: "The world-famous dish of grilled chicken simmered in a smooth, buttery, and creamy tomato gravy.", imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murgh Achari", category: "Famous Gravy", price: 33.6, description: "A tangy and spicy chicken curry with the flavors of Indian pickles.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Murg Tikka Masala", category: "Famous Gravy", price: 33.6, description: "Char-grilled chicken tikka pieces cooked in a spiced, creamy tomato-based sauce.", imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "BWCO Chicken Chef Special", category: "Famous Gravy", price: 44.1, description: "Our chef's signature chicken curry, a secret recipe you must try.", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Kadai Gosht", category: "Famous Gravy", price: 39.9, description: "Tender mutton cooked with bell peppers in a wok with freshly ground spices.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Mutton Matka", category: "Famous Gravy", price: 39.9, description: "Mutton curry slow-cooked in a traditional earthen pot (matka) for an authentic flavor.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Mutton Roganjosh", category: "Famous Gravy", price: 39.9, description: "An aromatic Kashmiri curry of tender mutton cooked in a rich gravy of spices and yogurt.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Railway Gosht Curry", category: "Famous Gravy", price: 39.9, description: "A classic Anglo-Indian mutton curry, subtly spiced and traditionally served on long-distance trains.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Rajputna Lal Maas", category: "Famous Gravy", price: 39.9, description: "A fiery Rajasthani mutton curry known for its vibrant red color from mathania chilies.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Bhuna Gosht", category: "Famous Gravy", price: 39.9, description: "Tender mutton pieces slow-cooked and pan-fried with spices until the gravy is thick and clings to the meat.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Handi Ka Gosht", category: "Famous Gravy", price: 39.9, description: "Mutton slow-cooked in a sealed pot (handi) to retain its flavors and tenderness.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Achari Ghost", category: "Famous Gravy", price: 39.9, description: "A tangy and spicy mutton curry infused with the bold flavors of traditional Indian pickles.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Gosht Kali Mirch", category: "Famous Gravy", price: 39.9, description: "Succulent mutton pieces cooked in a creamy white gravy dominated by the flavor of black pepper.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "BWCO Mutton Chef Special", category: "Famous Gravy", price: 46.2, description: "Our chef's secret mutton recipe, a unique and flavorful preparation.", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },

    // Haleem
    { name: "Hyderabadi Haleem", category: "Haleem", price: 29.4, description: "A rich and savory porridge of wheat, barley, lentils, and mutton, slow-cooked for hours to perfection.", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },
    { name: "Special Hyderabadi Haleem (Serves For 2)", category: "Haleem", price: 48.3, description: "A generous portion of our authentic Hyderabadi Haleem, perfect for sharing.", imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop", available: true, foodType: "Non-Veg" },

    // Roti & Naan
    { name: "Hyderabadi Naan Ki Roti", category: "Roti & Naan", price: 6.3, description: "A unique, soft, and fluffy bread, a specialty of Hyderabad.", imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Tandoori Roti", category: "Roti & Naan", price: 4.2, description: "Whole wheat bread baked in a traditional tandoor.", imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Butter Roti", category: "Roti & Naan", price: 5.25, description: "Tandoori Roti generously brushed with butter.", imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Rumali Roti", category: "Roti & Naan", price: 5.25, description: "Paper-thin, soft, and foldable bread, resembling a handkerchief.", imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Paratha", category: "Roti & Naan", price: 4.2, description: "Layered whole wheat bread, shallow-fried on a tawa.", imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Plain Naan", category: "Roti & Naan", price: 5.25, description: "Soft and fluffy leavened bread baked in the tandoor.", imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Butter Naan", category: "Roti & Naan", price: 6.3, description: "Tandoori naan brushed with a lavish layer of butter.", imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Garlic Naan", category: "Roti & Naan", price: 6.3, description: "Soft naan bread topped with chopped garlic and herbs.", imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Cheese Naan", category: "Roti & Naan", price: 8.4, description: "A delicious naan stuffed with melted cheese.", imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop", available: true, foodType: "Veg" },

    // Rice
    { name: "Jeera Rice", category: "Rice", price: 16.8, description: "Fluffy basmati rice tempered with cumin seeds and fresh coriander.", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Kaju Rice", category: "Rice", price: 21, description: "Basmati rice cooked with roasted cashews for a rich, nutty flavor.", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Curd Rice with Tadka", category: "Rice", price: 18.9, description: "Comforting South Indian dish of yogurt and rice, tempered with spices.", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Steamed Rice", category: "Rice", price: 12.6, description: "Perfectly cooked, plain steamed basmati rice.", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Ghee Rice", category: "Rice", price: 18.9, description: "Aromatic basmati rice cooked with clarified butter (ghee) and mild spices.", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop", available: true, foodType: "Veg" },

    // Accompaniments
    { name: "Plain Raita", category: "Accompaniments", price: 8.4, description: "Whisked yogurt, a simple and cooling side dish.", imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Mixed Raita", category: "Accompaniments", price: 10.5, description: "Yogurt mixed with finely chopped onion, cucumber, and tomato, seasoned with spices.", imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Papad (Roasted)", category: "Accompaniments", price: 4.2, description: "A thin, crisp disc-shaped snack, roasted to perfection.", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Papad (Fried)", category: "Accompaniments", price: 4.2, description: "A thin, crisp disc-shaped snack, deep-fried until golden.", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Papad (Masala)", category: "Accompaniments", price: 8.4, description: "Crispy papad topped with a zesty mixture of chopped onions, tomatoes, and spices.", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Green Salad", category: "Accompaniments", price: 8.4, description: "A fresh mix of cucumber, tomatoes, onions, and carrots with a lemon dressing.", imageUrl: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Onion Salad", category: "Accompaniments", price: 6.3, description: "Slices of fresh onion served with lemon and green chilies.", imageUrl: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Cucumber Salad", category: "Accompaniments", price: 6.3, description: "Freshly sliced cucumber, a cool and refreshing side.", imageUrl: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=400&h=300&fit=crop", available: true, foodType: "Veg" },
    { name: "Mirchi ka Salan", category: "Accompaniments", price: 8.4, description: "A classic Hyderabadi curry made with green chilies, peanuts, and sesame seeds in a tangy gravy.", imageUrl: "", available: true, foodType: "Veg" },

    // BWCO Biryani
    { name: "Chicken Biryani (Meal For 1)", category: "BWCO Biryani", price: 25.2, description: "A single serving of our aromatic Hyderabadi dum-style chicken biryani.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Chicken 65 Biryani (Meal For 1)", category: "BWCO Biryani", price: 29.4, description: "A flavorful biryani layered with spicy Chicken 65 and fragrant basmati rice.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Zaffrani Chicken Biryani (Serves 2)", category: "BWCO Biryani", price: 39.9, description: "Saffron-infused chicken biryani, slow-cooked on dum. Perfect for two.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Zaffrani 65 Biryani (Serves 2)", category: "BWCO Biryani", price: 44.1, description: "A spicy and aromatic biryani with layers of Chicken 65 and saffron rice. Serves two.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Zaffrani Chicken Family Pack (Serves 4‑5)", category: "BWCO Biryani", price: 93.45, description: "A large portion of our signature Zaffrani Chicken Biryani for the whole family.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Zaffrani Chicken Jumbo Pack (Serves 6‑8)", category: "BWCO Biryani", price: 193.2, description: "An extra-large pack of our Zaffrani Chicken Biryani, perfect for parties and gatherings.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Mutton Biryani (Meal For 1)", category: "BWCO Biryani", price: 33.6, description: "Authentic Hyderabadi mutton biryani with succulent meat pieces, ideal for one person.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Zaffrani Mutton Biryani (Serves 1‑2)", category: "BWCO Biryani", price: 48.3, description: "Rich and aromatic mutton biryani flavored with saffron, slow-cooked to perfection.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Zaffrani Mutton Family Pack (Serves 4‑5)", category: "BWCO Biryani", price: 115.5, description: "A generous family-sized portion of our delectable Zaffrani Mutton Biryani.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Zaffrani Mutton Jumbo Pack (Serves 6‑8)", category: "BWCO Biryani", price: 231, description: "The ultimate feast! An extra-large pack of our Zaffrani Mutton Biryani.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Hyderabadi Dum Veg Biryani (Serves 1‑2)", category: "BWCO Biryani", price: 33.6, description: "A fragrant biryani with assorted vegetables and basmati rice, slow-cooked in dum style.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Family Pack Veg Biryani (Serves 4‑5)", category: "BWCO Biryani", price: 65.1, description: "A large portion of our delicious vegetable biryani, perfect for a family meal.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Egg Masala Dum Biryani", category: "BWCO Biryani", price: 30.45, description: "Aromatic biryani rice layered with a spicy egg masala gravy.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Fish Biryani", category: "BWCO Biryani", price: 51.45, description: "Flavorful biryani cooked with tender fish fillets and fragrant spices.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Prawns Biryani", category: "BWCO Biryani", price: 51.45, description: "A delicious and aromatic biryani layered with juicy, spiced prawns.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Biryani Rice", category: "BWCO Biryani", price: 19.95, description: "Fragrant and spiced basmati rice without any meat or vegetables.", imageUrl: "", available: true, foodType: "Veg" },

    // Beverages
    { name: "Matka Lassi Masaledar", category: "Beverages", price: 14.7, description: "Traditional spiced yogurt drink served in a classic earthen pot.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Matka Lassi Salty", category: "Beverages", price: 14.7, description: "A refreshing salted yogurt drink served chilled in an earthen pot.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Matka Lassi Sweet", category: "Beverages", price: 14.7, description: "A traditional sweet yogurt drink, the perfect cooler served in an earthen pot.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Mint Juice", category: "Beverages", price: 15, description: "A refreshing and cooling drink made from fresh mint leaves.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Orange Juice", category: "Beverages", price: 15, description: "Freshly squeezed orange juice, packed with Vitamin C.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Lemon Juice", category: "Beverages", price: 15, description: "Classic sweet and tangy fresh lemon juice.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Soft Drink", category: "Beverages", price: 6.3, description: "Choose from a selection of popular carbonated soft drinks.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Water", category: "Beverages", price: 3, description: "Chilled mineral water to quench your thirst.", imageUrl: "", available: true, foodType: "Veg" },

    // Desserts
    { name: "Double Ka Meetha", category: "Desserts", price: 14.7, description: "A decadent Hyderabadi dessert made of fried bread slices soaked in hot milk with spices, including saffron.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Gulab Jamun", category: "Desserts", price: 8.4, description: "Soft, deep-fried berry-sized balls made of milk solids, soaked in a sweet sugar syrup.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Ras Malai (3 Pcs) (Chef Special)", category: "Desserts", price: 12, description: "Soft cottage cheese patties soaked in chilled, creamy, saffron-flavored milk. A chef's special.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Qubani Ka Meetha", category: "Desserts", price: 16.8, description: "A classic Hyderabadi dessert made from dried apricots, served as a compote.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Qubani Ka Meetha With Ice Cream", category: "Desserts", price: 21, description: "The traditional apricot dessert served with a scoop of creamy vanilla ice cream.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Gajar Ka Halwa", category: "Desserts", price: 18.9, description: "A rich Indian dessert made with grated carrots, milk, sugar, and ghee.", imageUrl: "", available: true, foodType: "Veg" },

    // Combo Meals
    { name: "Chicken Combo", category: "Combo Meals", price: 35.7, description: "A complete meal featuring a chicken main course, bread or rice, and accompaniments.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Mutton Combo", category: "Combo Meals", price: 39.9, description: "A hearty meal with a signature mutton dish, served with bread or rice and sides.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Veg Combo", category: "Combo Meals", price: 33.6, description: "A satisfying vegetarian meal including a main dish, bread or rice, and accompaniments.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Rice & Noodles Combo", category: "Combo Meals", price: 30.45, description: "Your choice of our popular rice or noodles, served with a delicious side dish.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Non Veg Combo", category: "Combo Meals", price: 37.8, description: "A fulfilling non-vegetarian combo meal with a main dish and necessary sides.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Veg Combo", category: "Combo Meals", price: 29.4, description: "A satisfying vegetarian meal including a main dish, bread or rice, and accompaniments.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Chicken Combo", category: "Combo Meals", price: 35.7, description: "A complete meal featuring a chicken main course, bread or rice, and accompaniments.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Mutton Combo", category: "Combo Meals", price: 39.9, description: "A hearty meal with a signature mutton dish, served with bread or rice and sides.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Veg Combo", category: "Combo Meals", price: 33.6, description: "A satisfying vegetarian meal including a main dish, bread or rice, and accompaniments.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Chicken Biryani Meal", category: "Combo Meals", price: 30.45, description: "A perfect meal for one, featuring our delicious Chicken Biryani with raita and salan.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Veg Biryani Meal", category: "Combo Meals", price: 29.4, description: "Our aromatic Veg Biryani served with raita and salan for a complete meal experience.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Talawa Gosht Set", category: "Combo Meals", price: 39.9, description: "A special set meal featuring the famous Talawa Gosht with your choice of bread or rice.", imageUrl: "", available: true, foodType: "Non-Veg" },

    // Punjabi Kulchas
    { name: "Aloo Kulcha", category: "Punjabi Kulchas", price: 19.95, description: "Soft, fluffy bread stuffed with a savory spiced potato filling.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Paneer Kulcha", category: "Punjabi Kulchas", price: 22.05, description: "A delicious kulcha stuffed with spiced cottage cheese (paneer).", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Mix Veg Kulcha", category: "Punjabi Kulchas", price: 22.05, description: "A wholesome kulcha with a stuffing of mixed vegetables and spices.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Onion Kulcha", category: "Punjabi Kulchas", price: 19.95, description: "Fluffy bread stuffed with a tangy and savory onion mixture.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Gobhi Kulcha", category: "Punjabi Kulchas", price: 22.05, description: "A flavorful kulcha stuffed with spiced, grated cauliflower.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Cheese Kulcha", category: "Punjabi Kulchas", price: 24.15, description: "An indulgent kulcha generously stuffed with melted cheese.", imageUrl: "", available: true, foodType: "Veg" },
    { name: "Chicken Keema Kulcha", category: "Punjabi Kulchas", price: 25.2, description: "A savory kulcha with a rich stuffing of spiced minced chicken.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Chicken Tikka Kulcha", category: "Punjabi Kulchas", price: 25.2, description: "A delicious kulcha stuffed with chunks of spicy chicken tikka.", imageUrl: "", available: true, foodType: "Non-Veg" },
    { name: "Mutton Keema Kulcha", category: "Punjabi Kulchas", price: 25.2, description: "A hearty kulcha filled with flavorful, spiced minced mutton.", imageUrl: "", available: true, foodType: "Non-Veg" }
  ];

  await MenuItem.deleteMany({});
  const inserted = await MenuItem.insertMany(menuItems);
  console.log(`Inserted ${inserted.length} menu items.`);
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