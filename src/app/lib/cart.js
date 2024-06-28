import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  resto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", // Assuming you have a Restaurant model
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food", // Assuming you have a Food model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  menu: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
