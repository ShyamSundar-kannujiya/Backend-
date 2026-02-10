import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
});

connectDB();

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});











/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

import express from "express"
const app = express()

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGOOB_URI}/${DB_NAME}`)
    app.on("error", (error) => {
        console.error("ERROR", error);
        throw error
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })


  } catch (error) {
    console.error("Error connecting to the database", error);
  }
})();
*/