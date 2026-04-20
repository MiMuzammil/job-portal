import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

/* ---------- TEST ROUTE (KEEP THIS) ---------- */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* ---------- DB CONNECTION ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------- SERVER ---------- */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});