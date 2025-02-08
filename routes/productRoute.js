import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Create a new product
router.post("/add-product", async (req, res) => {
  const { name, description, stock, imageUrl, price } = req.body;
  if (!name || !description || !stock || !imageUrl || !name || !price) {
    return res.status(400).send({ error: "All fields are required" });
  }
  try {
    const newProduct = new Product({
      name,
      description,
      stock,
      imageUrl,
      price,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all products
router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-product/:id", async (req, res) => {
    const { name, description, price ,stock} = req.body;
   
    
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock || product.stock;
  
      await product.save();
      res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.delete("/delete-product/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default router;
