export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  honors: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectEntry {
  title: string;
  bullets: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
}

export interface ArmyEntry {
  title: string;
  period: string;
  description: string;
}

export interface LanguageEntry {
  language: string;
  level: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  about: string[];
  experience: ExperienceEntry[];
  army: ArmyEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  languages: LanguageEntry[];
  hobbies: string[];
  recommendations: string[];
  contact: ContactInfo;
}

export const profileData: SiteData = {
  name: "Eddie Cohanim",
  tagline: "AI Engineer and Data Scientist",
  about: [
    "AI Engineer at Constrol with a B.Sc. in Mathematics and Computer Science from the Technion. Analytical, self-motivated professional with a sharp problem-solving mindset, excellent communication, and strong interpersonal skills. A fast learner who thrives in collaborative, high-performance environments, dedicated to delivering meaningful impact through innovative AI solutions.",
  ],
  experience: [
    {
      title: "AI Engineering & SW Development",
      company: "Constrol",
      period: "September 2025 - Present",
      bullets: [
        "Developed and optimized computer vision pipelines from pre-processing to inference, transforming architectural blueprints into 3D models.",
        "Managed the full data lifecycle, including dataset preparation and technical oversight of annotation platforms, ensuring high-fidelity ground truth for model training.",
        "Built interactive UI demos to showcase product capabilities to stakeholders.",
        "Improved pipeline performance by parallelizing workloads, replacing bottleneck Python routines with inline C extensions, and migrating to GPU-accelerated libraries that fully utilized available hardware.",
        "Acted as the primary owner for a critical product vertical, coordinating closely with civil engineers and annotators to bridge the gap between technical AI constraints and real-world engineering requirements.",
      ],
    },
  ],
  army: [
    {
      title: "Infantry, IDF Reserves",
      period: "November 2020 - Present",
      description: "Prioritized goals and ensured critical outcomes were achieved while serving on the October 7th war.",
    },
    {
      title: "Staff Sergeant, IDF Nahal Brigade",
      period: "March 2018 - November 2020",
      description: "Led over 40 soldiers and managed platoon operations and logistics in high-risk combat environments.",
    },
  ],
  education: [
    {
      degree: "B.Sc. in Mathematics and Computer Science",
      institution: "Technion - Israel Institute of Technology",
      period: "October 2022 - April 2026",
      honors: [
        "Dean's List, Spring 2024 and Winter 2025 - Awarded for academic excellence and maintaining a high GPA.",
        "Courses: AI, Deep Learning, Data Structures, OS, Computer Organization and Programming, Algorithms, and Computer Structure.",
      ],
    },
  ],
  projects: [
    {
      title: "Personal Portfolio Website",
      bullets: [
        "Designed and built a full-stack personal portfolio website using Next.js 16 (App Router) and TypeScript, hosted on Vercel with continuous deployment from GitHub.",
        "Integrated an AI-powered chatbot using the Vercel AI SDK and Anthropic claude-3-haiku via Vercel AI Gateway, enabling visitors to interactively ask questions about my background and experience.",
        "Applied AI-driven development (AIDD) techniques throughout the entire build — using Claude Code as a development assistant to architect features, write and review code, run static checks, and manage deployments.",
        "Implemented a custom particle canvas animation, scroll-zone background cycling, and a parallax slab effect for a dynamic visual experience.",
        "Established a structured Git workflow with dedicated feature branches, automated TypeScript type checking on every push, and security auditing via custom slash-command skills.",
      ],
    },
    {
      title: "Legit - AI News Credibility Verifier (Technion CS Hackathon Finalist)",
      bullets: [
        "Led a team to architect and implement a Chrome extension that used AI and large language models to scan news articles in real time and flag potential misinformation, earning a finalist placement among all competing teams.",
        "Following the hackathon, the team collaborated closely to expand the concept into a fully-featured product, dividing responsibilities and iterating together through every stage of design, implementation, and testing.",
        "Co-built a multi-agent AI analysis system deploying six specialized agents in parallel (source verification, author credibility, fact-checking, bias detection, writing quality, and headline accuracy), each contributing a weighted score to a final 0-100 credibility rating.",
        "Implemented Smart Context Search (SIFT), where agents actively search for independent coverage of the article's claims to surface supporting and contradicting sources for transparent lateral reading.",
        "Developed a fuzzy quote highlighting feature using the Levenshtein Distance algorithm, enabling the extension to locate and highlight suspicious claims directly within the article regardless of formatting differences.",
        "Built the extension on a modular architecture (Chrome Manifest V3, Vanilla JavaScript) with a background service worker acting as an API proxy and caching layer for the Google Gemini API, and Readability.js for clean content extraction.",
        "Published the finished extension to the Chrome Web Store, making it publicly available to users across all major Chromium-based browsers.",
      ],
    },
    {
      title: "Alcohol Type Identification",
      bullets: [
        "Co-built a two-stage computer vision system classifying beer and wine types from images: a YOLO v11 object detection model for bounding-box localization, followed by a custom CNN classifier on the cropped regions.",
        "Co-implemented the CNN architecture from scratch in PyTorch, with a fully configurable feature extractor (conv layers, batch norm, pooling, activation) and classifier head (fully-connected layers, dropout), all driven by a single config.json file with no hardcoded hyperparameters.",
        "Constructed and curated the dataset end-to-end: collected and organized raw images, wrote a dataset splitting pipeline, and built a preprocessing pipeline with validation reporting to ensure structural integrity before training.",
        "Designed a GPU-accelerated augmentation pipeline using Kornia (random flips, rotations, color jitter, Gaussian blur, perspective distortion, gamma correction) applied inline during training for effective data expansion without storing augmented copies to disk.",
        "Conducted extensive hyperparameter research across multiple tracked experiment versions, tuning learning rate, weight decay, batch size, channel depth, dropout, pooling type, early stopping patience, and optimizer (Adam, AdamW, SGD).",
        "Built a visualization pipeline to plot per-epoch training and validation loss/accuracy curves across all experiment versions for direct comparison.",
        "Researched and benchmarked results against published papers and pretrained models, evaluating per-class precision, recall, F1, and confidence scores.",
        "Managed development via GitHub for version control and Jira for task tracking.",
      ],
    },
    {
      title: "Local Server",
      bullets: [
        "Programmed a working server in C capable of running and interacting with multiple threads simultaneously.",
      ],
    },
  ],
  languages: [
    { language: "English", level: "Native speaker" },
    { language: "Hebrew", level: "Native speaker" },
  ],
  skills: [
    {
      category: "Coding Languages",
      items: ["C", "C++", "Python", "Assembly", "Bash"],
    },
    {
      category: "Fields of Knowledge",
      items: [
        "AI",
        "Deep Learning",
        "Data Structures",
        "OS (multi-threading, multi-processing)",
        "Linux",
        "Version Control",
        "Algorithms",
        "OOP",
        "Python Libraries",
      ],
    },
  ],
  hobbies: [
    "Indoor volleyball - plays for Maccabi Haifa",
    "Beach volleyball",
    "Gym",
    "Skiing",
    "Chess",
    "Video games",
    "Trying new foods",
    "Learning new and interesting topics",
    "Exploring the outdoors",
  ],
  recommendations: ["TODO"],
  contact: {
    email: "eddieco19@gmail.com",
    phone: "+972-544742122",
    whatsapp: "972544742122",
    linkedin: "TODO",
    github: "TODO",
  },
};
