// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());          // allow all origins for now (dev)
app.use(express.json());

// 1) Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// 2) Define Profile model
const profileSchema = new mongoose.Schema({
  slug: { type: String, unique: true, lowercase: true },
  fullName: String,
  title: String,
  company: String,
  bio: String,
  avatarUrl: String,
  coverUrl: String,
  phone: String,
  email: String,
  website: String,
  socials: Object,
  ctas: Object,
});

const Profile = mongoose.model("Profile", profileSchema);

// 3) Routes
app.get("/", (req, res) => {
  res.send("NFC Profile API running");
});

app.get("/api/profile/:slug", async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const profile = await Profile.findOne({ slug });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Error in GET /api/profile/:slug:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 4) Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
