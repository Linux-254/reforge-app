import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

interface SlideData {
  title: string;
  category: string;
  subtitle: string;
  points: { title: string; description: string }[];
  highlightBox?: { label: string; text: string };
  metrics?: { label: string; value: string }[];
}

const SLIDES: SlideData[] = [
  {
    title: "ReForge: Holistic Recovery & Sobriety Platform",
    category: "EXECUTIVE BRIEFING & ARCHITECTURE OVERVIEW",
    subtitle: "A modern multi-role ecosystem transforming addiction recovery from a binary counter into a 21-dimension lifestyle architecture.",
    points: [
      {
        title: "Holistic 21-Dimension Model",
        description: "Moving beyond simple day counts to evaluate emotional, relational, physical, cognitive, and spiritual wellbeing simultaneously."
      },
      {
        title: "Multi-Role Collaborative Support",
        description: "Uniting recovering members, family supporters, professional recovery coaches, and system administrators on one secure platform."
      },
      {
        title: "Privacy & Clinical Rigor",
        description: "Zero-knowledge encrypted journaling, structured boundary enforcement engines, and comprehensive clinical supervision audits."
      },
      {
        title: "Interactive Demo Sandbox",
        description: "Instant role switching across Member, Supporter, Coach, and Admin personas without onboarding friction."
      }
    ],
    highlightBox: {
      label: "Platform Mission",
      text: "To provide an evidence-informed, compassionate digital sanctuary that empowers lasting restoration, accountability, and connection."
    }
  },
  {
    title: "The 21 Dimensions of Restorative Recovery",
    category: "CORE CLINICAL FRAMEWORK",
    subtitle: "A multidimensional recovery paradigm recognizing that sustained sobriety requires balance across all facets of human life.",
    points: [
      {
        title: "1. Physical Vitality & Sobriety",
        description: "Active abstinence tracking, nutrition, somatic awareness, sleep hygiene, and medical adherence."
      },
      {
        title: "2. Emotional Regulation & Resilience",
        description: "Trigger identification, emotional vocabulary expansion, distress tolerance, and nervous system regulation."
      },
      {
        title: "3. Relational & Family Boundaries",
        description: "Repairing broken trusts, enforcing healthy relational limits, and establishing non-codependent support systems."
      },
      {
        title: "4. Mindful Presence & Reflection",
        description: "Daily reflective check-ins, prompt-based journaling, and contemplative grounding routines."
      },
      {
        title: "5. Purpose, Spirit & Community",
        description: "Existential meaning, fellowship connection, peer mutual-aid, and service to others."
      }
    ],
    metrics: [
      { label: "Dimensions", value: "21" },
      { label: "Core Categories", value: "6" },
      { label: "Daily Assessment Scale", value: "1 - 10" },
      { label: "Check-in Cadence", value: "Daily / AM / PM" }
    ]
  },
  {
    title: "Multi-Role Persona Architecture",
    category: "SYSTEM ACTORS & ACCESS CONTROL",
    subtitle: "Each persona receives a dedicated, customized operational interface tailored to their specific recovery responsibilities.",
    points: [
      {
        title: "Role 1: Member (Self-Guided Journey)",
        description: "Daily somatic check-in surveys, personal rule engine, situational coping guides, goal roadmaps, and private journals."
      },
      {
        title: "Role 2: Family Supporter (Empathy & Safe Harbor)",
        description: "Paired accountability dashboard, positive affirmation signals, early distress notification, and educational coaching tips."
      },
      {
        title: "Role 3: Recovery Coach / Clinician (Professional Oversight)",
        description: "Multi-client status rosters, compliance alerts, progress trend analysis, and intervention note tracking."
      },
      {
        title: "Role 4: Platform Administrator (Governance & Content)",
        description: "Restorative guide management, preset rule configurations, audit trail logging, and community moderation."
      }
    ],
    highlightBox: {
      label: "Zero-Collision Permissions",
      text: "Role-Based Access Control (RBAC) ensures supporters only see shared summaries while member personal journals remain strictly confidential."
    }
  },
  {
    title: "Member Daily Flow & Behavioral Interventions",
    category: "MEMBER EXPERIENCE & HABIT LOOPS",
    subtitle: "Engineered around high-leverage micro-actions that build compounding psychological resilience every single day.",
    points: [
      {
        title: "1. Morning Check-In & Mood Indexing",
        description: "Rate somatic energy, mental clarity, and urge severity. Generates personalized micro-practices for the day."
      },
      {
        title: "2. Rules & Non-Negotiable Boundaries",
        description: "Custom boundary engine (e.g. 'No late-night trigger calls', 'Daily 20-min nature walk') with tiered severity levels."
      },
      {
        title: "3. Situational Coping Guides & S.O.S. Library",
        description: "Immediate step-by-step de-escalation protocols for sudden triggers, cravings, social pressures, and acute distress."
      },
      {
        title: "4. Multi-Horizon Goal Tracking",
        description: "Milestone management broken down into 7-day sprints, 30-day foundations, and 90-day integration horizons."
      },
      {
        title: "5. Private Mindful Journaling",
        description: "Prompt-driven reflective writing with tag filters and mood correlation analytics."
      }
    ],
    highlightBox: {
      label: "Evidence-Based Design",
      text: "Built on cognitive behavioral therapy (CBT), acceptance & commitment therapy (ACT), and motivational interviewing principles."
    }
  },
  {
    title: "Supporter Care & Family Co-Regulation Portal",
    category: "FAMILY & SUPPORTER INTEGRATION",
    subtitle: "Empowering loved ones to provide constructive support without enabling or violating healthy boundaries.",
    points: [
      {
        title: "Secure Supporter Pairing Mechanism",
        description: "Members generate unique, time-limited invitation tokens to link trusted family members or sponsors."
      },
      {
        title: "Shared Wellness Pulse",
        description: "Supporters view high-level stability indicators and consecutive check-in streaks without invasive diary access."
      },
      {
        title: "Affirmation & Encouragement Feed",
        description: "Send calibrated, non-triggering notes of encouragement directly to the member's morning dashboard."
      },
      {
        title: "Crisis & Risk Signal Escalation",
        description: "Configurable alert triggers if a member reports acute distress or misses sequential safety check-ins."
      }
    ],
    highlightBox: {
      label: "Family Health Principle",
      text: "Recovery happens in connection. ReForge bridges the gap between solitary struggle and healthy family co-regulation."
    }
  },
  {
    title: "Clinical Coach Supervision & Operations",
    category: "CLINICAL & COACHING WORKSPACE",
    subtitle: "A high-density operational cockpit for sober living facilities, outpatient clinics, and private recovery coaches.",
    points: [
      {
        title: "Caseload Status Overview",
        description: "Instant triage view of all active clients with color-coded risk flags, recent check-ins, and engagement scores."
      },
      {
        title: "Longitudinal Trend Visualizations",
        description: "Multi-week radar plots and line charts tracking trajectory across all 21 life dimensions."
      },
      {
        title: "Intervention Protocol & Notes",
        description: "Log private coach observations, session action items, and clinical referrals with timestamped fidelity."
      },
      {
        title: "Automated Cadence Compliance",
        description: "Identify drop-off patterns early before relapse occurs through automated cadence deviation detection."
      }
    ],
    metrics: [
      { label: "Caseload Triage", value: "Real-time" },
      { label: "Trend Windows", value: "7d / 30d / 90d" },
      { label: "Risk Flags", value: "Low / Med / High" },
      { label: "Export Ready", value: "Clinical Summaries" }
    ]
  },
  {
    title: "Technical Architecture & Security Infrastructure",
    category: "ENGINEERING & DATA GOVERNANCE",
    subtitle: "Enterprise-grade stack engineered for exceptional performance, low latency, and uncompromising privacy.",
    points: [
      {
        title: "Full-Stack TypeScript & Vite React",
        description: "Instant UI responsiveness, modular functional components, and strict end-to-end type safety with tRPC."
      },
      {
        title: "Relational Persistence & Schema Migrations",
        description: "PostgreSQL with Drizzle ORM managing normalized schemas for assessments, rules, goals, and pairing tokens."
      },
      {
        title: "Multi-Layered Security Defenses",
        description: "Helmet security headers, strict CORS, CSRF token validation, and IP-rate limiting protecting API endpoints."
      },
      {
        title: "Zero-Hurdle Demo Sandbox",
        description: "Dual-mode persistence engine seamlessly transitioning between guest client storage and authenticated databases."
      },
      {
        title: "Immutable Admin Audit Trails",
        description: "Cryptographically verifiable event logging for all administrative actions, role modifications, and content changes."
      }
    ],
    highlightBox: {
      label: "Privacy First",
      text: "No third-party trackers, no behavioral advertising scripts, and full HIPAA/GDPR alignment in data processing."
    }
  },
  {
    title: "Summary, Impact & Roadmap",
    category: "CONCLUSION & FUTURE HORIZONS",
    subtitle: "ReForge delivers an unmatched technological foundation for the future of digital behavioral health and recovery.",
    points: [
      {
        title: "Key Deliverables Completed",
        description: "21-dimension framework, 5 role portals, responsive mobile bottom navigation, standardized skeleton states, and audit trails."
      },
      {
        title: "Immediate Accessibility",
        description: "Zero white-screen latency, sub-50ms navigation, offline-friendly guest sandbox, and touch-optimized mobile interfaces."
      },
      {
        title: "Upcoming Horizons (Phase 2)",
        description: "Offline Progressive Web App (PWA) sync, wearable biometric integrations (sleep/HRV), and multi-clinic enterprise billing."
      },
      {
        title: "Contact & Partnership",
        description: "Ready for deployment, clinical beta pilots, sober living community deployments, and custom organizational branding."
      }
    ],
    highlightBox: {
      label: "Ready for Launch",
      text: "Engineered with deliberate craftsmanship, robust resilience, and deep human empathy at every touchpoint."
    }
  }
];

function generatePdf() {
  const doc = new PDFDocument({
    size: "LETTER",
    layout: "landscape", // 792 x 612 pt
    margins: { top: 36, bottom: 36, left: 45, right: 45 },
    autoFirstPage: false,
    info: {
      Title: "ReForge Executive Presentation - Platform Architecture & Recovery Ecosystem",
      Author: "ReForge Engineering Team",
      Subject: "Executive Platform Architecture Presentation",
      Keywords: "Recovery, Sobriety, 21 Dimensions, Architecture, Healthcare, Mental Health"
    }
  });

  const targetDirs = [
    path.resolve(process.cwd(), "document"),
    path.resolve(process.cwd(), "docs"),
  ];

  targetDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const primaryPdfPath = path.resolve(process.cwd(), "document/ReForge_Presentation.pdf");
  const secondaryPdfPath = path.resolve(process.cwd(), "document/ReForge_Executive_Presentation.pdf");
  const docsPdfPath = path.resolve(process.cwd(), "docs/ReForge_Presentation.pdf");

  const writeStream = fs.createWriteStream(primaryPdfPath);
  doc.pipe(writeStream);

  const pageWidth = 792;
  const pageHeight = 612;

  SLIDES.forEach((slide, index) => {
    doc.addPage({ size: "LETTER", layout: "landscape" });

    // Background base
    doc.rect(0, 0, pageWidth, pageHeight).fill("#0f172a"); // Deep slate background

    // Subtle header accent banner
    doc.rect(0, 0, pageWidth, 6).fill("#059669"); // Emerald accent top bar

    // Header Content
    // Category pill
    doc.roundedRect(45, 24, 280, 20, 10).fill("#064e3b");
    doc.fontSize(8.5).font("Helvetica-Bold").fillColor("#34d399")
      .text(slide.category, 55, 29, { width: 260, align: "left" });

    // Slide Counter
    doc.fontSize(9).font("Helvetica-Bold").fillColor("#94a3b8")
      .text(`SLIDE ${index + 1} OF ${SLIDES.length}`, pageWidth - 165, 29, { width: 120, align: "right" });

    // Title
    doc.fontSize(22).font("Helvetica-Bold").fillColor("#f8fafc")
      .text(slide.title, 45, 52, { width: 702 });

    // Subtitle
    doc.fontSize(11).font("Helvetica").fillColor("#cbd5e1")
      .text(slide.subtitle, 45, 84, { width: 702 });

    // Divider Line
    doc.moveTo(45, 108).lineTo(pageWidth - 45, 108).strokeColor("#334155").lineWidth(1).stroke();

    // Body Content Area: Left column points, Right column highlight box or metrics
    const hasRightColumn = !!slide.highlightBox || !!slide.metrics;
    const leftWidth = hasRightColumn ? 430 : 690;
    let yPos = 122;

    slide.points.forEach((point, pIdx) => {
      // Point number / bullet badge
      doc.roundedRect(45, yPos, 18, 18, 4).fill("#047857");
      doc.fontSize(9).font("Helvetica-Bold").fillColor("#ffffff")
        .text(`${pIdx + 1}`, 45, yPos + 4, { width: 18, align: "center" });

      // Point title
      doc.fontSize(11).font("Helvetica-Bold").fillColor("#f1f5f9")
        .text(point.title, 72, yPos + 3, { width: leftWidth - 30 });

      // Point description
      doc.fontSize(9.5).font("Helvetica").fillColor("#94a3b8")
        .text(point.description, 72, yPos + 18, { width: leftWidth - 30, lineGap: 2 });

      yPos += 46;
    });

    // Right Column Box
    if (hasRightColumn) {
      const rx = 500;
      const rw = 247;
      let ry = 122;

      if (slide.highlightBox) {
        // Highlight Card
        doc.roundedRect(rx, ry, rw, 130, 8).fill("#1e293b");
        doc.roundedRect(rx, ry, rw, 130, 8).strokeColor("#059669").lineWidth(1.5).stroke();

        doc.fontSize(9).font("Helvetica-Bold").fillColor("#10b981")
          .text(slide.highlightBox.label.toUpperCase(), rx + 16, ry + 16, { width: rw - 32 });

        doc.fontSize(10.5).font("Helvetica-Oblique").fillColor("#e2e8f0")
          .text(`"${slide.highlightBox.text}"`, rx + 16, ry + 36, { width: rw - 32, lineGap: 3 });

        ry += 144;
      }

      if (slide.metrics) {
        // Metrics 2x2 grid
        doc.roundedRect(rx, ry, rw, 170, 8).fill("#1e293b");
        doc.roundedRect(rx, ry, rw, 170, 8).strokeColor("#334155").lineWidth(1).stroke();

        doc.fontSize(9).font("Helvetica-Bold").fillColor("#38bdf8")
          .text("KEY SPECIFICATIONS", rx + 16, ry + 14, { width: rw - 32 });

        const mBoxWidth = (rw - 40) / 2;
        slide.metrics.forEach((m, mIdx) => {
          const col = mIdx % 2;
          const row = Math.floor(mIdx / 2);
          const mx = rx + 14 + col * (mBoxWidth + 12);
          const my = ry + 36 + row * 60;

          doc.roundedRect(mx, my, mBoxWidth, 50, 6).fill("#0f172a");
          doc.fontSize(14).font("Helvetica-Bold").fillColor("#10b981")
            .text(m.value, mx + 6, my + 8, { width: mBoxWidth - 12, align: "center" });
          doc.fontSize(8).font("Helvetica").fillColor("#94a3b8")
            .text(m.label, mx + 4, my + 28, { width: mBoxWidth - 8, align: "center" });
        });
      }
    }

    // Footer
    doc.moveTo(45, pageHeight - 34).lineTo(pageWidth - 45, pageHeight - 34).strokeColor("#1e293b").lineWidth(1).stroke();
    doc.fontSize(8).font("Helvetica").fillColor("#64748b")
      .text("ReForge Holistic Sobriety Platform · Confidential Executive Briefing", 45, pageHeight - 26, { width: 400 });
    doc.fontSize(8).font("Helvetica-Bold").fillColor("#10b981")
      .text("reforge.app", pageWidth - 145, pageHeight - 26, { width: 100, align: "right" });
  });

  doc.end();

  writeStream.on("finish", () => {
    // Copy to secondary paths
    fs.copyFileSync(primaryPdfPath, secondaryPdfPath);
    fs.copyFileSync(primaryPdfPath, docsPdfPath);
    console.log("PDF generated successfully:");
    console.log(`- ${primaryPdfPath} (${fs.statSync(primaryPdfPath).size} bytes)`);
    console.log(`- ${secondaryPdfPath}`);
    console.log(`- ${docsPdfPath}`);
  });
}

generatePdf();
