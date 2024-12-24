import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  const { name, price, image } = product;
  const errors = {};
  if (!name) errors.name = "Name is required";
  if (!price) errors.price = "Price is required";
  if (!image) errors.image = "Image is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "Error creating product", errors });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
