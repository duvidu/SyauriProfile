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
  const profile = {
    fullName: "Sayuri Alwis",
    title: "Creative Entrepreneur",
    company: "The Brand Co.",
    bio: "Location:  Pattiyawatta Road, Kothalawala, Kaduwela",

    phone: "0716000000",
    email: "sayurialwis77@gmail.com",
    website: "https://sayualwis.com",

    socials: {
      facebook: "https://www.facebook.com/share/17Wrp3ygEM/",
      linkedin: "https://linkedin.com/in/yourusername",
      whatsapp: "https://wa.me/9471600000",
      x: "https://x.com/yourusername",
      instagram:
        "https://www.instagram.com/sayuri_alwis/?igsh=MXNkd3Jua3pjeTd2ag%3D%3D#",
    },

    ctas: {
      bookMeeting: "https://cal.com/yourlink",
      recentWork: "https://yourdomain.com/work",
      learnMore: "https://yourdomain.com/about",
    },
  };

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
    <div className="min-h-screen flex items-center justify-center py-6 bg-gray-100">
      <div className="w-[360px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Cover */}
        <div className="relative h-40">
          <img
            src={coverPic}
            alt="cover"
            className="w-full h-full object-cover"
          />

          <button className="absolute top-3 right-3 bg-[#F8D4D8] rounded-full w-8 h-8 flex items-center justify-center text-black">
            •••
          </button>

          {/* Avatar */}
          <div className="absolute -bottom-10 left-6">
            <img
              src={profilePic}
              alt={profile.fullName}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 px-6 pb-6">

          {/* Name */}
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-semibold text-black">
              {profile.fullName}
            </h1>

            <span className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white text-[10px]">
              ✓
            </span>
          </div>

          <p className="text-sm text-black mt-1">
            {profile.title} | {profile.company}
          </p>

          <p className="text-sm text-black mt-3">{profile.bio}</p>

          {/* Action Icons */}
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

          {/* Main Buttons */}
          <div className="flex gap-3 mt-5">
            <a
              href={`tel:${profile.phone}`}
              className="flex-1 rounded-full bg-[#E493A7] text-white text-sm font-medium py-2 text-center"
            >
              Save Contact
            </a>

            <a
              href={`https://wa.me/${profile.phone}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-full bg-[#E493A7] text-white text-sm font-medium py-2 text-center"
            >
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
          {ctas.bookMeeting && (
            <CTAButton
              href={ctas.bookMeeting}
              icon="📅"
              text="Book a Meeting"
            />
          )}

          {ctas.recentWork && (
            <CTAButton
              href={ctas.recentWork}
              icon="📁"
              text="Our Recent Work"
            />
          )}

          {ctas.learnMore && (
            <CTAButton
              href={ctas.learnMore}
              icon="ℹ️"
              text="Learn More"
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* Social Icon Component */
function SocialIcon({ href, Icon }) {
  if (!href) return <div className="w-11 h-11" />;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-11 h-11 rounded-full bg-[#F8D4D8] flex items-center justify-center text-black"
    >
      <Icon className="text-lg" />
    </a>
  );
}

/* CTA Button Component */
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