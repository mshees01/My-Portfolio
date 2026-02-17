// App.jsx (FULL WORKING CODE)

import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Copy,
  Download,
  Filter,
  Github,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiCplusplus,
  SiMongodb,
  SiGit,
  SiPostman,
  SiDart,
  SiFigma,
  SiMysql,
  SiC,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";

/** ===========================
 *  ICON MAP + TECH BADGE
 *  =========================== */
const techIcons = {
  "React.js": <SiReact className="text-cyan-400 text-lg" />,
  JavaScript: <SiJavascript className="text-yellow-400 text-lg" />,
  HTML: <SiHtml5 className="text-orange-500 text-lg" />,
  CSS: <SiCss3 className="text-blue-400 text-lg" />,
  PHP: <SiPhp className="text-indigo-400 text-lg" />,
  "C++": <SiCplusplus className="text-blue-500 text-lg" />,
  C: <SiC className="text-blue-600 text-lg" />,
  Java: <FaJava className="text-red-500 text-lg" />,
  "C#": <TbBrandCSharp className="text-purple-500 text-lg" />,
  Dart: <SiDart className="text-blue-400 text-lg" />,
  MongoDB: <SiMongodb className="text-green-500 text-lg" />,
  Git: <SiGit className="text-orange-400 text-lg" />,
  Postman: <SiPostman className="text-orange-500 text-lg" />,
  Figma: <SiFigma className="text-pink-500 text-lg" />,
  DBMS: <SiMysql className="text-blue-500 text-lg" />,
  "UI Animations": <Sparkles className="text-white/80" />,
};

function Tech({ name }) {
  return (
    <span className="flex items-center gap-2">
      {techIcons[name] ?? null}
      <span>{name}</span>
    </span>
  );
}

/** ===========================
 *  TYPEWRITER (FULL LINE)
 *  =========================== */
function useTypewriterFull(text, speed = 70) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let i = 0;
    setOut("");
    const t = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);

    return () => clearInterval(t);
  }, [text, speed]);

  return out;
}

function TypewriterLine({ text, speed = 90, className = "" }) {
  const typed = useTypewriterFull(text, speed);

  return (
    <h1 className={className}>
      <span>{typed}</span>
      <motion.span
        className="ml-1 inline-block h-[1.1em] w-[2px] align-[-0.15em]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ backgroundColor: "currentColor" }}
      />
    </h1>
  );
}

/** ===========================
 *  FLOATING BACKGROUND ICONS
 *  =========================== */
const FLOATING_ICONS = [
  { Icon: SiReact, size: 26, x: "8%", y: "18%", delay: 0.0 },
  { Icon: SiJavascript, size: 24, x: "18%", y: "70%", delay: 0.2 },
  { Icon: SiMongodb, size: 26, x: "82%", y: "20%", delay: 0.1 },
  { Icon: SiGit, size: 24, x: "88%", y: "72%", delay: 0.25 },
  { Icon: SiFigma, size: 24, x: "55%", y: "12%", delay: 0.15 },
  { Icon: SiHtml5, size: 22, x: "35%", y: "78%", delay: 0.35 },
  { Icon: SiCss3, size: 22, x: "65%", y: "78%", delay: 0.4 },
  { Icon: SiDart, size: 22, x: "45%", y: "30%", delay: 0.3 },
  { Icon: TbBrandCSharp, size: 22, x: "72%", y: "52%", delay: 0.45 },
  { Icon: SiCplusplus, size: 22, x: "25%", y: "45%", delay: 0.5 },
];

function FloatingTechBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {FLOATING_ICONS.map(({ Icon, size, x, y, delay }, idx) => (
        <motion.div
          key={idx}
          className="absolute opacity-20"
          style={{ left: x, top: y }}
          animate={{ y: [0, -18, 0], x: [0, 10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon style={{ width: size, height: size }} />
        </motion.div>
      ))}
    </div>
  );
}

/** ===========================
 *  3D TILT CARD
 *  =========================== */
function TiltCard({ children, className = "" }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 220, damping: 18 });
  const sy = useSpring(my, { stiffness: 220, damping: 18 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        perspective: 1000, 
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(22px)" }}>{children}</div>
    </motion.div>
  );
}/** ===========================
 *  SKILL RINGS
 *  =========================== */
function Ring({ label, value = 75, iconName }) {
  const radius = 28;
  const stroke = 6;
  const norm = 2 * Math.PI * radius;
  const offset = norm - (value / 100) * norm;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="relative h-20 w-20">
        <svg className="h-20 w-20 -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={stroke}
            fill="transparent"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke="rgba(255,255,255,0.75)"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={norm}
            initial={{ strokeDashoffset: norm }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 grid place-items-center text-white/85">
          {iconName ? <span className="text-xl">{techIcons[iconName]}</span> : <span className="text-sm font-semibold">{value}%</span>}
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-white/90">{label}</div>
        <div className="text-xs text-white/60">{value}% proficiency</div>
      </div>
    </div>
  );
}

/** ===========================
 *  TECH STACK GRID
 *  =========================== */
const STACK = [
  { name: "React.js", Icon: SiReact },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss3 },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "C", Icon: SiC },
  { name: "C++", Icon: SiCplusplus },
  { name: "C#", Icon: TbBrandCSharp },
  { name: "PHP", Icon: SiPhp },
  { name: "Java", Icon: FaJava },
  { name: "Dart", Icon: SiDart },
  { name: "Git", Icon: SiGit },
  { name: "Postman", Icon: SiPostman },
  { name: "Figma", Icon: SiFigma },
 

];

function TechStackGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {STACK.map(({ name, Icon }) => (
        <TiltCard
          key={name}
          className="group relative rounded-3xl border border-white/10 bg-white/[0.06] p-5 hover:border-white/25 transition"
        >
          {/* ✅ neon aura behind card */}
          <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition duration-500">
            <div className="absolute inset-0 rounded-[26px] bg-gradient-to-r from-blue-500/40 via-sky-500/35 to-cyan-500/35" />
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4">
            {/* ✅ neon blobs inside card */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
              <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/40 blur-3xl mix-blend-screen" />
              <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-fuchsia-500/35 blur-3xl mix-blend-screen" />
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/25 blur-3xl mix-blend-screen" />
            </div>

            <div className="relative flex items-center gap-3">
              <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
               <div className="text-2xl transition group-hover:scale-110">
  {techIcons[name] ?? <Icon className="text-2xl" />}
</div>
              </div>

              <div>
                <div className="text-sm font-semibold text-white/90">{name}</div>
                <div className="text-xs text-white/55">Tech Stack</div>
              </div>
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  );
}
/** ===========================
 *  DATA
 *  =========================== */
const PROFILE = {
  name: "Mohammad Shees",
  role: "React Developer | Web Developer | Software Developer",
  location: "New Delhi, India",
  phone: "+91 7838346305",
  email: "mohdshees581@gmail.com",
  languages: ["English", "Hindi", "Urdu"],
  objective:
    "Aspiring software developer with strong programming fundamentals, focused on building impactful full-stack solutions.",
  highlights: [
    { icon: Briefcase, label: "Internship", value: "DPIIT–NIC (Govt. of India)", link: "#timeline" },
    { icon: Star, label: "Projects", value: "5+ Projects", link: "#projects" },
    { icon: Sparkles, label: "Strength", value: "Modern UI + DBMS",  link: "#skills" },
  ],
  skills: {
    "Frontend / Web": ["React.js", "JavaScript", "HTML", "CSS", "PHP"],
    Programming: ["C", "C++", "Java", "C#", "Dart"],
    "Database / Tools": ["MongoDB", "DBMS", "Git", "Postman", "Figma"],
    Knowledge: [
      "Security & Cyber Law (Basics)",
      "Computer Hardware/Software Systems",
      "MS Office",
      "Software Maintenance",
      "Hardware Assembling",
    ],
  },
  experience: [
    {
      title: "Intern:  DPIIT–NIC (National Informatics Centre), Govt. of India",
      meta: "Web Development",
      points: [
        "Worked on web projects using Java and Database Management System.",
        "Supported development tasks and strengthened fundamentals via real workflows.",
      ],
    },
  ],
  education: [
    {
      title: "B.Tech CSE:  Jamia Hamdard University, New Delhi",
      meta: "2024 – 2027",
    },
    {
      title: "Diploma in Computer Engineering:  Jamia Millia Islamia University, New Delhi",
      meta: "2021 – 2024",
    },
    { title: "High School:  Jamia Millia Islamia University, New Delhi", meta: "Passing Year: 2021" },
  ],
  projects: [
    {
      name: "WiseRental Picks",
      tag: "AI/Reco",
      description: "Personalized rental recommendation experience to improve housing discovery.",
      bullets: ["Recommendation-driven UX", "Personalization focus"],
      links: [{ label: "Repository", href: "https://github.com/mshees01/Wise_Rental_Picks_Android_App" }],
      featured: true,
    },
    {
      name: "Sentilytics",
      tag: "Dashboard",
      description: "Real-time news sentiment dashboard using Fluvio & Groc.",
      bullets: ["Realtime stream insights", "Dashboard UI"],
      links: [{ label: "Repository", href: "https://github.com/mshees01/Sentilytics" }],
      featured: true,
    },
    {
      name: "Netflix Clone",
      tag: "React",
      description: "Responsive streaming UI with clean components & layout.",
      bullets: ["Responsive design", "UI flow & components"],
      links: [{ label: "Repository", href: "https://github.com/mshees01/Netflix-Clone" }],
    },
    {
      name: "Vehicle Rental System",
      tag: "Web App",
      description: "A platform concept for managing vehicle rentals end-to-end.",
      bullets: ["Rental flow concept", "Management modules"],
      links: [{ label: "Repository", href: "https://github.com/mshees01/Vehicle-Rental-System-Website" }],
    },
    {
      name: "Tic Tac Toe",
      tag: "Game",
      description: "2-player game with win/draw detection and smooth UI.",
      bullets: ["State handling", "Win/draw logic"],
      links: [{ label: "Repository", href: "https://github.com/mshees01/Tic-Tac-Toe-Game" }],
    },
  ],
  certifications: [
    "DPIIT–NIC Govt. of India Intern",
    "Networking Basics",
    "Python Basics",
    "Freedom Employability Academy (Computer/Internet + Soft Skills)",
    "Quiz Competitions (MeitY, Govt. of India) — Cyber Security Topics",
    "NCC — Jamia Millia Islamia University",
  ],
  publication: {
    title: "Elevating Seamless Housing Navigation with Precise Recommendations for Personalized Rental Experiences",
    venue: "4th International Conference on ICT for Digital, Smart & Sustainable Development (Jamia Hamdard, New Delhi)",
    journal: "Journal of Artificial Intelligence Research & Advances",
    doi: "10.37591/JoAIRA",
  },
  interests: ["Playing Football", "Exploring electronic machine parts", "Learning software & shortcut techniques"],
  socials: [{ label: "GitHub", icon: Github, href: "https://github.com/mshees01" }],
};

/** ===========================
 *  MOTION HELPERS + UTILS
 *  =========================== */
const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.06 * i, duration: 0.55, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function GlowCard({ className, children }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-white/10 bg-white/[0.06] p-6",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]",
        "backdrop-blur-xl overflow-hidden",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.18),transparent_50%),radial-gradient(circle_at_80%_40%,rgba(236,72,153,0.16),transparent_55%),radial-gradient(circle_at_40%_90%,rgba(34,197,94,0.10),transparent_55%)]",
        "before:opacity-100 before:content-['']",
        className
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

function GradientBadge({ children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        "bg-gradient-to-r from-indigo-400/20 via-fuchsia-400/20 to-emerald-400/20",
        "border border-white/10 text-white/80"
      )}
    >
      <Sparkles className="h-3.5 w-3.5 text-white/70" />
      {children}
    </span>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="mt-1 rounded-2xl bg-white/5 p-2 ring-1 ring-white/10">
        <Icon className="h-5 w-5 text-white/80" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-white/60">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 900);
        } catch {}
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
        "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
        "transition active:scale-[0.98]"
      )}
      type="button"
    >
      <Copy className="h-4 w-4" />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/** ===========================
 *  APP
 *  =========================== */
export default function App() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const tags = useMemo(() => {
    const s = new Set(PROFILE.projects.map((p) => p.tag));
    return ["All", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROFILE.projects.filter((p) => {
      const matchesTag = tag === "All" ? true : p.tag === tag;
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.bullets || []).some((b) => b.toLowerCase().includes(q));
      return matchesTag && matchesQ;
    });
  }, [query, tag]);

  return (
    <div className="min-h-screen bg-[#060712] text-white">
      {/* Floating icons */}
      <FloatingTechBackground />

      {/* Animated gradient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-[-160px] top-[-180px] h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 35, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-160px] top-[120px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[25%] bottom-[-220px] h-[580px] w-[580px] rounded-full bg-emerald-500/15 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.7))]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060712]/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 via-fuchsia-400/25 to-emerald-400/20" />
              <span className="relative text-sm font-extrabold">MS</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{PROFILE.name}</div>
              <div className="text-xs text-white/60">{PROFILE.role}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {[
              ["Projects", "#projects"],
              ["Skills", "#skills"],
              ["Timeline", "#timeline"],
              ["Certifications", "#certs"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={label} className="hover:text-white transition" href={href}>
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
              "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500",
              "shadow-[0_12px_30px_rgba(99,102,241,0.18)] hover:opacity-95 transition"
            )}
          >
            Hire / Internship <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5">
        {/* Hero */}
        <section className="grid gap-10 py-12 md:grid-cols-12 md:py-16">
          <motion.div className="md:col-span-7" initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp}>
              <GradientBadge>{PROFILE.location}</GradientBadge>
            </motion.div>

            <motion.div variants={fadeUp}>
              <TypewriterLine
                text="I'm Mohammad Shees, building modern web experiences that don’t just work, they impress."
                speed={110}
                className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl"
              />
            </motion.div>

            <motion.p variants={fadeUp} className="mt-4 max-w-xl text-white/70">
              {PROFILE.objective}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {["React.js", "JavaScript", "DBMS", "Git", "UI Animations"].map((s) => (
                <span
                  key={s}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    "border border-white/10 bg-white/5 text-white/80",
                    "hover:bg-white/10 transition"
                  )}
                >
                  <Tech name={s} />
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
                  "bg-white text-black hover:opacity-90 transition",
                  "shadow-[0_16px_50px_rgba(0,0,0,0.45)]"
                )}
              >
                View Projects <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
                  "border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                )}
              >
                Contact <Mail className="h-4 w-4" />
              </a>

              <a
  href="/Mohammad_Shees_Resume.pdf"
  download
  className={cn(
    "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
    "border border-white/10 bg-white/5 text-white hover:bg-white/10 transition active:scale-[0.98]"
  )}
>
  Download Resume <Download className="h-4 w-4" />
</a>
            </motion.div>
          </motion.div>

          <motion.div className="md:col-span-5" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <GlowCard>
              <div className="text-sm font-semibold text-white/85">Snapshot</div>

              <div className="mt-4 grid gap-3">
                {PROFILE.highlights.map((h, i) => (
                      <a key={h.label} href={h.link} className="block">
                  <motion.div
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={cn("rounded-2xl border border-white/10 bg-black/20 p-4", "transition")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
                          <h.icon className="h-5 w-5 text-white/80" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{h.label}</div>
                          <div className="text-xs text-white/60">{h.value}</div>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/40" />
                    </div>
                  </motion.div>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60">Core Stack</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["React.js", "JavaScript", "MongoDB", "DBMS", "Git"].map((s) => (
                    <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/85">
                      <Tech name={s} />
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-10">
          <SectionTitle icon={BookOpen} title="Projects" subtitle="Search & filter with premium cards." />

          <div className="mb-5 grid gap-3 md:grid-cols-12">
            <div className="relative md:col-span-7">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search (react, dashboard, recommendation...)"
                className={cn(
                  "w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm",
                  "text-white placeholder:text-white/40 outline-none",
                  "focus:ring-2 focus:ring-indigo-400/25"
                )}
              />
            </div>

            <div className="md:col-span-5">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                <Filter className="ml-2 h-4 w-4 text-white/50" />
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-transparent p-2 text-sm text-white/80 outline-none"
                >
                  {tags.map((t) => (
                    <option key={t} value={t} className="bg-[#060712]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((p, i) => (
              <TiltCard
                key={p.name}
                className={cn(
                  "group relative rounded-3xl border border-white/10 bg-white/[0.06] p-6",
                  "overflow-hidden transition",
                  "hover:border-white/20 hover:bg-white/[0.09]",
                  "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]"
                )}
              >
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
                    <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
                  </div>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold">{p.name}</h3>
                          {p.featured ? (
                            <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-white/85">
                              Featured
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm text-white/70">{p.description}</p>
                      </div>

                      <span className="shrink-0 rounded-full bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/20 to-emerald-500/20 px-3 py-1 text-xs font-semibold text-white/85 border border-white/10">
                        {p.tag}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold",
                            "border border-white/10 bg-black/20 text-white/85",
                            "hover:bg-white/10 transition"
                          )}
                        >
                          {l.label} <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-10">
          <SectionTitle icon={Star} title="Skills" subtitle="Core technologies i used that transform ideas into production  ready solutions." />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2"
          >
            {Object.entries(PROFILE.skills).map(([group, items], idx) => (
              <motion.div
                key={group}
                custom={idx}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
              >
                <div className="text-sm font-semibold text-white/85">{group}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ scale: 1.08 }}
                      className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border border-white/10 bg-white/5"
                    >
                      <Tech name={s} />
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Rings */}
          <div className="mt-10">
            <SectionTitle icon={Star} title="Skill Rings" subtitle="A quick snapshot of my strongest skills and comfort level." />
            <div className="grid gap-4 md:grid-cols-2">
              <Ring label="React.js" value={82} iconName="React.js" />
              <Ring label="JavaScript" value={78} iconName="JavaScript" />
              <Ring label="DBMS" value={72} iconName="DBMS" />
              <Ring label="C++" value={92} iconName="C++" />
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="mt-10">
            <SectionTitle icon={Star} title="Tech Stack" subtitle="Technologies I work with to deliver clean and efficient solutions." />
            <TechStackGrid />
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="py-10">
          <SectionTitle icon={GraduationCap} title="Timeline" subtitle="Clean, readable and animated on scroll." />

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/85">
                <GraduationCap className="h-4 w-4" /> Education
              </div>

              <div className="space-y-4">
                {PROFILE.education.map((e, i) => (
                  <motion.div
                    key={e.title}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="text-sm font-semibold">{e.title}</div>
                    <div className="mt-1 text-xs text-white/60">{e.meta}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/85">
                <Briefcase className="h-4 w-4" /> Experience
              </div>

              <div className="space-y-4">
                {PROFILE.experience.map((x, i) => (
                  <motion.div
                    key={x.title}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="text-sm font-semibold">{x.title}</div>
                    <div className="mt-1 text-xs text-white/60">{x.meta}</div>
                    <ul className="mt-3 space-y-2 text-sm text-white/70">
                      {x.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications + Publication */}
        <section id="certs" className="py-10">
          <SectionTitle icon={Trophy} title="Certifications & Publication" subtitle="Validated skills through certifications and academic research." />

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/85">
                <Trophy className="h-4 w-4" /> Certifications
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                {PROFILE.certifications.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/85">
                <BookOpen className="h-4 w-4" /> Publication
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold">{PROFILE.publication.title}</div>
                <div className="mt-2 text-xs text-white/60">{PROFILE.publication.venue}</div>
                <div className="mt-2 text-xs text-white/60">{PROFILE.publication.journal}</div>
                <div className="mt-2 text-xs text-white/60">DOI: {PROFILE.publication.doi}</div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/60">Languages</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {PROFILE.languages.map((l) => (
                      <span
                        key={l}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/85"
                      >
                        <Languages className="h-3.5 w-3.5" />
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/60">Interests</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {PROFILE.interests.map((i) => (
                      <span key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/85">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12">
          <GlowCard className="p-7 md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">
                  Let’s{" "}
                  <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-emerald-200 bg-clip-text text-transparent">
                    connect
                  </span>
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/70">
                  Internship opportunities, collaborations, or project work, ping me anytime.
                </p>

                <div className="mt-5 grid gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85">
                      <Phone className="h-4 w-4" />
                      {PROFILE.phone}
                    </span>
                    <CopyButton value={PROFILE.phone} />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85">
                      <Mail className="h-4 w-4" />
                      {PROFILE.email}
                    </span>
                    <CopyButton value={PROFILE.email} />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85">
                      <MapPin className="h-4 w-4" />
                      {PROFILE.location}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {PROFILE.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
                    >
                      <s.icon className="h-4 w-4" />
                      {s.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/20 p-6">
                <div className="text-sm font-semibold text-white/85">Quick pitch</div>
                <p className="mt-2 text-sm text-white/70">
                  Modern web developer combining clean UI design with strong backend and database foundations to deliver production-ready solutions.
                </p>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Best-fit roles</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Frontend Intern", "React Developer Intern", "Web Developer Intern", "Full Stack Intern"].map((r) => (
                      <span key={r} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/85">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-xs text-white/50">
                    * I’m open to internships, freelance projects, or full-time roles. Let’s chat!                </div>
              </div>
            </div>
          </GlowCard>

          <footer className="py-8 text-center text-xs text-white/45">
            © {new Date().getFullYear()} {PROFILE.name} • React + Tailwind + Framer Motion
          </footer>
        </section>
      </main>
    </div>
  );
}