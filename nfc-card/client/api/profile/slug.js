import mongoose from "mongoose";

let conn = null;

// Mongo connection (serverless safe)
async function connectDB() {
  if (conn) return conn;

  conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "nfcprofile",
  });

  return conn;
}

// Mongoose schema (same as your backend)
const ProfileSchema = new mongoose.Schema({
  slug: String,
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

// Prevent model overwrite error
const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

export default async function handler(req, res) {
  await connectDB();

  const slug = req.query.slug;

  const profile = await Profile.findOne({ slug });

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  return res.status(200).json(profile);
}
