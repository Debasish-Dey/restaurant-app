import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  img_path: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  resto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", // Assuming you have a Restaurant model
    required: true,
  },
});

export default mongoose.models.Food || mongoose.model("Food", foodSchema);
