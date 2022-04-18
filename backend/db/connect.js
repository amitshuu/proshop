import mongoose from 'mongoose';
import colors from 'colors';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB Connected: ${mongoose.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
