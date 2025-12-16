import mongoose from 'mongoose';
import DB_NAME from  '../../utils/db-name.js'

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.QR_MENU_PROJECT_MONGODB_URL}+${DB_NAME}`);
  } catch (err) {
    console.log(`MongoDb connection failed ❌`,err);
    process.exit(1);
  }
};

export default connectDB;
