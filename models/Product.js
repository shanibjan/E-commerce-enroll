import mongoose from "mongoose";

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
