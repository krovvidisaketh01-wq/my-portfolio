import { useState, useEffect, useRef } from "react";

const ACCENT = "#22d3ee";
const ACCENT2 = "#a78bfa";
const BG = "#0a0a0f";
const SURFACE = "#12121a";
const SURFACE2 = "#1a1a26";
const BORDER = "#2a2a3a";
const TEXT = "#e4e4ed";
const MUTED = "#8888a0";

const NAV_ITEMS = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

const SKILLS = {
  "Languages": ["Python", "SQL", "Java", "C"],
  "Backend": ["Django", "Flask", "REST APIs", "OOP", "API Integration"],
  "Frontend": ["Tkinter", "Matplotlib", "HTML"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Advanced SQL"],
  "Data & ETL": ["Pandas", "PySpark", "CSV/JSON", "ETL Pipelines", "Data Modeling"],
  "Tools & Practices": ["Git", "GitHub", "VS Code", "PyTest", "Agile/Scrum", "Linux"],
};

const PROJECTS = [
  {
    title: "Temple Management System",
    period: "Aug 2025 — Dec 2025",
    tech: ["Python", "SQLite", "Tkinter", "Matplotlib", "ReportLab"],
    points: [
      "Built a full-stack system with modules for pooja bookings, donations, stage bookings, festival events, and secure admin/employee authentication.",
      "Implemented advanced reporting — PDF generation, CSV exports, and Matplotlib analytics dashboards.",
      "Structured into 5 modules: Database, UI, Manager Dashboard, Staff Dashboard, and PDF Reports.",
      "Automated routine operations, reducing manual workload by 60–70% with estimated annual savings of $3,000–$5,000.",
    ],
  },
  {
    title: "Production & Ordering Processing System (POPS)",
    period: "Aug 2024 — Nov 2024",
    tech: ["Python", "SQLite", "Tkinter"],
    points: [
      "Developed a system to streamline order management, inventory monitoring, and customer service workflows handling up to 1,000 orders/day.",
      "Built role-based dashboards for sales managers, production managers, and customer service staff with real-time status tracking.",
      "Designed interactive GUI enabling 30% faster order tracking and reducing manual errors by 25%.",
      "Integrated SQLite database managing 5,000+ records with auto-generated IDs and 100% secure record handling.",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Graduate Engineer",
    company: "HCL Technologies",
    location: "Hyderabad, India",
    period: "Mar 2022 — Nov 2023",
    points: [
      "Developed Python backend components using Django and Flask, applying OOP principles for modular, maintainable code.",
      "Built and integrated RESTful APIs for backend-client communication.",
      "Performed data processing and ETL workflows using Pandas, handling CSV/JSON datasets for reporting and analytics.",
      "Wrote and optimized SQL queries (joins, CTEs, window functions) for MySQL and PostgreSQL; worked with MongoDB for semi-structured data.",
      "Assisted in data modeling using Star and Snowflake schemas; gained exposure to PySpark for large-scale data processing.",
      "Developed GUI dashboards using Tkinter and Matplotlib; implemented unit testing with PyTest.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Master's in Information Systems",
    school: "Murray State University, Murray, KY",
    period: "Spring 2024 — Fall 2025",
    gpa: "3.66 / 4.00",
  },
  {
    degree: "B.E. in Electrical & Electronics Engineering",
    school: "Vignan Institute of Technology and Science, India",
    period: "Aug 2019 — Jul 2023",
    gpa: "8.30 / 10.00",
  },
];

const CERTS = [
  "Published: \"Cascaded Multilevel PV Inverter with Improved Harmonic Performance\" — ICPERES 2023 (International Conference)",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function GlowDot({ top, left, color, size = 220 }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${size * 0.6}px)`,
        opacity: 0.08,
        pointerEvents: "none",
      }}
    />
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.toLowerCase()));
      let current = "About";
      for (const sec of sections) {
        if (sec && sec.getBoundingClientRect().top <= 120) current = sec.id.charAt(0).toUpperCase() + sec.id.slice(1);
      }
      setActiveNav(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const sectionStyle = { maxWidth: 860, margin: "0 auto", padding: "80px 24px" };
  const sectionTitle = (text, accent = ACCENT) => (
    <div style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 14,
          fontWeight: 500,
          color: accent,
          letterSpacing: 4,
          textTransform: "uppercase",
          margin: "0 0 8px",
        }}
      >
        {"// " + text}
      </h2>
      <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: 2 }} />
    </div>
  );

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${ACCENT}33; color: ${ACCENT}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 3px; }
        a { color: ${ACCENT}; text-decoration: none; }
        a:hover { text-decoration: underline; }
        input:focus, textarea:focus { outline: none; border-color: ${ACCENT} !important; box-shadow: 0 0 0 3px ${ACCENT}22; }
      `}</style>

      {/* Ambient glow */}
      <GlowDot top="-80px" left="-60px" color={ACCENT} size={300} />
      <GlowDot top="40%" left="85%" color={ACCENT2} size={260} />
      <GlowDot top="75%" left="10%" color={ACCENT} size={200} />

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: `${BG}dd`,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 18,
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => scrollTo("about")}
          >
            SK.
          </span>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                style={{
                  background: activeNav === item ? `${ACCENT}15` : "transparent",
                  border: "none",
                  color: activeNav === item ? ACCENT : MUTED,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "6px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  letterSpacing: 0.5,
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero / About */}
      <section id="about" style={{ ...sectionStyle, paddingTop: 140, paddingBottom: 60 }}>
        <FadeIn>
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: ACCENT,
                background: `${ACCENT}11`,
                padding: "4px 12px",
                borderRadius: 99,
                border: `1px solid ${ACCENT}33`,
              }}
            >
              F-1 OPT Work Authorized
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: "16px 0",
              letterSpacing: "-1.5px",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Saketh Krovvidi
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.7, maxWidth: 600, marginBottom: 24 }}>
            Python Developer with 1.5+ years of backend engineering experience building scalable applications using Django, Flask, and REST APIs. Skilled in data processing, database design, and delivering end-to-end software solutions.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
            {[
              { icon: "📍", text: "Murray, KY" },
              { icon: "📧", text: "krovvidisaketh01@gmail.com" },
              { icon: "📱", text: "+1 (270) 883-2341" },
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  color: MUTED,
                  background: SURFACE,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <span>{item.icon}</span> {item.text}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="https://github.com/krovvidisaketh01-wq"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 8,
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                color: BG,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: `0 4px 20px ${ACCENT}33`,
              }}
              onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px ${ACCENT}44`; }}
              onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 20px ${ACCENT}33`; }}
            >
              GitHub →
            </a>
            <a
              href="https://www.linkedin.com/in/saketh-krovvidi-662510325/"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 8,
                background: "transparent",
                color: ACCENT,
                fontWeight: 600,
                fontSize: 14,
                border: `1px solid ${ACCENT}55`,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.background = `${ACCENT}11`; }}
              onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
            >
              LinkedIn →
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Skills */}
      <section id="skills" style={{ ...sectionStyle, paddingTop: 40 }}>
        <FadeIn>{sectionTitle("Skills")}</FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
          {Object.entries(SKILLS).map(([category, skills], i) => (
            <FadeIn key={category} delay={i * 0.08}>
              <div
                style={{
                  background: SURFACE,
                  borderRadius: 12,
                  padding: 20,
                  border: `1px solid ${BORDER}`,
                  transition: "border-color 0.3s, transform 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ACCENT}55`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <h3
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 600,
                    color: ACCENT,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: 12,
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: `${ACCENT}0a`,
                        color: TEXT,
                        border: `1px solid ${BORDER}`,
                        fontWeight: 500,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ ...sectionStyle, paddingTop: 40 }}>
        <FadeIn>{sectionTitle("Projects", ACCENT2)}</FadeIn>
        {PROJECTS.map((proj, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div
              style={{
                background: SURFACE,
                borderRadius: 14,
                padding: 28,
                marginBottom: 20,
                border: `1px solid ${BORDER}`,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ACCENT2}55`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>{proj.title}</h3>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: MUTED }}>{proj.period}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {proj.tech.map((t) => (
                  <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99, background: `${ACCENT2}18`, color: ACCENT2, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                    {t}
                  </span>
                ))}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {proj.points.map((p, j) => (
                  <li key={j} style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.65, marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: ACCENT }}>›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* Experience */}
      <section id="experience" style={{ ...sectionStyle, paddingTop: 40 }}>
        <FadeIn>{sectionTitle("Experience")}</FadeIn>
        {EXPERIENCE.map((exp, i) => (
          <FadeIn key={i}>
            <div
              style={{
                background: SURFACE,
                borderRadius: 14,
                padding: 28,
                border: `1px solid ${BORDER}`,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>{exp.role}</h3>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: MUTED }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: 14, color: ACCENT, fontWeight: 500, marginBottom: 16 }}>
                {exp.company} · {exp.location}
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {exp.points.map((p, j) => (
                  <li key={j} style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.65, marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: ACCENT }}>›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* Education */}
      <section id="education" style={{ ...sectionStyle, paddingTop: 40 }}>
        <FadeIn>{sectionTitle("Education & Certifications", ACCENT2)}</FadeIn>
        <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
          {EDUCATION.map((edu, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  background: SURFACE,
                  borderRadius: 12,
                  padding: 22,
                  border: `1px solid ${BORDER}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{edu.degree}</h3>
                  <p style={{ fontSize: 13, color: MUTED }}>{edu.school}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: MUTED, marginBottom: 4 }}>{edu.period}</div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      color: ACCENT,
                      background: `${ACCENT}11`,
                      padding: "3px 10px",
                      borderRadius: 6,
                      display: "inline-block",
                    }}
                  >
                    GPA: {edu.gpa}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div style={{ background: SURFACE, borderRadius: 12, padding: 20, border: `1px solid ${BORDER}` }}>
            <h4 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: ACCENT2, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
              Publication
            </h4>
            {CERTS.map((c, i) => (
              <p key={i} style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.6 }}>{c}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Contact */}
      <section id="contact" style={{ ...sectionStyle, paddingTop: 40, paddingBottom: 100 }}>
        <FadeIn>{sectionTitle("Get In Touch")}</FadeIn>
        <FadeIn delay={0.1}>
          <div
            style={{
              background: SURFACE,
              borderRadius: 14,
              padding: 32,
              border: `1px solid ${BORDER}`,
              maxWidth: 520,
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: ACCENT }}>Message sent!</p>
                <p style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 14, color: MUTED, marginBottom: 24, lineHeight: 1.6 }}>
                  Interested in working together? Drop me a message and I'll get back to you.
                </p>
                {[
                  { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 8,
                        border: `1px solid ${BORDER}`,
                        background: SURFACE2,
                        color: TEXT,
                        fontSize: 14,
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: `1px solid ${BORDER}`,
                      background: SURFACE2,
                      color: TEXT,
                      fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif",
                      resize: "vertical",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 8,
                    border: "none",
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                    color: BG,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: `0 4px 20px ${ACCENT}33`,
                  }}
                  onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = `0 8px 30px ${ACCENT}44`; }}
                  onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 20px ${ACCENT}33`; }}
                >
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <div
        style={{
          borderTop: `1px solid ${BORDER}`,
          padding: "20px 24px",
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: MUTED,
        }}
      >
        © 2026 Saketh Krovvidi · Built with purpose
      </div>
    </div>
  );
}
