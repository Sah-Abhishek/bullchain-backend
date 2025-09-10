import mongoose from "mongoose";
const connectDb = async (connectionString) => {
  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected to ${conn.connection.host}`)
  } catch (error) {
    console.log("Mongodb Connection Error: ", error.message);
    process.exit(1);
  }
}

export default connectDb;
