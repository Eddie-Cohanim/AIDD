export interface Photo {
  src: string;
  alt: string;
  // Intrinsic pixel size, so the photo renders at its own aspect ratio without cropping.
  width: number;
  height: number;
}

export interface DetailPoint {
  heading: string;
  detail: string;
  bullets?: string[];
  subpoints?: DetailPoint[];
  photos?: Photo[];
}

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  bullets: DetailPoint[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  highlights: DetailPoint[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectEntry {
  title: string;
  bullets: DetailPoint[];
}

export interface HackathonEntry {
  role: string;
  event: string;
  year: string;
  description: string;
  postUrl: string;
  photos: Photo[];
}

export interface RecommenderContact {
  email: string;
  phone: string;
  linkedin: string;
}

export interface RecommendationEntry {
  name: string;
  position: string;
  company: string;
  contact: RecommenderContact;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
}

export interface MilitaryEntry {
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
  summary: string;
  about: string[];
  experience: ExperienceEntry[];
  military: MilitaryEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  hackathons: HackathonEntry[];
  skills: SkillGroup[];
  languages: LanguageEntry[];
  hobbies: string[];
  recommendations: RecommendationEntry[];
  contact: ContactInfo;
}

export const profileData: SiteData = {
  name: "Eddie Cohanim",
  tagline: "AI Engineer and SW Developer",
  summary:
    "Building computer vision pipelines at Constrol that turn architectural blueprints into 3D models. B.Sc. in Mathematics and Computer Science from the Technion.",
  about: [
    "AI Engineer and SW Developer at Constrol with a B.Sc. in Mathematics and Computer Science from the Technion. Analytical, self-motivated professional with a sharp problem-solving mindset, excellent communication, and strong interpersonal skills. A fast learner who thrives in collaborative, high-performance environments, dedicated to delivering meaningful impact through innovative AI solutions.",
  ],
  experience: [
    {
      title: "AI Engineer and SW Developer",
      company: "Constrol",
      period: "September 2025 - Present",
      bullets: [
        {
          heading: "Computer vision pipelines",
          detail:
            "Developed and optimized pipeline stages from pre-processing to inference.",
          subpoints: [
            {
              heading: "Room identification",
              detail:
                "Built the production chain that turns an architectural and a structural floor plan into enclosed, typed rooms.",
              subpoints: [
                {
                  heading: "Graph-based room detection",
                  detail:
                    "The pipeline detects both drawings, aligns the architectural plan onto the structural one, and then applies graph theory: walls and openings are defined as edges and their intersections as vertices, and every loop in the graph that contains no smaller loop is identified as a room.",
                },
              ],
            },
            {
              heading: "Tiling for full-sheet inference",
              detail:
                "A full sheet at 400 DPI is orders of magnitude larger than YOLO's native 640 input, so each page is cut into tiles, predicted, and merged back to page level.",
              subpoints: [
                {
                  heading: "Overlapping tiles",
                  detail:
                    "Tiles overlap by 20% so an opening cut by a tile edge still appears whole in the neighboring tile.",
                },
                {
                  heading: "Larger tiles for more context",
                  detail:
                    "Proposed raising the tile and training size from 640 to 1280 after realizing that too much context from the surrounding area was lost at 640. The larger tiles gave the model the context a blueprint needs to be read, improving detection results by about 5%.",
                },
              ],
            },
            {
              heading: "Opening detection models",
              detail:
                "Trained YOLO11 Large models using both polygons and oriented bounding boxes (OBBs) to separate nine opening types on architectural drawings: door, window, sliding door, mamad (safe room) door, mamad window, laundry-niche window, ventilation, opening location, and element mark.",
              subpoints: [
                {
                  heading: "Hyperparameter tuning",
                  detail:
                    "Tuned training for technical drawings to improve results, covering the learning rate, augmentations, image size, optimizers, filtering, and the use of background annotations.",
                },
              ],
            },
            {
              heading: "Datasets and annotation",
              detail:
                "Managed the dataset in both V7 Darwin and Label Studio, while overseeing that annotations were done correctly and accurately to ensure correct training.",
            },
            {
              heading: "Pipeline performance optimization",
              detail:
                "Improved pipeline performance by parallelizing workloads, replacing bottleneck Python routines with inline C extensions, and migrating to GPU-accelerated libraries that fully utilized available hardware.",
            },
          ],
        },
        {
          heading: "Model evaluation against ground truth",
          detail:
            "On my own initiative, built a comparison tool that checks the pipeline's output against the modeler's ground-truth IFC/RVT model. It made the testing phase streamlined and scalable, giving a better improvement curve and fewer bugs reaching production.",
          subpoints: [
            {
              heading: "One-to-one matching",
              detail: "The tool registers the two models and matches walls and openings one to one.",
            },
            {
              heading: "Metrics report",
              detail:
                "The tool reports what matched, what deviates, what the pipeline added, and what it missed as metrics.",
            },
            {
              heading: "Overlay visualization",
              detail:
                "Created a visualization that overlays the two models, making the review process faster and easier.",
            },
          ],
        },
        {
          heading: "MLOps and model serving",
          detail:
            "Built the serving, versioning, and release infrastructure for the detection models behind the batch model-generation app.",
          subpoints: [
            {
              heading: "Serving",
              detail:
                "Models are served by the detection pipeline on Modal by default (an L4 GPU that scales to zero), or on a single GPU VM or GKE when a long-running cluster is needed.",
            },
            {
              heading: "Weight versioning and promotion",
              detail:
                "Weights are versioned in GCS, hot-reloaded without rebuilding the image, and promoted from staging to production with rollback.",
            },
            {
              heading: "Experiment tracking",
              detail:
                "Training runs are logged in Weights & Biases, including resumed runs and per-class metrics.",
            },
          ],
        },
        {
          heading: "Product vertical ownership",
          detail:
            "Owned a key product vertical, working with civil engineers and annotators to align AI constraints with real engineering requirements, and built interactive demos to show its capabilities to stakeholders.",
        },
      ],
    },
  ],
  military: [
    {
      title: "Infantry, IDF Reserves",
      period: "November 2020 - Present",
      description: "Serve as an infantry reservist, including active duty during the war that began on October 7, 2023.",
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
      highlights: [
        {
          heading: "Dean's List - Spring 2024",
          detail: "Awarded for academic excellence and maintaining a high GPA.",
          photos: [
            {
              src: "/certificates/deans-list-spring-2024.jpg",
              alt: "Technion Faculty of Mathematics Dean's List certificate awarded to Eddie Cohanim for the Spring 2023/2024 semester",
              width: 800,
              height: 1130,
            },
          ],
        },
        {
          heading: "Dean's List - Winter 2025",
          detail: "Awarded for academic excellence and maintaining a high GPA.",
          photos: [
            {
              src: "/certificates/deans-list-winter-2025.jpg",
              alt: "Technion Faculty of Mathematics Dean's List certificate awarded to Eddie Cohanim for the Winter 2024/2025 semester",
              width: 800,
              height: 1130,
            },
          ],
        },
        {
          heading: "Graduation",
          detail: "Graduated with a B.Sc. in Mathematics and Computer Science from the Technion.",
          photos: [
            {
              src: "/certificates/graduation-diploma.jpg",
              alt: "Technion Bachelor of Science diploma in Mathematics with Computer Science awarded to Eddie Cohanim in June 2026",
              width: 1200,
              height: 744,
            },
          ],
        },
        {
          heading: "Relevant Coursework",
          detail:
            "AI, Deep Learning, Data Structures, OS, Computer Organization and Programming, Algorithms, and Computer Structure.",
        },
      ],
    },
  ],
  projects: [
    {
      title: "This Website",
      bullets: [
        {
          heading: "Full-stack Next.js build",
          detail:
            "Designed and built this full-stack, single-page website using Next.js 16 (App Router) and TypeScript, hosted on Vercel with continuous deployment from GitHub.",
        },
        {
          heading: "AI chatbot integration",
          detail:
            "Integrated an AI-powered chatbot using the Vercel AI SDK and Anthropic Claude Haiku 4.5 via Vercel AI Gateway, enabling visitors to interactively ask questions about my background and experience.",
        },
        {
          heading: "AI-driven development (AIDD)",
          detail:
            "Used Claude Code throughout the build to architect features, write and review code, run static checks, and manage deployments, extended with MCP servers such as Playwright for in-browser testing. Worked on a feature-branch Git workflow with TypeScript type checking on every push and security audits through custom slash-command skills.",
        },
        {
          heading: "Custom visual effects",
          detail:
            "Designed a blueprint-inspired visual identity: the hero name draws itself as construction lines, an outline, and a 3D extrusion over a drafting grid, alongside a particle canvas with a spring-animated cursor glow and a sliding navigation indicator, all tuned for light and dark themes.",
        },
      ],
    },
    {
      title: "Legit - AI News Credibility Verifier (Technion CS Hackathon Finalist)",
      bullets: [
        {
          heading: "From hackathon finalist to published product",
          detail:
            "Led a team that built a Chrome extension using large language models to scan news articles in real time and flag potential misinformation, reaching the hackathon finals. The team then developed the prototype into a complete product, published on the Chrome Web Store for all major Chromium-based browsers.",
        },
        {
          heading: "Multi-agent analysis",
          detail:
            "Co-built a multi-agent system in which specialized agents analyze each article in parallel.",
          subpoints: [
            {
              heading: "Credibility scoring",
              detail:
                "Six agents (source verification, author credibility, fact-checking, bias detection, writing quality, and headline accuracy) each contribute a weighted score to a final 0-100 credibility rating.",
            },
            {
              heading: "Smart Context Search (SIFT)",
              detail:
                "Search agents look for independent coverage of the article's claims, surfacing supporting and contradicting sources for lateral reading.",
            },
          ],
        },
        {
          heading: "Fuzzy quote highlighting",
          detail:
            "Co-built a feature that uses Levenshtein distance to locate and highlight suspicious claims directly in the article, even when the formatting differs from the quoted text.",
        },
      ],
    },
    {
      title: "Beer and Wine Image Classifier",
      bullets: [
        {
          heading: "Two-stage detection and classification",
          detail:
            "Co-built a two-stage computer vision system classifying beer and wine types from images: a YOLO11 object detection model for bounding-box localization, followed by a custom CNN classifier on the cropped regions.",
          subpoints: [
            {
              heading: "Configurable CNN from scratch",
              detail:
                "Co-implemented the CNN architecture from scratch in PyTorch, with a fully configurable feature extractor (conv layers, batch norm, pooling, activation) and classifier head (fully-connected layers, dropout), all driven by a single config.json file with no hardcoded hyperparameters.",
            },
          ],
        },
        {
          heading: "Data pipeline",
          detail:
            "Built the data pipeline from raw image collection through augmentation during training.",
          subpoints: [
            {
              heading: "End-to-end dataset construction",
              detail:
                "Constructed and curated the dataset end-to-end: collected and organized raw images, wrote a dataset splitting pipeline, and built a preprocessing pipeline with validation reporting to ensure structural integrity before training.",
            },
            {
              heading: "GPU-accelerated augmentation",
              detail:
                "Designed a GPU-accelerated augmentation pipeline using Kornia (random flips, rotations, color jitter, Gaussian blur, perspective distortion, gamma correction) applied inline during training for effective data expansion without storing augmented copies to disk.",
            },
          ],
        },
        {
          heading: "Training and evaluation",
          detail:
            "Tuned the model across tracked experiments and measured it against published results.",
          subpoints: [
            {
              heading: "Hyperparameter research",
              detail:
                "Conducted extensive hyperparameter research across multiple tracked experiment versions, tuning learning rate, weight decay, batch size, channel depth, dropout, pooling type, early stopping patience, and optimizer (Adam, AdamW, SGD).",
            },
            {
              heading: "Benchmarking against published work",
              detail:
                "Researched and benchmarked results against published papers and pretrained models, evaluating per-class precision, recall, F1, and confidence scores.",
            },
          ],
        },
      ],
    },
  ],
  hackathons: [
    {
      role: "Participant - Finalist",
      event: "Technion CS Hackathon",
      year: "2025",
      description:
        "Led a team that built Legit, a Chrome extension that uses large language models to scan news articles in real time and flag potential misinformation, earning a finalist placement among all competing teams.",
      postUrl:
        "https://www.linkedin.com/posts/eddie-cohanim_thrilled-to-have-competed-in-the-technion-ugcPost-7330967386482692096-99N0/",
      photos: [],
    },
    {
      role: "Mentor",
      event: "Technion CS Hackathon",
      year: "2026",
      description:
        "Returned the following year as a mentor, supporting the participating teams throughout the hackathon.",
      postUrl:
        "https://www.linkedin.com/posts/eddie-cohanim_i-had-the-incredible-pleasure-of-participating-ugcPost-7472594355250393088-Kjby/",
      photos: [],
    },
  ],
  languages: [
    { language: "English", level: "Native speaker" },
    { language: "Hebrew", level: "Native speaker" },
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["C", "C++", "Python", "Assembly", "Bash"],
    },
    {
      category: "Cloud and Infrastructure",
      items: ["GCP", "GKE", "Modal"],
    },
    {
      category: "Fields of Knowledge",
      items: [
        "AI",
        "Deep Learning",
        "Data Structures",
        "OS (multi-threading, multi-processing)",
        "Linux",
        "Git",
        "Algorithms",
        "OOP",
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
  recommendations: [
    {
      name: "Dror Lederman",
      position: "Head of AI",
      company: "Constrol",
      contact: {
        email: "TODO",
        phone: "TODO",
        linkedin: "TODO",
      },
    },
  ],
  contact: {
    email: "eddieco19@gmail.com",
    phone: "+972-544742122",
    whatsapp: "972544742122",
    linkedin: "https://www.linkedin.com/in/eddie-cohanim/",
    github: "TODO",
  },
};
