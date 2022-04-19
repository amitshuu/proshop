import mongoose from 'mongoose';
import connectDB from './db/connect.js';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import 'dotenv/config';
connectDB();

const insertData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log('Data insterted succesfully'.green.bold);
    process.exit(0);
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data deleted succesfully'.green.bold);
    process.exit(0);
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  insertData();
}
