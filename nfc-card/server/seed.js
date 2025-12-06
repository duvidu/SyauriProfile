import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected (seed)");

    await Profile.deleteMany({});
    await Profile.create({
      slug: "sayuri",                       // ✅ lowercase
      fullName: "Sayuri Alwis",
      title: "Creative Entrepreneur",
      company: "The Brand Co.",
      bio: "Location : 212/a/1,Pattiyawattha Road,Kothalawala,Kaduwela                                 ",
      avatarUrl: "https://yourcdn.com/avatar.jpg",
      coverUrl: "https://yourcdn.com/cover.jpg",
      phone: "0700000000",
      email: "sayurialwis77@gmail.com",
      website: "https://sayualwis.com",
      socials: {
        facebook: "https://www.facebook.com/share/17Wrp3ygEM/",
        linkedin: "https://linkedin.com/in/yourusername",
        whatsapp: "https://wa.me/9471600000",
        x: "https://x.com/yourusername",
        instagram: "https://www.instagram.com/sayuri_alwis/?igsh=MXNkd3Jua3pjeTd2ag%3D%3D#",
      },
      ctas: {
        bookMeeting: "https://cal.com/yourlink",
        recentWork: "https://yourdomain.com/work",
        learnMore: "https://yourdomain.com/about",
      },
    });

    console.log("✅ Seeded");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
