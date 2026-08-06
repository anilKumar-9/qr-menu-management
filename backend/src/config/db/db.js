import mongoose from 'mongoose';
import DB_NAME from '../../utils/db-name.js';

const connectDB = async () => {
  try {
    const mongoUrl = process.env.QR_MENU_PROJECT_MONGODB_URL;
    if (!mongoUrl) {
      throw new Error('MongoDB URL is not defined in environment variables');
    }
    // Ensure the URL ends with '/' before appending DB name
    const url = mongoUrl.endsWith('/') ? mongoUrl : `${mongoUrl}/`;
    await mongoose.connect(`${url}${DB_NAME}`);
    console.log('MongoDB connection Success ✅');
  } catch (err) {
    console.error('MongoDB connection failed ❌', err);
    process.exit(1);
  }
};

export default connectDB;
