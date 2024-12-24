// const express = require("express"); -> Old Conventional Method

import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/products", (req, res) => {
  res.send("Welcome to the server!");
});

app.listen(5000, () => {
  dbConnect();
  console.log("Server is running on port 5000");
});
