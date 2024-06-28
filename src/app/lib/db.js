// lib/dbConnect.js
import mongoose from "mongoose";

const config = {
  isconnected: 0,
};

export const ConnectDb = async () => {
  if (config.isconnected) return;

  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "Food-delivery-app",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected...");
    console.log(connection);

    config.isconnected = connection.readyState;
  } catch (error) {
    console.error("Failed to connect with database");
    console.error(error);
  }
};
