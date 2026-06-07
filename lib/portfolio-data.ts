export type Mission = {
  number: string;
  title: string;
  slug: string;
  status: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  technologies: string[];
  architecture: string[];
  github: string;
  demo: string;
  flagship?: boolean;
};

export const navItems = [
  { label: "Mission Log", href: "#mission-log" },
  { label: "About", href: "#about" },
  { label: "Missions", href: "#missions" },
  { label: "Research Log", href: "#research-log" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Contact", href: "#contact" }
];

export const profile = {
  name: "Darshil Modi",
  siteName: "Mission Log",
  identity: "A student exploring the future through intelligent systems.",
  headline: "Exploring AI, Space, and the Technology of Tomorrow.",
  supporting:
    "Building intelligent systems while exploring the intersection of AI, human potential, and the future of technology.",
  about:
    "I'm Darshil Modi, a B.Tech student at Adani University interested in artificial intelligence, multi-agent systems, and emerging technologies. My projects focus on solving practical problems in education, agriculture, and talent intelligence through AI-driven systems. Beyond technology, I'm fascinated by space exploration and the engineering challenges that shape humanity's future. Currently serving as a Google Student Ambassador (2026-2027).",
  signal: "National-level hackathon finalist."
};

export const missions: Mission[] = [
  {
    number: "Mission 01",
    title: "TalentAI-X",
    slug: "talentai-x",
    status: "Flagship Mission",
    summary:
      "An AI talent intelligence system for reading stronger signals from skills, projects, and candidate evidence.",
    overview:
      "TalentAI-X is the flagship mission: a system designed to make talent discovery more evidence-driven by combining profile intelligence, project context, and AI-assisted evaluation.",
    problem:
      "Talent evaluation often collapses people into keywords, resumes, and surface-level filters. That makes it easy to miss practical ability and difficult to compare candidates fairly.",
    solution:
      "TalentAI-X treats projects, skills, and context as signals. The system structures those signals, evaluates them through intelligent workflows, and presents clearer fit insights for decision makers.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "AI Agents",
      "Supabase",
      "OpenAI/Gemini"
    ],
    architecture: [
      "Profile Intake",
      "Signal Extraction",
      "Agent Evaluation",
      "Fit Scoring",
      "Decision Dashboard"
    ],
    github: "https://github.com/Darshilmodi15/talentai-x",
    demo: "https://talentai-x.vercel.app",
    flagship: true
  },
  {
    number: "Mission 02",
    title: "Agri-Sage",
    slug: "agri-sage",
    status: "Applied AI",
    summary:
      "An agriculture-focused assistant for practical crop, field, and advisory workflows.",
    overview:
      "Agri-Sage explores how AI can support agriculture decisions with contextual recommendations and clearer access to field knowledge.",
    problem:
      "Farmers and field operators often need timely guidance, but useful information can be scattered, technical, or hard to apply in local conditions.",
    solution:
      "The mission focuses on turning agricultural inputs into structured guidance, helping users reason through crops, risks, and next actions.",
    technologies: ["AI", "React", "TypeScript", "Supabase", "OpenAI/Gemini"],
    architecture: [
      "Field Context",
      "Knowledge Layer",
      "Reasoning Flow",
      "Recommendation",
      "Action Log"
    ],
    github: "https://github.com/Darshilmodi15/agri-sage-ai-agent1",
    demo: "#"
  },
  {
    number: "Mission 03",
    title: "EduMentor",
    slug: "edumentor",
    status: "Learning Systems",
    summary:
      "A learning companion concept for personalized guidance, study paths, and student support.",
    overview:
      "EduMentor is focused on education workflows where students need direction, structure, and feedback that adapts to their progress.",
    problem:
      "Students often know they need to improve, but not what to study next, how to prioritize, or how to convert feedback into a learning plan.",
    solution:
      "EduMentor organizes learning goals, recommends next steps, and supports students with AI-driven mentoring loops.",
    technologies: ["Next.js", "React", "TypeScript", "AI", "Supabase"],
    architecture: [
      "Student Goal",
      "Assessment",
      "Learning Path",
      "Mentor Loop",
      "Progress Review"
    ],
    github: "https://github.com/Darshilmodi15/EduMentor-Agent ",
    demo: "#"
  },
  {
    number: "Mission 04",
    title: "Cyborg Nexus",
    slug: "cyborg-nexus",
    status: "Future Tech",
    summary:
      "A future-facing exploration of human-computer interaction and intelligent augmentation.",
    overview:
      "Cyborg Nexus is a concept mission around the future of augmentation, interfaces, and systems that extend human capability.",
    problem:
      "As intelligent tools become more capable, the hard question is how to design systems that amplify human intent instead of adding friction.",
    solution:
      "The mission studies interface ideas, automation flows, and AI-assisted workflows that keep humans in control.",
    technologies: ["Three.js", "React", "TypeScript", "AI", "GSAP"],
    architecture: [
      "Human Intent",
      "Interface Layer",
      "AI Mediation",
      "System Action",
      "Feedback"
    ],
    github: "https://github.com/Darshilmodi15/cyborg-landing ",
    demo: "https://github.com/https://cyborg-landing.vercel.app"
  }
];

export const toolkit = [
  {
    group: "Intelligent Systems",
    items: ["AI applications", "Multi-agent workflows", "Prompt systems", "Evaluation loops"]
  },
  {
    group: "Product Engineering",
    items: ["Next.js", "React", "TypeScript", "Supabase"]
  },
  {
    group: "Experience",
    items: ["Three.js", "React Three Fiber", "Framer Motion", "GSAP"]
  },
  {
    group: "Deployment",
    items: ["Vercel", "NextAuth", "OpenAI/Gemini", "Analytics-ready architecture"]
  }
];

export const certificationTimeline = [
  {
    date: "2026-2027",
    title: "Google Student Ambassador",
    detail: "Campus leadership and technology community role."
  },
  {
    date: "National Level",
    title: "Hackathon Finalist",
    detail: "Recognized for competitive project building and problem solving."
  }
];

export const assistantQuestions = [
  {
    question: "Who is Darshil?",
    answer:
      "Darshil Modi is a B.Tech student at Adani University exploring artificial intelligence, multi-agent systems, emerging technologies, and space exploration. He is currently serving as a Google Student Ambassador for 2026-2027 and is a national-level hackathon finalist."
  },
  {
    question: "Tell me about TalentAI-X.",
    answer:
      "TalentAI-X is the flagship mission. It is an AI talent intelligence system designed to evaluate stronger evidence from skills, projects, and candidate context instead of relying only on keyword-heavy profiles."
  },
  {
    question: "What are you currently learning?",
    answer:
      "The current focus is intelligent systems: AI applications, multi-agent workflows, software architecture, evaluation loops, and future-facing interfaces built with modern web technology."
  },
  {
    question: "Show certifications.",
    answer:
      "The current evidence timeline includes Google Student Ambassador for 2026-2027 and national-level hackathon finalist recognition. More certification entries can be added as they are finalized."
  },
  {
    question: "How can I contact you?",
    answer:
      "Use the contact form on this portfolio or connect through the project links once the GitHub and demo URLs are added to each mission."
  }
];
