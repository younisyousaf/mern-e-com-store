// const express = require("express"); -> Old Conventional Method

import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json()); //Allows us to get data from the request body

app.use("/api/products", productRoutes);

app.listen(port, () => {
  dbConnect();
  console.log("Server is running at http://localhost:" + port);
});
