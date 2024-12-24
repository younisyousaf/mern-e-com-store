import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // 1 Means Failure and 0 Means Failure
  }
};
