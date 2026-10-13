import { useState, useEffect, useRef } from "react";

const JAG_LOGO = "data:image/jpeg;base64,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";

const COLORS = {
  navy: "#0A1628",
  navyMid: "#112040",
  navyLight: "#1A3058",
  gold: "#F4A800",
  goldLight: "#FFD060",
  goldDim: "#C88800",
  teal: "#00B4C8",
  tealDim: "#008FA0",
  white: "#F5F8FF",
  offWhite: "#DDE6F0",
  muted: "#8BA0BC",
  green: "#22D47A",
  red: "#FF5A5A",
  orange: "#FF9F40",
  surface: "#132238",
  card: "#1C3050",
};

const style = (obj) => obj;

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PARTICIPANTS = [
  { id: 1, name: "Marcus Johnson", grade: "11", program: "Work-Based Learning", status: "Active", lastContact: "2 days ago", goals: 3, tasks: 2, avatar: "MJ", risk: "low", phone: "+15138330854" },
  { id: 2, name: "Aaliyah Torres", grade: "12", program: "Career Development", status: "Active", lastContact: "Today", goals: 4, tasks: 1, avatar: "AT", risk: "medium" },
  { id: 3, name: "Devon Williams", grade: "10", program: "Employability Skills", status: "At Risk", lastContact: "5 days ago", goals: 2, tasks: 4, avatar: "DW", risk: "high" },
  { id: 4, name: "Priya Patel", grade: "11", program: "Work-Based Learning", status: "Active", lastContact: "Yesterday", goals: 5, tasks: 0, avatar: "PP", risk: "low" },
  { id: 5, name: "Jordan Smith", grade: "12", program: "Career Development", status: "Active", lastContact: "3 days ago", goals: 3, tasks: 1, avatar: "JS", risk: "low" },
  { id: 6, name: "Keisha Brown", grade: "10", program: "Employability Skills", status: "Inactive", lastContact: "2 weeks ago", goals: 1, tasks: 3, avatar: "KB", risk: "high" },
];

const EVENTS = [
  { id: 1, title: "Career Fair Prep Workshop", time: "9:00 AM", location: "Room 204", participants: 14, checked: 9, date: "Today" },
  { id: 2, title: "Resume Review Session", time: "1:30 PM", location: "Library", participants: 8, checked: 0, date: "Today" },
  { id: 3, title: "Mock Interview Day", time: "10:00 AM", location: "Gym B", participants: 22, checked: 0, date: "Tomorrow" },
];

const TASKS = [
  { id: 1, title: "Follow up with Devon Williams", due: "Today", priority: "high", done: false, participant: "Devon Williams" },
  { id: 2, title: "Submit Q3 outcome report", due: "Today", priority: "high", done: false, participant: null },
  { id: 3, title: "Update Keisha Brown's service plan", due: "Tomorrow", priority: "medium", done: false, participant: "Keisha Brown" },
  { id: 4, title: "Schedule employer site visit", due: "This week", priority: "low", done: true, participant: null },
  { id: 5, title: "Review Marcus Johnson's goals", due: "Friday", priority: "low", done: false, participant: "Marcus Johnson" },
];

const SERVICES = [
  { type: "Career Counseling", icon: "🎯" },
  { type: "Job Placement", icon: "💼" },
  { type: "Skills Training", icon: "🛠" },
  { type: "Academic Support", icon: "📚" },
  { type: "Follow-Up Contact", icon: "📞" },
  { type: "Resource Referral", icon: "🔗" },
];

const COMPETENCY_DOMAINS = [
  {
    id: "work_readiness",
    label: "Work Readiness",
    color: "#F4A800",
    icon: "💼",
    competencies: [
      { id: "wr1", label: "Career Planning" },
      { id: "wr2", label: "Job Search Skills" },
      { id: "wr3", label: "Resume Writing" },
      { id: "wr4", label: "Interview Skills" },
      { id: "wr5", label: "Workplace Behavior" },
      { id: "wr6", label: "Time Management" },
      { id: "wr7", label: "Financial Literacy" },
    ],
  },
  {
    id: "personal_social",
    label: "Personal & Social",
    color: "#00B4C8",
    icon: "🌱",
    competencies: [
      { id: "ps1", label: "Self-Awareness" },
      { id: "ps2", label: "Goal Setting" },
      { id: "ps3", label: "Decision Making" },
      { id: "ps4", label: "Communication Skills" },
      { id: "ps5", label: "Teamwork & Collaboration" },
      { id: "ps6", label: "Conflict Resolution" },
      { id: "ps7", label: "Stress Management" },
      { id: "ps8", label: "Leadership" },
    ],
  },
  {
    id: "academic",
    label: "Academic Attainment",
    color: "#22D47A",
    icon: "📚",
    competencies: [
      { id: "ac1", label: "Study Skills" },
      { id: "ac2", label: "Reading Comprehension" },
      { id: "ac3", label: "Math Applications" },
      { id: "ac4", label: "Writing Proficiency" },
      { id: "ac5", label: "Technology Use" },
      { id: "ac6", label: "Critical Thinking" },
    ],
  },
  {
    id: "career_technical",
    label: "Career & Technical",
    color: "#FF9F40",
    icon: "🔧",
    competencies: [
      { id: "ct1", label: "Industry Knowledge" },
      { id: "ct2", label: "Technical Skills" },
      { id: "ct3", label: "Workplace Safety" },
      { id: "ct4", label: "Entrepreneurship" },
      { id: "ct5", label: "Digital Literacy" },
      { id: "ct6", label: "Professional Networking" },
    ],
  },
  {
    id: "civic",
    label: "Civic Engagement",
    color: "#A78BFA",
    icon: "🏛",
    competencies: [
      { id: "cv1", label: "Community Service" },
      { id: "cv2", label: "Civic Responsibility" },
      { id: "cv3", label: "Cultural Awareness" },
      { id: "cv4", label: "Environmental Stewardship" },
      { id: "cv5", label: "Volunteerism" },
      { id: "cv6", label: "JAG Chapter Involvement" },
    ],
  },
];

const FOLLOWUP_METHODS = [
  { id: "phone", label: "Phone Call", icon: "📞" },
  { id: "inperson", label: "In-Person", icon: "🤝" },
  { id: "email", label: "Email", icon: "✉️" },
  { id: "text", label: "Text Message", icon: "💬" },
  { id: "homevisit", label: "Home Visit", icon: "🏠" },
  { id: "virtual", label: "Virtual Meeting", icon: "💻" },
];

const FOLLOWUP_PURPOSES = [
  "Academic check-in",
  "Employment status",
  "Goal progress review",
  "Barrier removal",
  "Resource connection",
  "Post-program support",
  "Crisis intervention",
  "General wellness",
];

const INITIAL_FOLLOWUPS = [
  { id: 1, participant: "Devon Williams", avatar: "DW", method: "phone", purpose: "Academic check-in", dueDate: "Today", priority: "high", status: "pending", notes: "Student has not responded to last 2 attempts" },
  { id: 2, participant: "Keisha Brown", avatar: "KB", method: "homevisit", purpose: "Barrier removal", dueDate: "Tomorrow", priority: "high", status: "pending", notes: "Transportation issue flagged" },
  { id: 3, participant: "Marcus Johnson", avatar: "MJ", method: "inperson", purpose: "Goal progress review", dueDate: "This week", priority: "medium", status: "pending", notes: "" },
  { id: 4, participant: "Aaliyah Torres", avatar: "AT", method: "email", purpose: "Employment status", dueDate: "Friday", priority: "low", status: "completed", notes: "Confirmed internship start date" },
];

// ─── Utility Components ───────────────────────────────────────────────────────
const Avatar = ({ initials, size = 40, risk }) => {
  const riskColors = { low: COLORS.green, medium: COLORS.orange, high: COLORS.red };
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.navyLight})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Mono', monospace", fontSize: size * 0.32,
        color: COLORS.white, fontWeight: "600", letterSpacing: "0.05em",
        border: `2px solid ${COLORS.navyLight}`,
      }}>{initials}</div>
      {risk && <div style={{
        position: "absolute", bottom: 1, right: 1,
        width: size * 0.28, height: size * 0.28, borderRadius: "50%",
        background: riskColors[risk], border: `2px solid ${COLORS.navy}`,
      }} />}
    </div>
  );
};

const Badge = ({ label, color = COLORS.teal, small }) => (
  <span style={{
    background: color + "22", color, border: `1px solid ${color}44`,
    borderRadius: 4, padding: small ? "2px 6px" : "3px 8px",
    fontSize: small ? 10 : 11, fontFamily: "'DM Mono', monospace",
    fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase",
  }}>{label}</span>
);

const PriorityDot = ({ priority }) => {
  const colors = { high: COLORS.red, medium: COLORS.orange, low: COLORS.muted };
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: colors[priority], marginRight: 6 }} />;
};

const StatCard = ({ label, value, sub, accent }) => (
  <div style={{
    background: COLORS.card, borderRadius: 12, padding: "14px 16px",
    border: `1px solid ${COLORS.navyLight}`, flex: 1,
    borderTop: `3px solid ${accent || COLORS.gold}`,
  }}>
    <div style={{ fontSize: 24, fontWeight: "800", color: COLORS.white, fontFamily: "'DM Mono', monospace" }}>{value}</div>
    <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: accent || COLORS.gold, marginTop: 4 }}>{sub}</div>}
  </div>
);

const QuickAction = ({ icon, label, onClick, accent }) => (
  <button onClick={onClick} style={{
    background: COLORS.card, border: `1px solid ${COLORS.navyLight}`,
    borderRadius: 12, padding: "14px 8px", display: "flex",
    flexDirection: "column", alignItems: "center", gap: 8,
    cursor: "pointer", flex: 1, transition: "all 0.15s",
  }}
    onMouseEnter={e => { e.currentTarget.style.background = COLORS.navyLight; e.currentTarget.style.borderColor = accent || COLORS.gold; }}
    onMouseLeave={e => { e.currentTarget.style.background = COLORS.card; e.currentTarget.style.borderColor = COLORS.navyLight; }}
  >
    <span style={{ fontSize: 22 }}>{icon}</span>
    <span style={{ fontSize: 11, color: COLORS.offWhite, textAlign: "center", lineHeight: 1.3, fontWeight: "500" }}>{label}</span>
  </button>
);

const SectionHeader = ({ title, action, onAction }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
    <span style={{ fontSize: 13, fontWeight: "700", color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{title}</span>
    {action && <button onClick={onAction} style={{ background: "none", border: "none", color: COLORS.teal, fontSize: 12, cursor: "pointer", fontWeight: "600" }}>{action}</button>}
  </div>
);

const BackBtn = ({ onClick }) => (
  <button onClick={onClick} style={{
    background: "none", border: "none", color: COLORS.teal,
    fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0,
  }}>← Back</button>
);


// ─── CONTACT MODAL ───────────────────────────────────────────────────────────
const ContactModal = ({ participant, onClose }) => {
  const [activeMethod, setActiveMethod] = useState(null);
  const [textMsg, setTextMsg] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sent, setSent] = useState(false);

  const phone = participant.phone || "No phone on file";
  const email = participant.name.split(" ").join(".").toLowerCase() + "@jagprogram.org";

  const handleSend = async () => {
    if (activeMethod === "text" && participant.phone) {
      try {
        await fetch("/.netlify/functions/send-checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toNumber: participant.phone, participantName: participant.name }),
        });
      } catch (err) {
        console.error("SMS send error:", err);
      }
    }
    setSent(true);
    setTimeout(() => { setSent(false); setActiveMethod(null); setTextMsg(""); setEmailSubject(""); setEmailBody(""); }, 1800);
  };

  if (sent) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: COLORS.card, borderRadius: 20, padding: 32, textAlign: "center", width: 280 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{activeMethod === "email" ? "✉️" : "💬"}</div>
        <div style={{ fontSize: 18, fontWeight: "700", color: COLORS.white, marginBottom: 6 }}>
          {activeMethod === "email" ? "Email Sent!" : "Text Sent!"}
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted }}>Logged to {participant.name}'s record</div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: COLORS.navyMid, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 375, padding: "0 0 32px", border: "1px solid " + COLORS.navyLight }}>

        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: COLORS.navyLight }} />
        </div>

        {/* Header */}
        <div style={{ padding: "0 20px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid " + COLORS.navyLight }}>
          <Avatar initials={participant.avatar} size={44} risk={participant.risk} />
          <div>
            <div style={{ fontSize: 16, fontWeight: "700", color: COLORS.white }}>{participant.name}</div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>Grade {participant.grade} · {participant.program}</div>
          </div>
          <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", color: COLORS.muted, fontSize: 20, cursor: "pointer", padding: 4 }}>✕</button>
        </div>

        {/* Method selector */}
        {!activeMethod && (
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ fontSize: 12, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>How would you like to reach out?</div>

            {/* Phone Call */}
            <a href={"tel:" + phone} style={{ textDecoration: "none" }}>
              <div style={{
                background: COLORS.card, borderRadius: 14, padding: "16px 18px", marginBottom: 10,
                border: "1px solid " + COLORS.teal + "44", display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.teal + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📞</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: "700", color: COLORS.white }}>Phone Call</div>
                  <div style={{ fontSize: 12, color: COLORS.teal, marginTop: 2 }}>{phone}</div>
                </div>
                <span style={{ color: COLORS.teal, fontSize: 18 }}>›</span>
              </div>
            </a>

            {/* Text Message */}
            <div onClick={() => setActiveMethod("text")} style={{
              background: COLORS.card, borderRadius: 14, padding: "16px 18px", marginBottom: 10,
              border: "1px solid " + COLORS.green + "44", display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.green + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>💬</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: "700", color: COLORS.white }}>Text Message</div>
                <div style={{ fontSize: 12, color: COLORS.green, marginTop: 2 }}>Send an SMS</div>
              </div>
              <span style={{ color: COLORS.green, fontSize: 18 }}>›</span>
            </div>

            {/* Email */}
            <div onClick={() => { setEmailSubject("JAG Follow-Up — " + participant.name); setActiveMethod("email"); }} style={{
              background: COLORS.card, borderRadius: 14, padding: "16px 18px", marginBottom: 10,
              border: "1px solid " + COLORS.gold + "44", display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.gold + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✉️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: "700", color: COLORS.white }}>Email</div>
                <div style={{ fontSize: 12, color: COLORS.gold, marginTop: 2 }}>{email}</div>
              </div>
              <span style={{ color: COLORS.gold, fontSize: 18 }}>›</span>
            </div>

            {/* Contact info row */}
            <div style={{ background: COLORS.navy, borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: COLORS.muted }}>Last contact</span>
              <span style={{ fontSize: 12, color: COLORS.offWhite, fontWeight: "600" }}>{participant.lastContact}</span>
            </div>
          </div>
        )}

        {/* Text Message Composer */}
        {activeMethod === "text" && (
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <button onClick={() => setActiveMethod(null)} style={{ background: "none", border: "none", color: COLORS.teal, fontSize: 13, cursor: "pointer", padding: 0 }}>← Back</button>
              <div style={{ fontSize: 14, fontWeight: "700", color: COLORS.white }}>Text {participant.name.split(" ")[0]}</div>
            </div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>To: {phone}</div>

            {/* Quick templates */}
            <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Quick Templates</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {[
                "Hi! Just checking in on how you're doing.",
                "Don't forget about our meeting tomorrow.",
                "Please call me when you get a chance.",
                "Your goal review is coming up soon!",
              ].map(t => (
                <button key={t} onClick={() => setTextMsg(t)} style={{
                  padding: "6px 10px", borderRadius: 16, background: textMsg === t ? COLORS.green + "22" : COLORS.card,
                  border: "1px solid " + (textMsg === t ? COLORS.green : COLORS.navyLight),
                  color: textMsg === t ? COLORS.green : COLORS.muted,
                  fontSize: 11, cursor: "pointer", textAlign: "left",
                }}>{t.length > 30 ? t.slice(0, 28) + "…" : t}</button>
              ))}
            </div>

            <textarea value={textMsg} onChange={e => setTextMsg(e.target.value)} placeholder="Type your message…"
              style={{ width: "100%", background: COLORS.card, border: "1px solid " + COLORS.navyLight, borderRadius: 12, padding: 14, color: COLORS.white, fontSize: 13, minHeight: 100, resize: "none", boxSizing: "border-box", outline: "none", fontFamily: "inherit", marginBottom: 8 }} />
            <div style={{ fontSize: 11, color: COLORS.muted, textAlign: "right", marginBottom: 14 }}>{textMsg.length}/160</div>

            <button onClick={handleSend} style={{
              width: "100%", padding: 14, borderRadius: 12, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, " + COLORS.green + ", #18A85E)",
              color: COLORS.navy, fontWeight: "800", fontSize: 15,
            }}>Send JAG Check-In SMS 📲</button>
          </div>
        )}

        {/* Email Composer */}
        {activeMethod === "email" && (
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <button onClick={() => setActiveMethod(null)} style={{ background: "none", border: "none", color: COLORS.teal, fontSize: 13, cursor: "pointer", padding: 0 }}>← Back</button>
              <div style={{ fontSize: 14, fontWeight: "700", color: COLORS.white }}>Email {participant.name.split(" ")[0]}</div>
            </div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>To: {email}</div>

            <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Subject</div>
            <input value={emailSubject} onChange={e => setEmailSubject(e.target.value)}
              style={{ width: "100%", background: COLORS.card, border: "1px solid " + COLORS.navyLight, borderRadius: 10, padding: "10px 14px", color: COLORS.white, fontSize: 13, boxSizing: "border-box", outline: "none", fontFamily: "inherit", marginBottom: 12 }} />

            {/* Quick templates */}
            <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Quick Templates</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {["Check-in", "Goal Review", "Resource Info", "Event Reminder"].map(t => (
                <button key={t} onClick={() => setEmailBody("Hi " + participant.name.split(" ")[0] + ",\n\nI wanted to reach out regarding " + t.toLowerCase() + ".\n\nPlease let me know if you have any questions.\n\nBest,\nSarah K.\nJAG Specialist")} style={{
                  padding: "6px 12px", borderRadius: 16, background: COLORS.card,
                  border: "1px solid " + COLORS.navyLight, color: COLORS.muted, fontSize: 11, cursor: "pointer",
                }}>{t}</button>
              ))}
            </div>

            <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Message</div>
            <textarea value={emailBody} onChange={e => setEmailBody(e.target.value)} placeholder={"Hi " + participant.name.split(" ")[0] + ",\n\nType your message here…"}
              style={{ width: "100%", background: COLORS.card, border: "1px solid " + COLORS.navyLight, borderRadius: 12, padding: 14, color: COLORS.white, fontSize: 13, minHeight: 110, resize: "none", boxSizing: "border-box", outline: "none", fontFamily: "inherit", marginBottom: 14 }} />

            <button onClick={handleSend} disabled={!emailBody.trim() || !emailSubject.trim()} style={{
              width: "100%", padding: 14, borderRadius: 12, border: "none",
              cursor: (emailBody.trim() && emailSubject.trim()) ? "pointer" : "default",
              background: (emailBody.trim() && emailSubject.trim()) ? "linear-gradient(135deg, " + COLORS.gold + ", " + COLORS.goldDim + ")" : COLORS.navyLight,
              color: (emailBody.trim() && emailSubject.trim()) ? COLORS.navy : COLORS.muted,
              fontWeight: "800", fontSize: 15,
            }}>Send Email ✉️</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Screens ──────────────────────────────────────────────────────────────────

// SPLASH / LOGIN
const LoginScreen = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1800);
  };

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: `radial-gradient(ellipse at 50% 0%, ${COLORS.navyLight} 0%, ${COLORS.navy} 70%)`,
      padding: "40px 28px", gap: 0,
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{
          marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img src={JAG_LOGO} alt="JAG Logo" style={{
            height: 72, width: "auto", objectFit: "contain",
            filter: "drop-shadow(0 4px 24px rgba(244,168,0,0.25))",
          }} />
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>Mobile Platform</div>
      </div>

      {/* Card */}
      <div style={{
        width: "100%", background: COLORS.surface, borderRadius: 20,
        padding: 28, border: `1px solid ${COLORS.navyLight}`,
        boxShadow: `0 24px 80px ${COLORS.navy}88`,
      }}>
        <div style={{ fontSize: 18, fontWeight: "700", color: COLORS.white, marginBottom: 6 }}>Welcome back</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 24 }}>Sign in with your JAGForce credentials</div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Email</label>
          <div style={{
            background: COLORS.navy, border: `1px solid ${COLORS.navyLight}`, borderRadius: 10,
            padding: "12px 16px", color: COLORS.offWhite, fontSize: 14,
          }}>specialist@jagprogram.org</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Password</label>
          <div style={{
            background: COLORS.navy, border: `1px solid ${COLORS.navyLight}`, borderRadius: 10,
            padding: "12px 16px", color: COLORS.muted, fontSize: 14,
          }}>••••••••••</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div onClick={() => setBiometric(!biometric)} style={{
            width: 42, height: 24, borderRadius: 12,
            background: biometric ? COLORS.teal : COLORS.navyLight,
            position: "relative", cursor: "pointer", transition: "background 0.2s",
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: 9, background: COLORS.white,
              position: "absolute", top: 3, left: biometric ? 21 : 3, transition: "left 0.2s",
            }} />
          </div>
          <span style={{ fontSize: 12, color: COLORS.muted }}>Enable Face ID / Biometric</span>
        </div>

        <button onClick={handleLogin} style={{
          width: "100%", padding: "15px", borderRadius: 12,
          background: loading ? COLORS.navyLight : `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDim})`,
          border: "none", color: loading ? COLORS.muted : COLORS.navy,
          fontWeight: "800", fontSize: 15, cursor: "pointer",
          letterSpacing: "0.02em", transition: "all 0.2s",
          fontFamily: "'DM Mono', monospace",
        }}>
          {loading ? "Authenticating via JAGForce…" : "Sign In"}
        </button>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: COLORS.muted }}>
          🔒 Secured by JAGForce · Powered by Salesforce
        </div>
      </div>
    </div>
  );
};

// HOME DASHBOARD
const HomeScreen = ({ navigate }) => {
  const overdueTasks = TASKS.filter(t => t.due === "Today" && !t.done);
  return (
    <div style={{ padding: "20px 16px", overflowY: "auto", height: "100%", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <img src={JAG_LOGO} alt="JAG Logo" style={{
            height: 36, width: "auto", objectFit: "contain",
            filter: "drop-shadow(0 2px 8px rgba(244,168,0,0.2))",
          }} />
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: COLORS.teal, fontFamily: "'DM Mono', monospace" }}>MON · JUL 14</div>
            <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>Good morning</div>
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: "900", color: COLORS.white, letterSpacing: "-0.02em" }}>Welcome, Sarah</div>
        <div style={{ fontSize: 13, color: COLORS.muted }}>JAG Specialist · Lincoln High School</div>
      </div>

      {/* Alert Banner */}
      <div style={{
        background: `${COLORS.orange}18`, border: `1px solid ${COLORS.orange}44`,
        borderRadius: 12, padding: "12px 16px", marginBottom: 20,
        display: "flex", alignItems: "center", gap: 12,
        borderLeft: `4px solid ${COLORS.orange}`,
      }}>
        <span style={{ fontSize: 20 }}>⚠️</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: "700", color: COLORS.orange }}>Devon Williams needs attention</div>
          <div style={{ fontSize: 12, color: COLORS.muted }}>No contact in 5 days · At-risk status</div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <StatCard label="Active" value="18" sub="participants" accent={COLORS.teal} />
        <StatCard label="Due Today" value={overdueTasks.length} sub="follow-ups" accent={COLORS.gold} />
        <StatCard label="Events" value="2" sub="scheduled" accent={COLORS.green} />
      </div>

      {/* Quick Actions */}
      <SectionHeader title="Quick Actions" />
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <QuickAction icon="🔍" label="Search" onClick={() => navigate("participants")} accent={COLORS.teal} />
        <QuickAction icon="📝" label="Log Service" onClick={() => navigate("addservice")} accent={COLORS.gold} />
        <QuickAction icon="💬" label="Add Note" onClick={() => navigate("addnote")} accent={COLORS.green} />
        <QuickAction icon="✅" label="Check In" onClick={() => navigate("events")} accent={COLORS.orange} />
        <QuickAction icon="📞" label="Follow-Up" onClick={() => navigate("followup")} accent={COLORS.teal} />
      </div>

      {/* Today's Events */}
      <SectionHeader title="Today's Events" action="See All" onAction={() => navigate("events")} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {EVENTS.filter(e => e.date === "Today").map(ev => (
          <div key={ev.id} onClick={() => navigate("eventdetail", ev)} style={{
            background: COLORS.card, borderRadius: 12, padding: "14px 16px",
            border: `1px solid ${COLORS.navyLight}`, cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.teal}
            onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.navyLight}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: "600", color: COLORS.white }}>{ev.title}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 3 }}>{ev.time} · {ev.location}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: "800", color: COLORS.teal, fontFamily: "'DM Mono', monospace" }}>{ev.checked}/{ev.participants}</div>
              <div style={{ fontSize: 10, color: COLORS.muted }}>checked in</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <SectionHeader title="Due Today" action="All Tasks" onAction={() => navigate("tasks")} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {TASKS.filter(t => t.due === "Today" && !t.done).map(task => (
          <div key={task.id} style={{
            background: COLORS.card, borderRadius: 10, padding: "12px 14px",
            border: `1px solid ${COLORS.navyLight}`, display: "flex", alignItems: "center", gap: 12,
          }}>
            <PriorityDot priority={task.priority} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: "600", color: COLORS.white }}>{task.title}</div>
              {task.participant && <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>re: {task.participant}</div>}
            </div>
            <Badge label={task.priority} color={task.priority === "high" ? COLORS.red : COLORS.orange} small />
          </div>
        ))}
      </div>
    </div>
  );
};

// PARTICIPANT LIST
const ParticipantsScreen = ({ navigate }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = PARTICIPANTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "risk" && p.risk === "high") || (filter === "active" && p.status === "Active");
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white, marginBottom: 16, letterSpacing: "-0.02em" }}>Participants</div>
        {/* Search */}
        <div style={{
          background: COLORS.card, borderRadius: 10, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 10, border: `1px solid ${COLORS.navyLight}`,
          marginBottom: 12,
        }}>
          <span style={{ color: COLORS.muted }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search participants…"
            style={{ background: "none", border: "none", color: COLORS.white, fontSize: 14, flex: 1, outline: "none" }} />
        </div>
        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["all", "active", "risk"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
              background: filter === f ? COLORS.gold : COLORS.card,
              color: filter === f ? COLORS.navy : COLORS.muted,
              fontSize: 12, fontWeight: "600", textTransform: "capitalize",
              fontFamily: "'DM Mono', monospace",
            }}>{f === "risk" ? "At Risk" : f === "all" ? "All" : "Active"}</button>
          ))}
          <div style={{ marginLeft: "auto", fontSize: 12, color: COLORS.muted, lineHeight: "30px" }}>{filtered.length} shown</div>
        </div>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 16px" }}>
        {filtered.map(p => (
          <div key={p.id} onClick={() => navigate("participantdetail", p)} style={{
            background: COLORS.card, borderRadius: 12, padding: "14px 16px", marginBottom: 10,
            border: `1px solid ${p.risk === "high" ? COLORS.red + "44" : COLORS.navyLight}`,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
            transition: "border-color 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.teal}
            onMouseLeave={e => e.currentTarget.style.borderColor = p.risk === "high" ? COLORS.red + "44" : COLORS.navyLight}
          >
            <Avatar initials={p.avatar} size={46} risk={p.risk} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: "700", color: COLORS.white }}>{p.name}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>Grade {p.grade} · {p.program}</div>
              <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>Last contact: {p.lastContact}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Badge label={p.status} color={p.status === "Active" ? COLORS.green : p.status === "At Risk" ? COLORS.red : COLORS.muted} small />
              {p.tasks > 0 && <div style={{ fontSize: 11, color: COLORS.orange, marginTop: 6 }}>{p.tasks} tasks</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PARTICIPANT DETAIL
const ParticipantDetailScreen = ({ participant: p, navigate }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showContact, setShowContact] = useState(false);
  const tabs = ["overview", "services", "notes"];

  const serviceHistory = [
    { date: "Jul 10", type: "Career Counseling", note: "Discussed summer internship options" },
    { date: "Jul 5", type: "Academic Support", note: "Math tutoring referral submitted" },
    { date: "Jun 28", type: "Follow-Up Contact", note: "Check-in call — no answer" },
  ];

  const goals = [
    { title: "Complete resume by Aug 1", done: true },
    { title: "Apply to 3 internships", done: false },
    { title: "Attend career fair", done: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 16px 0", background: COLORS.navyMid }}>
        <BackBtn onClick={() => navigate("participants")} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16, marginBottom: 16 }}>
          <Avatar initials={p.avatar} size={58} risk={p.risk} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: "800", color: COLORS.white }}>{p.name}</div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>Grade {p.grade} · {p.program}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <Badge label={p.status} color={p.status === "Active" ? COLORS.green : p.status === "At Risk" ? COLORS.red : COLORS.muted} small />
              <Badge label={`${p.risk} risk`} color={p.risk === "low" ? COLORS.green : p.risk === "medium" ? COLORS.orange : COLORS.red} small />
            </div>
          </div>
          <button onClick={() => setShowContact(true)} style={{
            background: "linear-gradient(135deg, " + COLORS.teal + ", " + COLORS.tealDim + ")",
            border: "none", borderRadius: 10, padding: "9px 14px",
            color: COLORS.navy, fontSize: 12, fontWeight: "700", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>📲</span><span>Contact</span>
          </button>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.navyLight}` }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              flex: 1, padding: "10px 0", background: "none", border: "none",
              color: activeTab === t ? COLORS.teal : COLORS.muted,
              fontSize: 13, fontWeight: activeTab === t ? "700" : "500",
              cursor: "pointer", textTransform: "capitalize",
              borderBottom: activeTab === t ? `2px solid ${COLORS.teal}` : "2px solid transparent",
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ overflowY: "auto", flex: 1, padding: 16 }}>
        {activeTab === "overview" && (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <StatCard label="Goals" value={p.goals} accent={COLORS.teal} />
              <StatCard label="Open Tasks" value={p.tasks} accent={p.tasks > 0 ? COLORS.orange : COLORS.green} />
              <StatCard label="Services" value={serviceHistory.length} accent={COLORS.gold} />
            </div>
            <SectionHeader title="Goals" />
            {goals.map((g, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", background: COLORS.card, borderRadius: 10, marginBottom: 8,
                border: `1px solid ${COLORS.navyLight}`,
              }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${g.done ? COLORS.green : COLORS.muted}`, background: g.done ? COLORS.green : "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {g.done && <span style={{ fontSize: 12, color: COLORS.navy }}>✓</span>}
                </div>
                <span style={{ fontSize: 13, color: g.done ? COLORS.muted : COLORS.white, textDecoration: g.done ? "line-through" : "none" }}>{g.title}</span>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <SectionHeader title="JAG Hub" />
              <div style={{ background: COLORS.card, borderRadius: 12, padding: "14px 16px", border: `1px solid ${COLORS.navyLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: "600", color: COLORS.white }}>JAG Hub Account</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>Headrush integration</div>
                  </div>
                  <Badge label="Activated" color={COLORS.green} small />
                </div>
                <div style={{ marginTop: 12, height: 1, background: COLORS.navyLight }} />
                <div style={{ marginTop: 12, fontSize: 12, color: COLORS.muted }}>Last sync: 3 hours ago · 4 resources assigned</div>
              </div>
            </div>
          </>
        )}
        {activeTab === "services" && (
          <>
            <button onClick={() => navigate("addservice")} style={{
              width: "100%", padding: "13px", borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDim})`,
              border: "none", color: COLORS.navy, fontWeight: "700", fontSize: 14,
              cursor: "pointer", marginBottom: 16,
            }}>+ Log New Service</button>
            {serviceHistory.map((s, i) => (
              <div key={i} style={{ background: COLORS.card, borderRadius: 10, padding: "14px", marginBottom: 10, border: `1px solid ${COLORS.navyLight}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <Badge label={s.type} color={COLORS.teal} small />
                  <span style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Mono', monospace" }}>{s.date}</span>
                </div>
                <div style={{ fontSize: 13, color: COLORS.offWhite }}>{s.note}</div>
              </div>
            ))}
          </>
        )}
        {activeTab === "notes" && (
          <>
            <button onClick={() => navigate("addnote")} style={{
              width: "100%", padding: "13px", borderRadius: 12,
              background: COLORS.card, border: `1px solid ${COLORS.teal}`,
              color: COLORS.teal, fontWeight: "700", fontSize: 14, cursor: "pointer", marginBottom: 16,
            }}>+ Add Case Note</button>
            <div style={{ background: COLORS.card, borderRadius: 10, padding: 14, border: `1px solid ${COLORS.navyLight}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'DM Mono', monospace" }}>Jul 11, 2025</span>
                <span style={{ fontSize: 12, color: COLORS.muted }}>Sarah K.</span>
              </div>
              <div style={{ fontSize: 13, color: COLORS.offWhite, lineHeight: 1.5 }}>
                Met with student during lunch. Expressed interest in healthcare career. Will connect with local hospital's job shadow program. Follow-up scheduled for next week.
              </div>
            </div>
          </>
        )}
      </div>
      {showContact && <ContactModal participant={p} onClose={() => setShowContact(false)} />}
    </div>
  );
};

// ADD SERVICE
const AddServiceScreen = ({ navigate }) => {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => navigate("participants"), 1200); };

  if (saved) return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.green + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>✓</div>
      <div style={{ fontSize: 18, fontWeight: "700", color: COLORS.white }}>Service Logged</div>
      <div style={{ fontSize: 13, color: COLORS.muted }}>Syncing to JAGForce…</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0" }}>
        <BackBtn onClick={() => navigate("home")} />
        <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white, marginTop: 16, marginBottom: 4 }}>Log Service</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>Record a participant interaction</div>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 16px" }}>
        <SectionHeader title="Participant" />
        <div style={{ background: COLORS.card, borderRadius: 12, padding: "14px 16px", border: `1px solid ${COLORS.navyLight}`, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar initials="AT" size={38} />
          <div>
            <div style={{ fontSize: 14, fontWeight: "600", color: COLORS.white }}>Aaliyah Torres</div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>Grade 12 · Career Development</div>
          </div>
          <button style={{ marginLeft: "auto", background: "none", border: `1px solid ${COLORS.navyLight}`, borderRadius: 8, padding: "6px 12px", color: COLORS.teal, fontSize: 12, cursor: "pointer" }}>Change</button>
        </div>

        <SectionHeader title="Service Type" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {SERVICES.map(s => (
            <button key={s.type} onClick={() => setSelected(s.type)} style={{
              background: selected === s.type ? COLORS.gold + "22" : COLORS.card,
              border: `1px solid ${selected === s.type ? COLORS.gold : COLORS.navyLight}`,
              borderRadius: 12, padding: "14px 12px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <span style={{ fontSize: 12, color: selected === s.type ? COLORS.gold : COLORS.offWhite, fontWeight: "600", textAlign: "left", lineHeight: 1.3 }}>{s.type}</span>
            </button>
          ))}
        </div>

        <SectionHeader title="Date & Time" />
        <div style={{ background: COLORS.card, borderRadius: 12, padding: "14px 16px", border: `1px solid ${COLORS.navyLight}`, marginBottom: 20, fontSize: 14, color: COLORS.white }}>
          📅 July 14, 2025 &nbsp;·&nbsp; 🕐 10:30 AM
        </div>

        <SectionHeader title="Note (optional)" />
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add details about this service delivery…"
          style={{
            width: "100%", background: COLORS.card, border: `1px solid ${COLORS.navyLight}`,
            borderRadius: 12, padding: 14, color: COLORS.white, fontSize: 13, lineHeight: 1.5,
            minHeight: 90, resize: "none", boxSizing: "border-box", outline: "none",
            fontFamily: "inherit", marginBottom: 20,
          }} />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigate("home")} style={{
            flex: 1, padding: 14, borderRadius: 12, background: COLORS.card,
            border: `1px solid ${COLORS.navyLight}`, color: COLORS.muted, fontSize: 14, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={save} disabled={!selected} style={{
            flex: 2, padding: 14, borderRadius: 12,
            background: selected ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDim})` : COLORS.navyLight,
            border: "none", color: selected ? COLORS.navy : COLORS.muted,
            fontWeight: "800", fontSize: 15, cursor: selected ? "pointer" : "default",
          }}>Save to JAGForce</button>
        </div>
      </div>
    </div>
  );
};

// ADD NOTE
const AddNoteScreen = ({ navigate }) => {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => navigate("home"), 1200); };

  if (saved) return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.teal + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>💬</div>
      <div style={{ fontSize: 18, fontWeight: "700", color: COLORS.white }}>Note Saved</div>
      <div style={{ fontSize: 13, color: COLORS.muted }}>Added to case record</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0" }}>
        <BackBtn onClick={() => navigate("home")} />
        <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white, marginTop: 16, marginBottom: 4 }}>Add Case Note</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>Document participant interaction</div>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 16px" }}>
        <SectionHeader title="Participant" />
        <div style={{ background: COLORS.card, borderRadius: 12, padding: "14px 16px", border: `1px solid ${COLORS.navyLight}`, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {PARTICIPANTS.slice(0, 3).map(p => (
              <button key={p.id} style={{ background: COLORS.navyLight, border: `1px solid ${COLORS.navyLight}`, borderRadius: 8, padding: "8px 12px", color: COLORS.offWhite, fontSize: 12, cursor: "pointer" }}>{p.name.split(" ")[0]}</button>
            ))}
          </div>
        </div>
        <SectionHeader title="Note" />
        <div style={{ position: "relative" }}>
          <textarea value={note} onChange={e => setNote(e.target.value)}
            placeholder="What happened during this interaction? Include key discussion points, participant response, and any follow-up needed…"
            style={{
              width: "100%", background: COLORS.card, border: `1px solid ${COLORS.navyLight}`,
              borderRadius: 12, padding: 14, color: COLORS.white, fontSize: 13, lineHeight: 1.6,
              minHeight: 180, resize: "none", boxSizing: "border-box", outline: "none",
              fontFamily: "inherit", marginBottom: 8,
            }} />
          <div style={{ fontSize: 11, color: COLORS.muted, textAlign: "right", marginBottom: 16 }}>{note.length} characters</div>
        </div>
        <SectionHeader title="Quick Templates" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {["Check-in call", "In-person meeting", "No contact", "Goal review", "Resource referral"].map(t => (
            <button key={t} onClick={() => setNote(t + ": ")} style={{
              background: COLORS.navy, border: `1px solid ${COLORS.navyLight}`, borderRadius: 20,
              padding: "6px 14px", color: COLORS.muted, fontSize: 12, cursor: "pointer",
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigate("home")} style={{ flex: 1, padding: 14, borderRadius: 12, background: COLORS.card, border: `1px solid ${COLORS.navyLight}`, color: COLORS.muted, fontSize: 14, cursor: "pointer" }}>Cancel</button>
          <button onClick={save} disabled={!note.trim()} style={{ flex: 2, padding: 14, borderRadius: 12, background: note.trim() ? COLORS.teal : COLORS.navyLight, border: "none", color: note.trim() ? COLORS.navy : COLORS.muted, fontWeight: "800", fontSize: 15, cursor: note.trim() ? "pointer" : "default" }}>Save Note</button>
        </div>
      </div>
    </div>
  );
};

// EVENTS / CHECK-IN
const EventsScreen = ({ navigate }) => {
  const [checkedIn, setCheckedIn] = useState({});

  const toggle = (pid) => setCheckedIn(prev => ({ ...prev, [pid]: !prev[pid] }));

  const roster = PARTICIPANTS.slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white, marginBottom: 4 }}>Events & Check-In</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16 }}>Manage attendance and rosters</div>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 16px" }}>
        {EVENTS.map(ev => (
          <div key={ev.id} style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.navyLight}`, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${COLORS.navyLight}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: "700", color: COLORS.white }}>{ev.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>{ev.date} · {ev.time} · {ev.location}</div>
                </div>
                <Badge label={ev.date} color={ev.date === "Today" ? COLORS.green : COLORS.muted} small />
              </div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 4, background: COLORS.navyLight, borderRadius: 2 }}>
                  <div style={{ width: `${(ev.checked / ev.participants) * 100}%`, height: "100%", background: COLORS.teal, borderRadius: 2, transition: "width 0.3s" }} />
                </div>
                <span style={{ fontSize: 12, color: COLORS.teal, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>{ev.checked}/{ev.participants}</span>
              </div>
            </div>
            {ev.date === "Today" && (
              <div style={{ padding: "12px 16px" }}>
                <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Quick Check-In</div>
                {roster.slice(0, 3).map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <Avatar initials={p.avatar} size={32} />
                    <span style={{ flex: 1, fontSize: 13, color: COLORS.offWhite }}>{p.name}</span>
                    <button onClick={() => toggle(p.id)} style={{
                      padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                      background: checkedIn[p.id] ? COLORS.green : COLORS.navyLight,
                      color: checkedIn[p.id] ? COLORS.navy : COLORS.muted,
                      fontSize: 12, fontWeight: "700", transition: "all 0.15s",
                    }}>{checkedIn[p.id] ? "✓ In" : "Check In"}</button>
                  </div>
                ))}
                <button style={{ width: "100%", marginTop: 8, padding: "10px", borderRadius: 10, background: "none", border: `1px dashed ${COLORS.navyLight}`, color: COLORS.muted, fontSize: 12, cursor: "pointer" }}>📷 Scan QR Code</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// TASKS
const TasksScreen = ({ navigate }) => {
  const [tasks, setTasks] = useState(TASKS);
  const toggle = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const open = tasks.filter(t => !t.done);
  const done = tasks.filter(t => t.done);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white, marginBottom: 4 }}>Tasks</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>{open.length} open · {done.length} completed</div>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 16px" }}>
        <SectionHeader title={`Open (${open.length})`} />
        {open.map(t => (
          <div key={t.id} onClick={() => toggle(t.id)} style={{
            background: COLORS.card, borderRadius: 12, padding: "14px 16px", marginBottom: 10,
            border: `1px solid ${t.due === "Today" && t.priority === "high" ? COLORS.red + "44" : COLORS.navyLight}`,
            cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 14,
            transition: "all 0.15s",
          }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${COLORS.navyLight}`, marginTop: 1, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: "600", color: COLORS.white }}>{t.title}</div>
              {t.participant && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>re: {t.participant}</div>}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <Badge label={t.due} color={t.due === "Today" ? COLORS.orange : COLORS.muted} small />
                <PriorityDot priority={t.priority} />
                <span style={{ fontSize: 11, color: COLORS.muted, textTransform: "capitalize" }}>{t.priority}</span>
              </div>
            </div>
          </div>
        ))}

        {done.length > 0 && (
          <>
            <SectionHeader title={`Completed (${done.length})`} />
            {done.map(t => (
              <div key={t.id} onClick={() => toggle(t.id)} style={{
                background: COLORS.navy, borderRadius: 12, padding: "12px 16px", marginBottom: 8,
                border: `1px solid ${COLORS.navyLight}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, opacity: 0.7,
              }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: COLORS.green, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, color: COLORS.navy }}>✓</span>
                </div>
                <div style={{ fontSize: 13, color: COLORS.muted, textDecoration: "line-through" }}>{t.title}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// NOTIFICATIONS
const NotificationsScreen = () => {
  const notifs = [
    { id: 1, type: "alert", icon: "⚠️", title: "At-Risk Alert", body: "Devon Williams has not been contacted in 5 days", time: "2h ago" },
    { id: 2, type: "task", icon: "📋", title: "Task Due Today", body: "Submit Q3 outcome report before 5 PM", time: "3h ago" },
    { id: 3, type: "event", icon: "📅", title: "Event Reminder", body: "Resume Review Session starts in 30 minutes", time: "30m ago" },
    { id: 4, type: "sync", icon: "🔄", title: "JAGForce Sync Complete", body: "18 participant records updated successfully", time: "1h ago" },
    { id: 5, type: "message", icon: "💬", title: "New Message", body: "District Manager commented on your Q2 report", time: "Yesterday" },
  ];

  const typeColors = { alert: COLORS.red, task: COLORS.orange, event: COLORS.teal, sync: COLORS.green, message: COLORS.gold };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white, marginBottom: 4 }}>Notifications</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>{notifs.filter(n => ["alert", "task"].includes(n.type)).length} requiring action</div>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 16px" }}>
        {notifs.map(n => (
          <div key={n.id} style={{
            background: COLORS.card, borderRadius: 12, padding: "14px 16px", marginBottom: 10,
            border: `1px solid ${COLORS.navyLight}`,
            borderLeft: `4px solid ${typeColors[n.type]}`,
          }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22 }}>{n.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: "700", color: COLORS.white }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'DM Mono', monospace" }}>{n.time}</div>
                </div>
                <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.4 }}>{n.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// SETTINGS
const SettingsScreen = ({ onLogout }) => {
  const items = [
    { section: "Account", rows: [{ icon: "👤", label: "Profile", sub: "Sarah K. · Specialist" }, { icon: "🏫", label: "Program", sub: "Lincoln High School" }, { icon: "🔐", label: "Security & Biometrics" }] },
    { section: "Sync & Data", rows: [{ icon: "☁️", label: "JAGForce Sync", sub: "Last synced: 1 hour ago" }, { icon: "📥", label: "Offline Cache", sub: "18 records cached" }, { icon: "🔄", label: "JAG Hub Status", sub: "Connected" }] },
    { section: "Notifications", rows: [{ icon: "🔔", label: "Push Notifications" }, { icon: "⏰", label: "Reminder Preferences" }] },
    { section: "Support", rows: [{ icon: "❓", label: "Help & Documentation" }, { icon: "📞", label: "Contact JAGForce Support" }, { icon: "📋", label: "Version 1.0.0 (MVP)" }] },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white, marginBottom: 4 }}>Settings</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>Account & preferences</div>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px" }}>
        {items.map(section => (
          <div key={section.section} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{section.section}</div>
            <div style={{ background: COLORS.card, borderRadius: 14, border: `1px solid ${COLORS.navyLight}`, overflow: "hidden" }}>
              {section.rows.map((row, i) => (
                <div key={row.label} style={{
                  padding: "14px 16px", display: "flex", alignItems: "center", gap: 14,
                  borderBottom: i < section.rows.length - 1 ? `1px solid ${COLORS.navyLight}` : "none",
                  cursor: "pointer",
                }}>
                  <span style={{ fontSize: 18 }}>{row.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: COLORS.white }}>{row.label}</div>
                    {row.sub && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{row.sub}</div>}
                  </div>
                  <span style={{ color: COLORS.muted, fontSize: 16 }}>›</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={onLogout} style={{
          width: "100%", padding: 14, borderRadius: 12, marginBottom: 32,
          background: COLORS.red + "18", border: `1px solid ${COLORS.red}44`,
          color: COLORS.red, fontSize: 14, fontWeight: "700", cursor: "pointer",
        }}>Sign Out</button>
      </div>
    </div>
  );
};

// ─── TAB BAR ─────────────────────────────────────────────────────────────────

// ─── FOLLOW-UP SCREEN ────────────────────────────────────────────────────────
const FollowUpScreen = ({ navigate }) => {
  const [followups, setFollowups] = useState(INITIAL_FOLLOWUPS);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [formParticipant, setFormParticipant] = useState(null);
  const [formMethod, setFormMethod] = useState(null);
  const [formPurpose, setFormPurpose] = useState(null);
  const [formDate, setFormDate] = useState("Today");
  const [formPriority, setFormPriority] = useState("medium");
  const [formNotes, setFormNotes] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [saved, setSaved] = useState(false);

  const resetForm = () => {
    setFormParticipant(null); setFormMethod(null); setFormPurpose(null);
    setFormDate("Today"); setFormPriority("medium"); setFormNotes("");
    setFormStep(1); setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    const newFU = {
      id: followups.length + 1,
      participant: formParticipant.name,
      avatar: formParticipant.avatar,
      method: formMethod.id,
      purpose: formPurpose,
      dueDate: formDate,
      priority: formPriority,
      status: "pending",
      notes: formNotes,
    };
    setTimeout(() => {
      setFollowups(prev => [newFU, ...prev]);
      setShowForm(false); resetForm();
    }, 1200);
  };

  const markComplete = (id) => setFollowups(prev => prev.map(f => f.id === id ? { ...f, status: f.status === "completed" ? "pending" : "completed" } : f));
  const methodMeta = (id) => FOLLOWUP_METHODS.find(m => m.id === id) || {};
  const priorityColor = { high: COLORS.red, medium: COLORS.orange, low: COLORS.muted };
  const dateColor = (d) => d === "Today" ? COLORS.red : d === "Tomorrow" ? COLORS.orange : COLORS.muted;
  const filtered = followups.filter(f => f.status === filterStatus);

  if (showForm) {
    if (saved) return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.teal + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>📞</div>
        <div style={{ fontSize: 18, fontWeight: "700", color: COLORS.white }}>Follow-Up Scheduled</div>
        <div style={{ fontSize: 13, color: COLORS.muted }}>Saved to JAGForce · Reminder set</div>
      </div>
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ padding: "16px 16px 0", background: COLORS.navyMid, borderBottom: "1px solid " + COLORS.navyLight, flexShrink: 0 }}>
          <button onClick={() => { setShowForm(false); resetForm(); }} style={{ background: "none", border: "none", color: COLORS.teal, fontSize: 13, cursor: "pointer", padding: 0 }}>← Cancel</button>
          <div style={{ fontSize: 18, fontWeight: "800", color: COLORS.white, marginTop: 12, marginBottom: 8 }}>Schedule Follow-Up</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ height: 4, flex: 1, borderRadius: 2, background: formStep >= s ? COLORS.gold : COLORS.navyLight, transition: "background 0.2s" }} />
            ))}
          </div>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: 16 }}>
          {formStep === 1 && (
            <>
              <div style={{ fontSize: 15, fontWeight: "700", color: COLORS.white, marginBottom: 4 }}>Who needs follow-up?</div>
              <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16 }}>Select a participant from your roster</div>
              {PARTICIPANTS.map(p => (
                <div key={p.id} onClick={() => setFormParticipant(p)} style={{
                  background: formParticipant && formParticipant.id === p.id ? COLORS.gold + "18" : COLORS.card,
                  border: "1px solid " + (formParticipant && formParticipant.id === p.id ? COLORS.gold : COLORS.navyLight),
                  borderRadius: 12, padding: "12px 16px", marginBottom: 10,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 14, transition: "all 0.15s",
                }}>
                  <Avatar initials={p.avatar} size={40} risk={p.risk} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: "600", color: COLORS.white }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>Grade {p.grade} · Last contact: {p.lastContact}</div>
                  </div>
                  {formParticipant && formParticipant.id === p.id && <span style={{ color: COLORS.gold, fontSize: 18 }}>✓</span>}
                </div>
              ))}
              <button onClick={() => formParticipant && setFormStep(2)} style={{
                width: "100%", padding: 14, marginTop: 8, borderRadius: 12, border: "none",
                background: formParticipant ? "linear-gradient(135deg, " + COLORS.gold + ", " + COLORS.goldDim + ")" : COLORS.navyLight,
                color: formParticipant ? COLORS.navy : COLORS.muted, fontWeight: "800", fontSize: 15, cursor: formParticipant ? "pointer" : "default",
              }}>Next: Contact Method →</button>
            </>
          )}
          {formStep === 2 && (
            <>
              <div style={{ fontSize: 15, fontWeight: "700", color: COLORS.white, marginBottom: 4 }}>How will you reach out?</div>
              <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16 }}>Select contact method and purpose</div>
              <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Contact Method</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {FOLLOWUP_METHODS.map(m => (
                  <button key={m.id} onClick={() => setFormMethod(m)} style={{
                    background: formMethod && formMethod.id === m.id ? COLORS.teal + "22" : COLORS.card,
                    border: "1px solid " + (formMethod && formMethod.id === m.id ? COLORS.teal : COLORS.navyLight),
                    borderRadius: 12, padding: "14px 12px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s",
                  }}>
                    <span style={{ fontSize: 22 }}>{m.icon}</span>
                    <span style={{ fontSize: 13, color: formMethod && formMethod.id === m.id ? COLORS.teal : COLORS.offWhite, fontWeight: "600" }}>{m.label}</span>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Purpose</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {FOLLOWUP_PURPOSES.map(p => (
                  <button key={p} onClick={() => setFormPurpose(p)} style={{
                    padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                    background: formPurpose === p ? COLORS.gold : COLORS.navyLight,
                    color: formPurpose === p ? COLORS.navy : COLORS.muted,
                    fontSize: 12, fontWeight: "600", transition: "all 0.15s",
                  }}>{p}</button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Due Date</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["Today", "Tomorrow", "This week", "Next week"].map(d => (
                  <button key={d} onClick={() => setFormDate(d)} style={{
                    flex: 1, padding: "8px 4px", borderRadius: 10,
                    border: "1px solid " + (formDate === d ? COLORS.gold : COLORS.navyLight),
                    background: formDate === d ? COLORS.gold + "22" : COLORS.card,
                    color: formDate === d ? COLORS.gold : COLORS.muted,
                    fontSize: 11, fontWeight: "600", cursor: "pointer",
                  }}>{d}</button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Priority</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["high", "medium", "low"].map(pr => (
                  <button key={pr} onClick={() => setFormPriority(pr)} style={{
                    flex: 1, padding: "10px", borderRadius: 10,
                    border: "1px solid " + (formPriority === pr ? priorityColor[pr] : COLORS.navyLight),
                    background: formPriority === pr ? priorityColor[pr] + "22" : COLORS.card,
                    color: formPriority === pr ? priorityColor[pr] : COLORS.muted,
                    fontSize: 13, fontWeight: "700", cursor: "pointer", textTransform: "capitalize",
                  }}>{pr}</button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Notes (optional)</div>
              <textarea value={formNotes} onChange={e => setFormNotes(e.target.value)} placeholder="Context for this follow-up…"
                style={{ width: "100%", background: COLORS.card, border: "1px solid " + COLORS.navyLight, borderRadius: 12, padding: 14, color: COLORS.white, fontSize: 13, minHeight: 80, resize: "none", boxSizing: "border-box", outline: "none", fontFamily: "inherit", marginBottom: 20 }} />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setFormStep(1)} style={{ flex: 1, padding: 14, borderRadius: 12, background: COLORS.card, border: "1px solid " + COLORS.navyLight, color: COLORS.muted, fontSize: 14, cursor: "pointer" }}>← Back</button>
                <button onClick={() => (formMethod && formPurpose) && setFormStep(3)} style={{
                  flex: 2, padding: 14, borderRadius: 12, border: "none",
                  background: (formMethod && formPurpose) ? "linear-gradient(135deg, " + COLORS.gold + ", " + COLORS.goldDim + ")" : COLORS.navyLight,
                  color: (formMethod && formPurpose) ? COLORS.navy : COLORS.muted,
                  fontWeight: "800", fontSize: 15, cursor: (formMethod && formPurpose) ? "pointer" : "default",
                }}>Review →</button>
              </div>
            </>
          )}
          {formStep === 3 && (
            <>
              <div style={{ fontSize: 15, fontWeight: "700", color: COLORS.white, marginBottom: 16 }}>Review & Confirm</div>
              <div style={{ background: COLORS.card, borderRadius: 14, border: "1px solid " + COLORS.navyLight, overflow: "hidden", marginBottom: 20 }}>
                {[
                  { label: "Participant", value: formParticipant ? formParticipant.name : "" },
                  { label: "Method", value: formMethod ? (methodMeta(formMethod.id).icon + " " + formMethod.label) : "" },
                  { label: "Purpose", value: formPurpose },
                  { label: "Due Date", value: formDate },
                  { label: "Priority", value: formPriority ? (formPriority.charAt(0).toUpperCase() + formPriority.slice(1)) : "" },
                  formNotes ? { label: "Notes", value: formNotes } : null,
                ].filter(Boolean).map((row, i, arr) => (
                  <div key={row.label} style={{ padding: "14px 16px", display: "flex", gap: 16, borderBottom: i < arr.length - 1 ? "1px solid " + COLORS.navyLight : "none" }}>
                    <div style={{ fontSize: 13, color: COLORS.muted, width: 80, flexShrink: 0 }}>{row.label}</div>
                    <div style={{ fontSize: 13, color: COLORS.white, fontWeight: "600" }}>{row.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: COLORS.gold + "14", border: "1px solid " + COLORS.gold + "33", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 12, color: COLORS.gold }}>
                🔔 A push reminder will be sent 1 hour before the due date
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setFormStep(2)} style={{ flex: 1, padding: 14, borderRadius: 12, background: COLORS.card, border: "1px solid " + COLORS.navyLight, color: COLORS.muted, fontSize: 14, cursor: "pointer" }}>← Edit</button>
                <button onClick={handleSave} style={{
                  flex: 2, padding: 14, borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg, " + COLORS.gold + ", " + COLORS.goldDim + ")",
                  color: COLORS.navy, fontWeight: "800", fontSize: 15, cursor: "pointer",
                }}>Save Follow-Up</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white }}>Follow-Ups</div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}>{followups.filter(f => f.status === "pending").length} pending · {followups.filter(f => f.status === "completed").length} done</div>
          </div>
          <button onClick={() => setShowForm(true)} style={{
            background: "linear-gradient(135deg, " + COLORS.gold + ", " + COLORS.goldDim + ")",
            border: "none", borderRadius: 10, padding: "9px 16px",
            color: COLORS.navy, fontWeight: "800", fontSize: 13, cursor: "pointer",
          }}>+ Schedule</button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14, marginBottom: 12 }}>
          {["pending", "completed"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: "7px 18px", borderRadius: 20, border: "none", cursor: "pointer",
              background: filterStatus === s ? COLORS.gold : COLORS.card,
              color: filterStatus === s ? COLORS.navy : COLORS.muted,
              fontSize: 12, fontWeight: "700", textTransform: "capitalize",
              fontFamily: "'DM Mono', monospace",
            }}>{s === "pending" ? "Pending (" + followups.filter(f=>f.status==="pending").length + ")" : "Done (" + followups.filter(f=>f.status==="completed").length + ")"}</button>
          ))}
        </div>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: "0 16px 16px" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: COLORS.muted, fontSize: 14 }}>
            {filterStatus === "completed" ? "No completed follow-ups yet" : "No pending follow-ups 🎉"}
          </div>
        )}
        {filtered.map(f => {
          const m = methodMeta(f.method);
          return (
            <div key={f.id} style={{
              background: COLORS.card, borderRadius: 14, padding: "14px 16px", marginBottom: 12,
              border: "1px solid " + (f.status === "completed" ? COLORS.navyLight : priorityColor[f.priority] + "44"),
              opacity: f.status === "completed" ? 0.7 : 1,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Avatar initials={f.avatar} size={42} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ fontSize: 14, fontWeight: "700", color: f.status === "completed" ? COLORS.muted : COLORS.white, textDecoration: f.status === "completed" ? "line-through" : "none" }}>{f.participant}</div>
                    <span style={{ fontSize: 12, color: dateColor(f.dueDate), fontFamily: "'DM Mono', monospace" }}>{f.dueDate}</span>
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 3 }}>{m.icon} {m.label} · {f.purpose}</div>
                  {f.notes ? <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6, fontStyle: "italic", lineHeight: 1.4 }}>"{f.notes}"</div> : null}
                  <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
                    <PriorityDot priority={f.priority} />
                    <span style={{ fontSize: 11, color: COLORS.muted, textTransform: "capitalize" }}>{f.priority} priority</span>
                    <div style={{ marginLeft: "auto" }}>
                      <button onClick={() => markComplete(f.id)} style={{
                        padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                        background: f.status === "completed" ? COLORS.navyLight : COLORS.green + "22",
                        color: f.status === "completed" ? COLORS.muted : COLORS.green,
                        fontSize: 12, fontWeight: "700", transition: "all 0.15s",
                        border: "1px solid " + (f.status === "completed" ? COLORS.navyLight : COLORS.green + "55"),
                      }}>{f.status === "completed" ? "↩ Reopen" : "✓ Complete"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── COMPETENCY SCREEN ────────────────────────────────────────────────────────
const CompetencyScreen = ({ navigate }) => {
  const allComps = COMPETENCY_DOMAINS.flatMap(d => d.competencies);
  const [selected, setSelected] = useState(() => new Set(["wr1", "wr3", "ps1", "ps2", "ac5", "ct5"]));
  const [activeDomain, setActiveDomain] = useState(null);
  const [participant, setParticipant] = useState(PARTICIPANTS[1]);
  const [saveFlash, setSaveFlash] = useState(false);

  const toggle = (id) => setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const domainProgress = (domain) => {
    const earned = domain.competencies.filter(c => selected.has(c.id)).length;
    return { earned, total: domain.competencies.length, pct: earned / domain.competencies.length };
  };

  const totalEarned = [...selected].length;
  const totalAll = allComps.length;

  const handleSave = () => {
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "16px 16px 0", background: COLORS.navyMid, borderBottom: "1px solid " + COLORS.navyLight, flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: "800", color: COLORS.white, marginBottom: 2 }}>Competencies</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 14 }}>JAG Program Competency Tracking</div>
        <div style={{ background: COLORS.card, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12, border: "1px solid " + COLORS.navyLight }}>
          <Avatar initials={participant.avatar} size={34} risk={participant.risk} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: "700", color: COLORS.white }}>{participant.name}</div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>Grade {participant.grade} · {participant.program}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: "800", color: COLORS.gold, fontFamily: "'DM Mono', monospace" }}>{totalEarned}/{totalAll}</div>
            <div style={{ fontSize: 10, color: COLORS.muted }}>earned</div>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Overall Progress</span>
            <span style={{ fontSize: 11, color: COLORS.gold, fontFamily: "'DM Mono', monospace" }}>{Math.round((totalEarned / totalAll) * 100)}%</span>
          </div>
          <div style={{ height: 6, background: COLORS.navyLight, borderRadius: 3 }}>
            <div style={{ width: (totalEarned / totalAll * 100) + "%", height: "100%", background: "linear-gradient(90deg, " + COLORS.gold + ", " + COLORS.teal + ")", borderRadius: 3, transition: "width 0.3s" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 2 }}>
          {PARTICIPANTS.slice(0, 5).map(p => (
            <button key={p.id} onClick={() => setParticipant(p)} style={{
              flexShrink: 0, padding: "5px 12px", borderRadius: 20, cursor: "pointer",
              background: participant.id === p.id ? COLORS.teal : COLORS.card,
              color: participant.id === p.id ? COLORS.navy : COLORS.muted,
              fontSize: 11, fontWeight: "700",
              border: "1px solid " + (participant.id === p.id ? COLORS.teal : COLORS.navyLight),
            }}>{p.name.split(" ")[0]}</button>
          ))}
        </div>
      </div>

      <div style={{ overflowY: "auto", flex: 1, padding: 16 }}>
        {COMPETENCY_DOMAINS.map(domain => {
          const { earned, total, pct } = domainProgress(domain);
          const isOpen = activeDomain === domain.id;
          return (
            <div key={domain.id} style={{ marginBottom: 12, background: COLORS.card, borderRadius: 14, border: "1px solid " + (isOpen ? domain.color + "66" : COLORS.navyLight), overflow: "hidden", transition: "border-color 0.2s" }}>
              <div onClick={() => setActiveDomain(isOpen ? null : domain.id)} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: domain.color + "22", border: "1px solid " + domain.color + "44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{domain.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: "700", color: COLORS.white }}>{domain.label}</div>
                  <div style={{ marginTop: 6, height: 4, background: COLORS.navyLight, borderRadius: 2 }}>
                    <div style={{ width: (pct * 100) + "%", height: "100%", background: domain.color, borderRadius: 2, transition: "width 0.3s" }} />
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: "800", color: domain.color, fontFamily: "'DM Mono', monospace" }}>{earned}/{total}</div>
                  <div style={{ fontSize: 9, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>earned</div>
                </div>
                <span style={{ color: COLORS.muted, fontSize: 14, transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
              </div>
              {isOpen && (
                <div style={{ borderTop: "1px solid " + COLORS.navyLight, padding: "10px 16px 14px" }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Tap to mark as earned</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {domain.competencies.map(c => {
                      const isEarned = selected.has(c.id);
                      return (
                        <button key={c.id} onClick={() => toggle(c.id)} style={{
                          padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                          background: isEarned ? domain.color + "22" : COLORS.navy,
                          border: "1px solid " + (isEarned ? domain.color + "77" : COLORS.navyLight),
                          display: "flex", alignItems: "center", gap: 8, textAlign: "left", transition: "all 0.15s",
                        }}>
                          <div style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, background: isEarned ? domain.color : "none", border: "2px solid " + (isEarned ? domain.color : COLORS.navyLight), display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {isEarned && <span style={{ fontSize: 11, color: COLORS.navy, fontWeight: "900" }}>✓</span>}
                          </div>
                          <span style={{ fontSize: 12, color: isEarned ? domain.color : COLORS.muted, fontWeight: isEarned ? "700" : "500", lineHeight: 1.3 }}>{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ background: COLORS.card, borderRadius: 14, padding: 16, border: "1px solid " + COLORS.navyLight, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: "700", color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Domain Summary</div>
          {COMPETENCY_DOMAINS.map(d => {
            const { earned, total, pct } = domainProgress(d);
            return (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 16, width: 22, textAlign: "center" }}>{d.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: COLORS.offWhite }}>{d.label}</span>
                    <span style={{ fontSize: 11, color: d.color, fontFamily: "'DM Mono', monospace" }}>{earned}/{total}</span>
                  </div>
                  <div style={{ height: 5, background: COLORS.navyLight, borderRadius: 3 }}>
                    <div style={{ width: (pct * 100) + "%", height: "100%", background: d.color, borderRadius: 3, transition: "width 0.3s" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={handleSave} style={{
          width: "100%", padding: 15, borderRadius: 12, border: "none", cursor: "pointer",
          background: saveFlash ? COLORS.green : "linear-gradient(135deg, " + COLORS.gold + ", " + COLORS.goldDim + ")",
          color: COLORS.navy, fontWeight: "800", fontSize: 15, transition: "background 0.3s", marginBottom: 20,
        }}>{saveFlash ? "✓ Saved to JAGForce!" : "Save " + totalEarned + " Competencies"}</button>
      </div>
    </div>
  );
};

const tabs = [
  { id: "home", icon: "⊞", label: "Home" },
  { id: "participants", icon: "👥", label: "Roster" },
  { id: "followup", icon: "📞", label: "Follow-Up" },
  { id: "competency", icon: "🎓", label: "Skills" },
  { id: "tasks", icon: "✅", label: "Tasks" },
];

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function JAGForceApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("home");
  const [screenData, setScreenData] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  const navigate = (dest, data = null) => {
    setScreen(dest);
    setScreenData(data);
    if (tabs.find(t => t.id === dest)) setActiveTab(dest);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setScreen(tabId);
    setScreenData(null);
  };

  const renderScreen = () => {
    if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;
    switch (screen) {
      case "home": return <HomeScreen navigate={navigate} />;
      case "participants": return <ParticipantsScreen navigate={navigate} />;
      case "participantdetail": return <ParticipantDetailScreen participant={screenData} navigate={navigate} />;
      case "addservice": return <AddServiceScreen navigate={navigate} />;
      case "addnote": return <AddNoteScreen navigate={navigate} />;
      case "events": return <EventsScreen navigate={navigate} />;
      case "tasks": return <TasksScreen navigate={navigate} />;
      case "notifications": return <NotificationsScreen />;
      case "followup": return <FollowUpScreen navigate={navigate} />;
      case "competency": return <CompetencyScreen navigate={navigate} />;
      case "settings": return <SettingsScreen onLogout={() => { setLoggedIn(false); setScreen("home"); }} />;
      default: return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", background: "#060C18",
      fontFamily: "'Outfit', 'DM Sans', sans-serif",
    }}>
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1A3058; border-radius: 2px; }
        textarea::placeholder, input::placeholder { color: #8BA0BC; }
      `}</style>

      {/* Phone Frame */}
      <div style={{
        width: 375, height: 780, borderRadius: 48,
        background: COLORS.navy,
        boxShadow: "0 0 0 8px #1A1A2E, 0 0 0 10px #0A0A1E, 0 60px 120px rgba(0,0,0,0.8)",
        overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
        border: "1px solid #1A3058",
      }}>
        {/* Status Bar */}
        <div style={{
          height: 44, background: COLORS.navyMid, display: "flex",
          alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: "700", color: COLORS.white, fontFamily: "'DM Mono', monospace" }}>9:41</span>
          <div style={{ width: 80, height: 16, background: COLORS.navy, borderRadius: 8 }} />
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: COLORS.white }}>●●●</span>
            <span style={{ fontSize: 13, color: COLORS.white }}>🔋</span>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {renderScreen()}
        </div>

        {/* Tab Bar */}
        {loggedIn && (
          <div style={{
            height: 64, background: COLORS.navyMid, display: "flex",
            borderTop: "1px solid " + COLORS.navyLight, flexShrink: 0,
            paddingBottom: 4,
          }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id && !["participantdetail", "addservice", "addnote", "settings"].includes(screen);
              return (
                <button key={tab.id} onClick={() => handleTabClick(tab.id)} style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", gap: 3, background: "none", border: "none",
                  cursor: "pointer", padding: "6px 2px 0", position: "relative",
                }}>
                  {isActive && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 2, background: COLORS.gold, borderRadius: 1 }} />}
                  <span style={{ fontSize: 18, opacity: isActive ? 1 : 0.45, filter: isActive ? "none" : "grayscale(1)", lineHeight: 1 }}>{tab.icon}</span>
                  <span style={{ fontSize: 9, color: isActive ? COLORS.gold : COLORS.muted, fontWeight: isActive ? "700" : "400", transition: "color 0.15s", letterSpacing: "0.02em" }}>{tab.label}</span>
                </button>
              );
            })}
            <button onClick={() => { setActiveTab(""); setScreen("settings"); setScreenData(null); }} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 3, background: "none", border: "none", cursor: "pointer",
              padding: "6px 2px 0", position: "relative",
            }}>
              {screen === "settings" && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 2, background: COLORS.gold, borderRadius: 1 }} />}
              <span style={{ fontSize: 18, opacity: screen === "settings" ? 1 : 0.45, lineHeight: 1 }}>⚙️</span>
              <span style={{ fontSize: 9, color: screen === "settings" ? COLORS.gold : COLORS.muted, fontWeight: screen === "settings" ? "700" : "400" }}>More</span>
            </button>
          </div>
        )}
      </div>

      {/* Side labels */}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "#334466", fontFamily: "'DM Mono', monospace" }}>JAGForce Mobile · MVP Demo · v1.0</div>
      </div>
    </div>
  );
}
