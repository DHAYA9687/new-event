import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import eventRoutes from "./routes/eventRoutes.js";
dotenv.config();
const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/event", eventRoutes);

//for client use
app.use(express.static(path.join(__dirname, "/client/dist")));

//render client side for every route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

//mongoose connection
app.listen(PORT, async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`Server is running on port ${PORT}`);
      console.log("connected to database!");
    })
    .catch((err) => {
      console.log(err);
      console.error("Failed to connect to MongoDB:", err.message);
    });
});
