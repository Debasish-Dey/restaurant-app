// models/Restaurant.js
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

export default mongoose.models.Restaurant ||
  mongoose.model("Restaurant", restaurantSchema);
