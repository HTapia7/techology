import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
});

// Check if the Product model already exists, otherwise create a new model
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
