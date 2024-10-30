import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"],
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity must be a non-negative integer"], 
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

