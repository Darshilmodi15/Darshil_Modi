export type SocialLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  period: string;
  location?: string;
  type?: string;
  status: "Current" | "Completed";
  summary: string;
  bullets: string[];
  link?: string;
};

export type ProgramEntry = {
  id: string;
  title: string;
  organization: string;
  period: string;
  summary: string;
  status: "Current" | "Completed";
};

export type ProjectStatus =
  | "Featured"
  | "Prototype"
  | "In Development"
  | "Hackathon Build"
  | "Deployed"
  | "Repository Only"
  | "Experiment"
  | "Completed"
  | "Working Prototype"
  | "Submitted"
  | "Results Pending"
  | "Capstone Project";

export type DemoStatus = "working" | "missing" | "repository-only";

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: "AI/ML" | "Full-Stack" | "Hackathon" | "Experiment" | "Developer Tool";
  featured: boolean;
  status: ProjectStatus;
  year: string;
  role: string;
  teamType: "Individual" | "Team" | "Open-source / Organization";
  problem: string;
  solution: string;
  contributions: string[];
  features: string[];
  engineering: string[];
  challenges: string[];
  learnings: string[];
  technologies: string[];
  repositoryUrl: string;
  demoUrl?: string;
  demoStatus: DemoStatus;
  media?: { type: "image" | "video" | "gif" | "placeholder"; src?: string; poster?: string; alt: string; caption: string; };
};

export type Achievement = {
  title: string;
  organization?: string;
  year: string;
  detail: string;
  project?: string;
  credentialUrl?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
  note?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Note = {
  slug: string;
  title: string;
  status: "Notes" | "Draft" | "Coming soon";
  summary: string;
  topics: string[];
};

export const personalInfo = {
  name: "Darshil Modi",
  role: "AI/ML-focused software engineer",
  location: "Ahmedabad, Gujarat, India",
  education: "B.Tech CSE (AI & ML), Adani University",
  graduation: "2029",
  currentFocus: "AI/ML, multi-agent systems, LLM applications, backend systems, and full-stack products",
  tagline: "I enjoy turning ambitious ideas into working products through AI, backend engineering, and thoughtful interfaces.",
  achievementLine: "SIH 25 Final-Round Selection. Tic Tech Toe 26 Finalist",
  currentStatus: "AI Trainer - Business Expert at Handshake AI Fellowship / Software Engineer Intern at The Gap - AI Driven Research / Google Student Ambassador",
  email: "darshilmodi99@gmail.com",
  discord: "darshil1501",
  intro:
    "I am a B.Tech Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning at Adani University. My work sits between applied AI and product engineering: turning ideas into working systems with APIs, databases, AI workflows, and user-facing interfaces.",
  availability:
    "Open to AI/ML internships, software engineering opportunities, hackathons, collaborations, and conversations about intelligent systems.",
  siteUrl: "https://darshilmodi.in"
};

export const resume = {
  label: "View Resume",
  url: "https://drive.google.com/file/d/1Gz1slrLHMM6OcsaCe9ABpPF0edMzsPDk/view?usp=share_link"
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Darshilmodi15", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/darshil-modi15/", external: true }
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "/contact" }
];

export const experience: ExperienceEntry[] = [
  {
    id: "handshake-ai-fellowship",
    organization: "Handshake AI Fellowship",
    role: "AI Trainer - Business Expert",
    period: "July 17, 2026 - Present",
    location: "Remote",
    type: "Fellowship",
    status: "Current",
    summary:
      "Developing and evaluating domain-specific prompts to assess large language model performance in business-related contexts.",
    bullets: [
      "Developed and evaluated domain-specific prompts to assess the performance of large language models (LLMs) in business-related contexts.",
      "Analyzed LLM outputs for accuracy, clarity, and depth in business subfields.",
      "Contributed to improving AI understanding of complex business topics through expert review and feedback.",
      "Conducted independent research to support prompt development and evaluation tasks."
    ]
  },
  {
    id: "the-gap-ai-driven-research",
    organization: "The Gap - AI Driven Research",
    role: "Software Engineer Intern",
    period: "July 2026 - Present",
    location: "Remote / India",
    type: "Internship",
    status: "Current",
    summary:
      "Selected among 10 Software Engineering Interns from 250+ applicants for The Gap, an AI-driven research platform. Currently completing onboarding before beginning cross-functional product engineering work.",
    bullets: [
      "Recently joined and currently completing onboarding before formal engineering delivery begins.",
      "Expected work includes frontend features for dashboards, AI interfaces, reading flows, and the public website.",
      "Expected backend work includes APIs, databases, authentication, scheduled jobs, testing, admin tools, bug triage, and QA.",
      "Expected AI work includes prompt workflows, literature search integrations, relevance filtering, and deduplication."
    ]
  },
  {
    id: "enginow",
    organization: "Enginow",
    role: "Full Stack Developer Intern",
    period: "June 2026 - July 2026",
    type: "Internship",
    status: "Completed",
    summary:
      "Independently designed, developed, and deployed Eat the Frog as the official project for my Full Stack Developer Internship at Enginow.",
    bullets: [
      "Completed internship from June 8, 2026 to July 6, 2026.",
      "Built Eat the Frog individually as the official internship assignment.",
      "Designed and developed the complete full-stack application and deployed it during the internship.",
      "Project was reviewed and accepted by Enginow.  received an internship certificate, experience letter, and recommendation letter."
    ]
  }
];

export const programs: ProgramEntry[] = [
  {
    id: "google-student-ambassador",
    title: "Google Student Ambassador",
    organization: "Google Student Ambassadors (India)",
    period: "June 2026 - Present",
    status: "Current",
    summary:
      "Selected for the 12-month Google Student Ambassadors India program, focused on student engagement, technology awareness, community participation, and campus initiatives."
  }
];

export const projects: Project[] = [
  {
    slug: "talentai-x",
    title: "TalentAI-X",
    shortDescription:
      "A multi-agent talent intelligence system exploring evidence-based candidate evaluation beyond keyword matching.",
    fullDescription:
      "TalentAI-X was submitted for Tic Tech Toe 26 by a four-member team. We reached the final stage, completed the final presentation, and demonstrated a working multi-agent talent intelligence prototype combining resume processing, skill normalisation, semantic matching, bias-aware evaluation design, and explainable candidate-analysis workflows. The project did not place in the top five.",
    category: "AI/ML",
    featured: true,
    status: "Working Prototype",
    year: "2026",
    role: "Team Lead & Cross-Functional Engineer",
    teamType: "Team",
    problem:
      "Candidate evaluation can become overly dependent on keywords and surface-level resume signals, making it difficult to compare evidence from projects, skills, and context.",
    solution:
      "The project structures candidate evidence, normalizes skills, and uses multi-agent workflows to produce clearer fit insights and review artifacts.",
    contributions: [
      "Led a four-member team through planning, build decisions, delivery, and final presentation.",
      "Contributed across AI workflows, backend APIs, frontend integration, deployment, testing, and demo coordination.",
      "Helped shape resume processing, skill normalization, semantic matching, bias-aware evaluation design, and explainable candidate insights."
    ],
    features: [
      "Resume processing",
      "Skill normalisation",
      "Semantic candidate matching",
      "Structured candidate evidence",
      "Bias-aware evaluation design",
      "Explainability workflows",
      "Candidate and job-matching APIs",
      "Agent orchestration"
    ],
    engineering: [
      "FastAPI service architecture with agent orchestration described in the README",
      "PostgreSQL-oriented structured data and vector-search concepts",
      "Clear separation between parsing, normalization, matching, and review flows"
    ],
    challenges: [
      "Keeping AI-generated judgments explainable and reviewable",
      "Avoiding overclaiming model performance without repeatable public evidence",
      "Designing a workflow that supports human review instead of replacing it"
    ],
    learnings: [
      "AI evaluation systems need evidence, uncertainty, and review paths.",
      "Talent products require careful wording around fairness, accuracy, and compliance."
    ],
    technologies: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "ChromaDB", "Redis", "React"],
    media: { type: "placeholder", alt: "talentai-x project media placeholder", caption: "Project media coming soon." },
    repositoryUrl: "https://github.com/Darshilmodi15/talentai-x",
    demoUrl: "https://talentai-x.vercel.app",
    demoStatus: "working"
  },
  {
    slug: "aimlearn",
    title: "AimLearn",
    shortDescription:
      "A full-stack e-learning platform for course discovery, enrollment, progress, reviews, and learner workflows.",
    fullDescription:
      "AimLearn is a TypeScript monorepo with frontend and backend applications. It demonstrates product engineering across authentication, course discovery, enrollments, learner progress, reviews, recommendations, payment scaffolding, and admin workflows.",
    category: "Full-Stack",
    featured: true,
    status: "Deployed",
    year: "2026",
    role: "Full-stack developer",
    teamType: "Individual",
    problem:
      "Learners need structured ways to discover courses, identify skill gaps, enroll, and track learning progress instead of passively browsing content.",
    solution:
      "AimLearn organizes learning journeys around courses, enrollments, progress states, reviews, recommendations, and admin management.",
    contributions: [
      "Built a TypeScript frontend/backend monorepo.",
      "Implemented course, enrollment, review, recommendation, authentication, and admin flows.",
      "Designed a restrained visual system for the learner experience."
    ],
    features: ["Public course discovery", "Secure authentication", "Enrollment and lesson progress", "Reviews and recommendations", "Admin backoffice"],
    engineering: ["React/Vite frontend", "Express backend", "MongoDB models", "JWT-based authentication", "Test scaffolding"],
    challenges: ["Keeping frontend and backend contracts consistent", "Designing learner and admin workflows in one product"],
    learnings: ["Full-stack products need careful state, auth, and data-model decisions.", "Monorepos make shared product structure easier to reason about."],
    technologies: ["TypeScript", "React", "Vite", "Node.js", "Express", "MongoDB", "JWT"],
    media: { type: "placeholder", alt: "aimlearn project media placeholder", caption: "Project media coming soon." },
    repositoryUrl: "https://github.com/Darshilmodi15/AimLearn",
    demoUrl: "https://aim-learn.vercel.app",
    demoStatus: "working"
  },
  {
    slug: "assetflow",
    title: "AssetFlow",
    shortDescription:
      "A role-based enterprise asset and resource management platform built for the Odoo Hackathon.",
    fullDescription:
      "AssetFlow was submitted by Team Terminal for the Odoo Hackathon Virtual Round on July 12, 2026. It is a role-based enterprise platform for tracking organisational assets, allocations, resource bookings, maintenance workflows, and audit cycles. Results are pending and expected on July 31, 2026.",
    category: "Hackathon",
    featured: true,
    status: "Submitted",
    year: "2026",
    role: "Team Lead & Cross-Functional Engineer",
    teamType: "Team",
    problem:
      "Organizations often track physical assets, allocations, and shared resources through fragmented spreadsheets or manual records.",
    solution:
      "AssetFlow centralizes asset records, allocation workflows, resource booking, maintenance, and audits with role-based access.",
    contributions: [
      "Led Team Terminal through planning, technical direction, implementation coordination, and virtual-round submission.",
      "Contributed across system architecture, backend APIs, PostgreSQL data design, frontend integration, testing, developer productivity, and demo coordination.",
      "Helped shape role-based workflows for assets, allocations, bookings, maintenance, audits, notifications, and operational dashboards."
    ],
    features: ["Role-based access", "Organisation setup", "Asset registration", "Asset allocation", "Double-allocation prevention", "Transfer and return workflows", "Shared-resource booking", "Booking-overlap validation", "Maintenance workflows", "Audit cycles", "Notifications", "PostgreSQL-backed data", "Operational dashboards"],
    engineering: ["FastAPI backend", "PostgreSQL database", "Alembic migrations", "React/Vite frontend", "Seeded demo data"],
    challenges: ["Compressing enterprise workflows into a hackathon timeline", "Balancing demo completeness with maintainable architecture"],
    learnings: ["Hackathon products need narrow scope and clear demo stories.", "Enterprise tools require permissions and auditability from the start."],
    technologies: ["FastAPI", "PostgreSQL", "Alembic", "React", "Vite", "TypeScript"],
    media: { type: "placeholder", alt: "assetflow project media placeholder", caption: "Project media coming soon." },
    repositoryUrl: "https://github.com/Darshilmodi15/odoo-hackathon---AssetFlow",
    demoStatus: "missing"
  },
  {
    slug: "eat-the-frog",
    title: "Eat the Frog",
    shortDescription:
      "A productivity app focused on helping users prioritize and complete their most important work.",
    fullDescription:
      "Eat the Frog was my official Enginow internship assignment. I independently designed, developed, and deployed the complete full-stack productivity platform; it was reviewed and accepted by Enginow upon internship completion.",
    category: "Full-Stack",
    featured: false,
    status: "Completed",
    year: "2026",
    role: "Full-stack developer",
    teamType: "Individual",
    problem: "Task apps can encourage managing lists instead of executing the highest-priority task.",
    solution: "The app organizes tasks, workspaces, priorities, due dates, notifications, settings, and progress around focused execution.",
    contributions: ["Independently designed and developed the full-stack application as the official internship project.", "Implemented authentication, protected user experiences, user-specific data separation, task management, dashboards, notifications, settings, theme support, and responsive UI.", "Deployed frontend, backend, and database infrastructure during the internship; project was reviewed and accepted by Enginow."],
    features: ["User authentication", "Protected user experiences", "Task creation and management", "Priority levels", "Due dates and overdue handling", "Search, filtering, and sorting", "Personal and organisational workspaces", "User-specific data separation", "Dashboard statistics", "Notifications", "User settings", "Responsive interface", "Theme support", "Progressive Web App support"],
    engineering: ["Full-stack application structure", "Deployed frontend, backend, and database infrastructure", "Persistent theme and session patterns", "PWA-oriented user experience"],
    challenges: ["Keeping productivity features focused rather than overly complex"],
    learnings: ["Good productivity software should reduce decision load.", "Auth and state management shape the whole product experience."],
    technologies: ["React", "Node.js", "Express", "JWT", "PWA"],
    media: { type: "placeholder", alt: "eat-the-frog project media placeholder", caption: "Project media coming soon." },
    repositoryUrl: "https://github.com/Darshilmodi15/Eat-the-Frog",
    demoUrl: "https://eat-the-frog-phi.vercel.app",
    demoStatus: "working"
  },
  {
    slug: "careerpilot",
    title: "CareerPilot",
    shortDescription:
      "A job and internship application management system with applicant, HR, and admin workflows.",
    fullDescription:
      "CareerPilot is a full-stack job and internship application management platform. It includes public job pages, application tracking, hiring pipelines, interview scheduling, candidate ratings, internal notes, CSV export, email notifications, and admin analytics.",
    category: "Full-Stack",
    featured: false,
    status: "Completed",
    year: "2026",
    role: "Full-stack developer",
    teamType: "Individual",
    problem: "Applicants and hiring teams need structured ways to track applications, statuses, interviews, and candidate information.",
    solution: "CareerPilot combines candidate-facing tracking with HR/admin workflows in a REST API-backed dashboard.",
    contributions: ["Built React client workflows and Express REST APIs.", "Modeled users, jobs, and applications in MongoDB.", "Implemented auth, resume upload links, hiring statuses, notes, and analytics-oriented UI."],
    features: ["Auth and role-based flows", "Job and application models", "Hiring pipeline statuses", "Interview scheduling", "CSV export"],
    engineering: ["React SPA", "Express REST API", "MongoDB Atlas", "JWT/bcrypt auth", "Cloudinary and email integration scaffolding"],
    challenges: ["Managing separate applicant and admin perspectives", "Designing clean API endpoints for status-heavy workflows"],
    learnings: ["Workflow software depends on strong data modeling.", "Admin UX needs fast scanning and safe status changes."],
    technologies: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Tailwind"],
    repositoryUrl: "https://github.com/Darshilmodi15/CareerPilot",
    demoUrl: "https://career-pilot-orpin.vercel.app",
    demoStatus: "working"
  },
  {
    slug: "agri-sage",
    title: "Agri-Sage",
    shortDescription:
      "A multi-agent agricultural advisory concept for smallholder farming contexts.",
    fullDescription:
      "Agri-Sage is a two-person Kaggle Agents Intensive Capstone prototype concept for smallholder farmers. The repository currently contains documentation and a small demo script, so this portfolio presents the agent design and intended workflows without claiming a complete deployed system.",
    category: "AI/ML",
    featured: true,
    status: "Capstone Project",
    year: "2026",
    role: "Lead Developer & AI Engineer",
    teamType: "Team",
    problem: "Smallholder farmers can face delayed access to agricultural guidance, technical information, and decision support.",
    solution: "The project explores a multi-agent advisory workflow that would structure farmer context and synthesize possible recommendations.",
    contributions: ["Co-developed the capstone concept in a two-person team.", "Led system design for farmer interaction, diagnosis workflows, market-intelligence concepts, and synthesis of recommendations.", "Corrected public presentation to use the correct name Darshil Modi."],
    features: ["Gateway agent design", "Diagnosis workflow concept", "Market intelligence concept", "Recommendation synthesis concept", "Quick demo script"],
    engineering: ["Python demo script", "Gemini integration described in README", "Session and observability concepts documented rather than verified as production features"],
    challenges: ["Avoiding unsupported real-world agricultural claims", "Designing useful context collection before recommendations"],
    learnings: ["AI-for-good products require domain validation and responsible limitations.", "Multi-agent systems need orchestration more than just multiple prompts."],
    technologies: ["Python", "Gemini", "Multi-agent systems", "AI agents"],
    repositoryUrl: "https://github.com/Darshilmodi15/agri-sage-ai-agent1",
    demoStatus: "repository-only"
  },
  {
    slug: "edumentor",
    title: "EduMentor",
    shortDescription:
      "A multi-agent learning companion concept for study plans, explanations, quizzes, and coaching.",
    fullDescription:
      "EduMentor is an individual multi-agent learning-assistant prototype focused on personalised study plans, content processing, guided explanations, quiz generation, learner evaluation, coaching, and progress support. It is not presented as production-grade.",
    category: "AI/ML",
    featured: false,
    status: "Prototype",
    year: "2026",
    role: "Creator & AI Engineer",
    teamType: "Individual",
    problem: "Students often need structure, explanations, practice, and encouragement but may not have consistent access to personalized support.",
    solution: "EduMentor separates learning support into content, tutor, evaluation, and coaching agents.",
    contributions: ["Independently developed the multi-agent learning-assistant concept and workflow.", "Designed specialised responsibilities for content processing, tutoring and explanations, evaluation and quizzes, and coaching/progress support."],
    features: ["Personalised study plans", "Content processing", "Guided explanations", "Quiz generation", "Learner evaluation", "Coaching and progress support"],
    engineering: ["Agent responsibility separation", "Memory and session concepts", "LLM-powered education workflow"],
    challenges: ["Avoiding claims of adaptive intelligence without deeper evaluation", "Making educational AI helpful without replacing teachers"],
    learnings: ["Education AI needs transparent guidance and feedback loops.", "Agent roles help organize complex learning tasks."],
    technologies: ["AI agents", "LLMs", "Python", "Multi-agent systems"],
    repositoryUrl: "https://github.com/Darshilmodi15/EduMentor-Agent",
    demoStatus: "repository-only"
  },
  {
    slug: "cyborg-nexus",
    title: "Cyborg Nexus",
    shortDescription: "A visual interface and interaction-design experiment using modern web animation and 3D tooling.",
    fullDescription:
      "Cyborg Nexus is best presented as a landing-page and interaction experiment. It demonstrates visual design, 3D/web animation, responsive layout, SEO setup, and performance-oriented component loading rather than a complete AI product.",
    category: "Experiment",
    featured: false,
    status: "Experiment",
    year: "2026",
    role: "Frontend and interaction developer",
    teamType: "Individual",
    problem: "Future-interface ideas need polished, performant prototypes before they can be evaluated as products.",
    solution: "The project creates a cyberpunk-style landing page with animations, 3D hero visuals, and responsive sections.",
    contributions: ["Built the landing page structure and animation system.", "Used dynamic loading and reduced-motion considerations described in the repository."],
    features: ["3D hero section", "Framer Motion and GSAP interactions", "Responsive landing page sections", "SEO metadata"],
    engineering: ["Next.js App Router", "React Three Fiber", "Dynamic component loading", "Reduced-motion support"],
    challenges: ["Balancing visual effects with performance", "Avoiding motion that blocks content"],
    learnings: ["Visual experiments still need accessibility and performance discipline.", "3D should support the message, not replace it."],
    technologies: ["Next.js", "React", "TypeScript", "Three.js", "React Three Fiber", "GSAP", "Framer Motion"],
    repositoryUrl: "https://github.com/Darshilmodi15/cyborg-landing",
    demoUrl: "https://cyborg-landing.vercel.app",
    demoStatus: "working"
  },

];

export const achievements: Achievement[] = [
  {
    title: "Smart India Hackathon 2025 - Final-Round Selection",
    year: "2025",
    detail:
      "Led the concept and presentation of LinguaMate under the Student Innovation category. The proposal was selected for the final round, although the team did not proceed to the on-site build stage because of team readiness and coordination issues.",
    project: "LinguaMate"
  },
  {
    title: "Tic Tech Toe 26 - Finalist",
    year: "2026",
    detail:
      "Led a four-member team to the final round of Tic Tech Toe 26, where we presented a working prototype of TalentAI-X, a multi-agent talent intelligence system. The project reached the final stage but did not place in the top five.",
    project: "TalentAI-X"
  },
  {
    title: "Odoo Hackathon Virtual Round - Submitted",
    year: "2026",
    detail:
      "Led Team Terminal in developing AssetFlow for the Odoo Hackathon virtual round. Submitted on July 12, 2026; results pending and expected on July 31, 2026.",
    project: "AssetFlow"
  },
  {
    title: "Tic Tech Toe 26 - Supporting Credential",
    year: "2026",
    detail:
      "Certificate of Participation in Idea Submission (Online) for Tic Tech Toe 26, issued through Unstop. This supports participation documentation; the finalist result remains the primary achievement.",
    project: "TalentAI-X",
    credentialUrl: "https://unstop.com/certificate-preview/ff60578a-0037-4da9-a124-8f794846a6f5"
  }
];

export const certifications: Certification[] = [
  {
    name: "Certificate of Completion: Claude 101",
    issuer: "Anthropic Academy",
    year: "May 2026",
    credentialUrl: "https://verify.skilljar.com/c/863umn6iwvt8",
    note: "Completed Anthropic Academy's 13-lesson, five-module Claude 101 program covering Claude's core capabilities, structured prompting, Projects, Artifacts, Skills, Connectors, research workflows, document analysis, automation, and responsible AI use. Credential ID: 863umn6iwvt8."
  },
  {
    name: "5-Day AI Agents Intensive Course with Google",
    issuer: "Kaggle / Google",
    year: "December 2025",
    credentialUrl: "https://www.kaggle.com/certification/badges/darshilmodi15/105",
    note: "Completed an intensive program focused on AI-agent concepts, tool use, agent workflows, memory, orchestration, and practical generative-AI applications."
  },
  {
    name: "Prompt Engineering for Everyone",
    issuer: "IBM Skills Network",
    year: "December 2025",
    credentialUrl: "https://courses.cognitiveclass.ai/certificates/9393c81867b7454fbe87554bff9fe3e4",
    note: "Completed IBM Skills Network’s course on designing effective prompts, interacting with generative-AI systems, and improving the clarity, structure, and reliability of model responses. Credential ID: 9393c81867b7454fbe87554bff9fe3e4."
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "AI and Machine Learning",
    items: ["Machine learning foundations", "Generative AI", "Multi-agent systems", "LLM applications", "Prompt engineering", "Embeddings and retrieval concepts", "NLP workflows", "Explainability-aware product thinking"]
  },
  {
    title: "Software Engineering",
    items: ["Full-stack development", "REST API design", "Authentication and authorization", "Database modeling", "Application architecture", "Testing and debugging", "Deployment workflows"]
  },
  {
    title: "Programming and Frameworks",
    items: ["TypeScript", "Python", "React", "Next.js", "Node.js", "Express", "FastAPI", "Vite"]
  },
  {
    title: "Databases and Infrastructure",
    items: ["PostgreSQL", "MongoDB", "Supabase", "Redis concepts", "ChromaDB concepts", "Vercel", "Render", "Cloudinary integration"]
  }
];

export const notes: Note[] = [
  {
    slug: "building-multi-agent-systems",
    title: "Lessons from building multi-agent systems",
    status: "Notes",
    summary: "Working notes on where agent separation helps, where it adds complexity, and how to keep AI workflows reviewable.",
    topics: ["Agents", "LLMs", "Evaluation"]
  },
  {
    slug: "resume-keyword-matching",
    title: "Why resume keyword matching is limited",
    status: "Draft",
    summary: "A short reflection from TalentAI-X on evidence, context, skills, and explainability in candidate evaluation.",
    topics: ["Talent intelligence", "Explainability", "Product design"]
  },
  {
    slug: "hackathon-product-building",
    title: "Building products during hackathons",
    status: "Coming soon",
    summary: "Notes on scope, teamwork, demos, and trade-offs from hackathon projects like AssetFlow and TalentAI-X.",
    topics: ["Hackathons", "Leadership", "Product engineering"]
  }
];

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string) {
  const project = getProject(slug);
  if (!project) return [];
  return projects.filter((item) => item.slug !== slug && item.category === project.category).slice(0, 3);
}
