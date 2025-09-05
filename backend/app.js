// backend/src/app.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";

// Import routes 
import booksRouter from "./src/routes/book.js";   
import refreshRoute from "./src/routes/refresh.js"; 

// Import scraper function
import { run } from "../scraper/scraper.js"; // adjust path if needed

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Routes
app.use("/api/books", booksRouter);
app.use("/api/refresh", refreshRoute);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI from env:", MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo connected");

    // Start the server only after DB is connected
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // Optional bonus: Cron job to refresh books daily at midnight
    cron.schedule("0 0 * * *", () => {
      console.log("Cron job: Refreshing books database...");
      run().catch(err => console.error("Cron job failed:", err));
    });
  })
  .catch(err => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });
