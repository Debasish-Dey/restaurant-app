import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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
  orderdetails: {
    type: Array,
    required: true,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
