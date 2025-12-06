import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import profilePic from "./assets/sayu.jpg";
import coverPic from "./assets/sayuriback.png";

import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaShareNodes,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

function App() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const slug = "sayuri";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/profile/${slug}`)
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error(err);
        setError("Profile not found");
      });
  }, [slug]);

  if (error) {
    return <div className="h-screen flex items-center justify-center">{error}</div>;
  }

  if (!profile) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  const s = profile.socials || {};
  const ctas = profile.ctas || {};

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: profile.fullName,
        text: `Connect with ${profile.fullName}`,
        url: window.location.href,
      });
    } else {
      alert("Share not supported on this browser.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6">
      <div className="w-[360px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Cover */}
        <div className="relative h-40">
          <img src={coverPic} alt="cover" className="w-full h-full object-cover" />

         <button className="absolute top-3 right-3 bg-[#F8D4D8] rounded-full w-8 h-8 flex items-center justify-center text-black">
  •••
</button>

          {/* Avatar */}
          <div className="absolute -bottom-10 left-6">
            <div className="relative">
              <img
                src={profilePic}
                alt={profile.fullName}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 px-6 pb-6">

          {/* Name */}
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-semibold text-black">{profile.fullName}</h1>
            <span className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
          </div>

          <p className="text-sm text-black mt-1">
            {profile.title} | {profile.company}
          </p>

          <p className="text-sm text-black mt-3">{profile.bio}</p>

          {/* Main Action Icons */}
<div className="flex justify-center gap-3 mt-4">
  <a
    href={`tel:${profile.phone}`}
    className="w-10 h-10 rounded-full bg-[#F8D4D8] flex items-center justify-center text-black"
  >
    <FaPhone className="text-[16px]" />
  </a>

  <a
    href={`mailto:${profile.email}`}
    className="w-10 h-10 rounded-full bg-[#F8D4D8] flex items-center justify-center text-black"
  >
    <FaEnvelope className="text-[16px]" />
  </a>

  <a
    href={profile.website}
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 rounded-full bg-[#F8D4D8] flex items-center justify-center text-black"
  >
    <FaGlobe className="text-[16px]" />
  </a>

  <button
    onClick={shareProfile}
    className="w-10 h-10 rounded-full bg-[#F8D4D8] flex items-center justify-center text-black"
  >
    <FaShareNodes className="text-[16px]" />
  </button>
</div>


          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <a href={`tel:${profile.phone}`} className="flex-1 rounded-full bg-[#E493A7] text-white text-sm font-medium py-2 text-center">
              Save Contact
            </a>

            <a href={`https://wa.me/${profile.phone.replace("+", "")}`} className="flex-1 rounded-full bg-[#E493A7] text-white text-sm font-medium py-2 text-center">
              Exchange Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-between mt-5">
            <SocialIcon href={s.facebook} Icon={FaFacebookF} />
            <SocialIcon href={s.linkedin} Icon={FaLinkedinIn} />
            <SocialIcon href={s.whatsapp} Icon={FaWhatsapp} />
            <SocialIcon href={s.x} Icon={FaXTwitter} />
            <SocialIcon href={s.instagram} Icon={FaInstagram} />
          </div>

          {/* CTA Buttons */}
          {ctas.bookMeeting && <CTAButton href={ctas.bookMeeting} icon="📅" text="Book a meeting" />}
          {ctas.recentWork && <CTAButton href={ctas.recentWork} icon="📁" text="Our Recent Work" />}
          {ctas.learnMore && <CTAButton href={ctas.learnMore} icon="ℹ️" text="Learn More" />}
        </div>
      </div>
    </div>
  );
}

/* Social Icon Component */
function SocialIcon({ href, Icon }) {
  if (!href) return <div className="w-11 h-11" />;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-[#F8D4D8] flex items-center justify-center text-black">
      <Icon className="text-lg" />
    </a>
  );
}

/* CTA Buttons */
function CTAButton({ href, icon, text }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-4 w-full flex items-center justify-between px-4 py-3 rounded-full bg-[#E493A7] text-white text-sm font-medium"
    >
      <span>{text}</span>
      <span className="text-xl">{icon}</span>
    </a>
  );
}

export default App;
