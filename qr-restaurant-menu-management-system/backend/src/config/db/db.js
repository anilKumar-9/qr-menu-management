import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.QR_MENU_PROJECT_MONGODB_URL);
  } catch (err) {
    console.log(`MongoDb connection failed ❌`,err);
    process.exit(1);
  }
};

export default connectDB;
