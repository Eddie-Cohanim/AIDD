export interface Photo {
  src: string;
  alt: string;
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
  summary: string;
  about: string[];
  experience: ExperienceEntry[];
  army: ArmyEntry[];
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
  tagline: "AI Engineer and Data Scientist",
  summary:
    "Building computer vision pipelines at Constrol that turn architectural blueprints into 3D models. B.Sc. in Mathematics and Computer Science from the Technion.",
  about: [
    "AI Engineer at Constrol with a B.Sc. in Mathematics and Computer Science from the Technion. Analytical, self-motivated professional with a sharp problem-solving mindset, excellent communication, and strong interpersonal skills. A fast learner who thrives in collaborative, high-performance environments, dedicated to delivering meaningful impact through innovative AI solutions.",
  ],
  experience: [
    {
      title: "AI Engineering & SW Development",
      company: "Constrol",
      period: "September 2025 - Present",
      bullets: [
        {
          heading: "Computer vision pipelines",
          detail:
            "Developed and optimized computer vision pipelines from pre-processing to inference, transforming architectural blueprints into 3D models.",
          subpoints: [
            {
              heading: "Room identification",
              detail:
                "Built the production chain that turns an architectural and a structural floor plan into enclosed, typed rooms.",
              bullets: [
                "Both drawings are detected, the architectural plan is docked onto the structural one, and the combined walls are partitioned into rooms.",
                "Room names come from tiled OCR in English and Hebrew and are assigned by zone priority, which also decides the specialized opening when a door serves two rooms.",
                "Treated opening footprints as part of the wall mass. On one measured page, walls alone closed 18 rooms and matched 10 of 41 labels; adding the openings closed 47 rooms and matched 35 of 41.",
              ],
            },
            {
              heading: "Tiling for full-sheet inference",
              detail:
                "A full sheet at 400 DPI is orders of magnitude larger than YOLO's native 640 input, so each page is cut into tiles, predicted, and merged back to page level.",
              bullets: [
                "Tiles overlap by 20% so an opening cut by a tile edge still appears whole in the neighboring tile.",
                "Raising the tile and training size from 640 to 1280 gave the model the surrounding context a blueprint needs to be read, improving detection results by about 5%.",
              ],
            },
          ],
        },
        {
          heading: "Opening detection models",
          detail:
            "Trained YOLO11 Large oriented-box models to separate nine opening types on architectural drawings: door, window, sliding door, mamad (safe room) door, mamad window, laundry-niche window, ventilation, opening location, and element mark.",
          subpoints: [
            {
              heading: "Hyperparameter tuning",
              detail:
                "Tuned training for geometry-sensitive technical drawings, prioritizing fewer false positives.",
              bullets: [
                "Locked training to the tile size so inference does not silently downscale a 1280 tile back to 640.",
                "Settled on SGD with a real learning rate of 0.003 (the automatic setting was ignoring the configured rate and using about 0.01), a longer warmup, and stronger regularization to cut false positives.",
                "Turned mosaic and mixup off because the drawings are geometry-sensitive, capped rotation at 5 degrees after 15 degrees created false junctions, and kept copy-paste low for the same reason.",
                "A score-threshold sweep put the best F1 at 0.25. Separate runs compared Adam, AdamW, and larger tile sizes.",
              ],
            },
          ],
        },
        {
          heading: "Data lifecycle and annotation oversight",
          detail:
            "Managed the full data lifecycle, including dataset preparation and technical oversight of annotation platforms, ensuring high-fidelity ground truth for model training.",
          subpoints: [
            {
              heading: "Opening datasets in V7",
              detail:
                "Managed the opening detection datasets in V7: about 1,140 sheets at 400 DPI, split 70/20/10.",
              bullets: [
                "Kept empty background tiles in proportion to the labeled ones so the model does not hallucinate openings on blank paper.",
              ],
            },
          ],
        },
        {
          heading: "Model evaluation against ground truth",
          detail:
            "Built a comparison tool that checks the pipeline's output against the modeler's ground-truth IFC model, since detection scores on tiles do not show whether the reconstructed building is right.",
          bullets: [
            "Registers the two models and matches walls and openings one to one.",
            "Reports what matched, what deviates, what the pipeline added, and what it missed, as both metrics and a visual overlay.",
            "Later extended with a revision diff through Autodesk (added, removed, and changed elements) and a Revit-to-IFC conversion so either model format can be loaded.",
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
              heading: "Weight versioning and hot reload",
              detail:
                "Weights live in a versioned GCS bucket and are published by generation number.",
              bullets: [
                "A sidecar polls metadata and downloads only when a file changed, and the inference worker hot-reloads.",
                "No image rebuild and no download on the job path.",
              ],
            },
            {
              heading: "Staging-to-production promotion",
              detail:
                "Staging and production buckets are separate, and promotion is one explicit copy of the files named in the model manifest.",
              bullets: [
                "The previous production weights are kept for rollback, so merging a code fix cannot ship an experimental checkpoint.",
                "Each batch is pinned to staging or production so a run cannot drift between environments mid-flight.",
              ],
            },
            {
              heading: "Experiment tracking",
              detail:
                "Training runs are logged in Weights & Biases, including resumed runs and per-class metrics.",
              bullets: [
                "Cluster jobs on GKE with Ray write weights to durable GCS storage instead of treating the pod disk as the record.",
              ],
            },
            {
              heading: "Explorer preview endpoint",
              detail:
                "The app's 2D explorer calls a Modal preview endpoint that uses the same tile size and thresholds as production.",
              bullets: [
                "Caches the default preview and invalidates that cache when the architectural classifier changes (the 6-class cut, then the 9-class cut).",
              ],
            },
          ],
        },
        {
          heading: "Pipeline performance optimization",
          detail:
            "Improved pipeline performance by parallelizing workloads, replacing bottleneck Python routines with inline C extensions, and migrating to GPU-accelerated libraries that fully utilized available hardware.",
        },
        {
          heading: "Interactive stakeholder demos",
          detail:
            "Built interactive UI demos to showcase product capabilities to stakeholders.",
        },
        {
          heading: "Product vertical ownership",
          detail:
            "Acted as the primary owner for a critical product vertical, coordinating closely with civil engineers and annotators to bridge the gap between technical AI constraints and real-world engineering requirements.",
        },
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
      highlights: [
        {
          heading: "Dean's List - Spring 2024",
          detail: "Awarded for academic excellence and maintaining a high GPA.",
          photos: [],
        },
        {
          heading: "Dean's List - Winter 2025",
          detail: "Awarded for academic excellence and maintaining a high GPA.",
          photos: [],
        },
        {
          heading: "Graduation",
          detail: "Graduated with a B.Sc. in Mathematics and Computer Science from the Technion.",
          photos: [],
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
      title: "Personal Portfolio Website",
      bullets: [
        {
          heading: "Full-stack Next.js build",
          detail:
            "Designed and built a full-stack, single-page personal portfolio website using Next.js 16 (App Router) and TypeScript, hosted on Vercel with continuous deployment from GitHub.",
        },
        {
          heading: "AI chatbot integration",
          detail:
            "Integrated an AI-powered chatbot using the Vercel AI SDK and Anthropic claude-3-haiku via Vercel AI Gateway, enabling visitors to interactively ask questions about my background and experience.",
        },
        {
          heading: "AI-driven development (AIDD)",
          detail:
            "Applied AI-driven development (AIDD) techniques throughout the entire build - using Claude Code as a development assistant to architect features, write and review code, run static checks, and manage deployments.",
        },
        {
          heading: "Custom visual effects",
          detail:
            "Implemented a custom particle canvas animation with a cursor-following gradient glow, tuned for both light and dark themes.",
        },
        {
          heading: "Git workflow and automation",
          detail:
            "Established a structured Git workflow with dedicated feature branches, automated TypeScript type checking on every push, and security auditing via custom slash-command skills.",
        },
      ],
    },
    {
      title: "Legit - AI News Credibility Verifier (Technion CS Hackathon Finalist)",
      bullets: [
        {
          heading: "Hackathon finalist extension",
          detail:
            "Led a team to architect and implement a Chrome extension that used AI and large language models to scan news articles in real time and flag potential misinformation, earning a finalist placement among all competing teams.",
        },
        {
          heading: "From hackathon to product",
          detail:
            "Following the hackathon, the team collaborated closely to expand the concept into a fully-featured product, dividing responsibilities and iterating together through every stage of design, implementation, and testing.",
        },
        {
          heading: "Multi-agent credibility scoring",
          detail:
            "Co-built a multi-agent AI analysis system deploying six specialized agents in parallel (source verification, author credibility, fact-checking, bias detection, writing quality, and headline accuracy), each contributing a weighted score to a final 0-100 credibility rating.",
        },
        {
          heading: "Smart Context Search (SIFT)",
          detail:
            "Implemented Smart Context Search (SIFT), where agents actively search for independent coverage of the article's claims to surface supporting and contradicting sources for transparent lateral reading.",
        },
        {
          heading: "Fuzzy quote highlighting",
          detail:
            "Developed a fuzzy quote highlighting feature using the Levenshtein Distance algorithm, enabling the extension to locate and highlight suspicious claims directly within the article regardless of formatting differences.",
        },
        {
          heading: "Modular extension architecture",
          detail:
            "Built the extension on a modular architecture (Chrome Manifest V3, Vanilla JavaScript) with a background service worker acting as an API proxy and caching layer for the Google Gemini API, and Readability.js for clean content extraction.",
        },
        {
          heading: "Chrome Web Store release",
          detail:
            "Published the finished extension to the Chrome Web Store, making it publicly available to users across all major Chromium-based browsers.",
        },
      ],
    },
    {
      title: "Alcohol Type Identification",
      bullets: [
        {
          heading: "Two-stage detection and classification",
          detail:
            "Co-built a two-stage computer vision system classifying beer and wine types from images: a YOLO v11 object detection model for bounding-box localization, followed by a custom CNN classifier on the cropped regions.",
        },
        {
          heading: "Configurable CNN from scratch",
          detail:
            "Co-implemented the CNN architecture from scratch in PyTorch, with a fully configurable feature extractor (conv layers, batch norm, pooling, activation) and classifier head (fully-connected layers, dropout), all driven by a single config.json file with no hardcoded hyperparameters.",
        },
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
        {
          heading: "Hyperparameter research",
          detail:
            "Conducted extensive hyperparameter research across multiple tracked experiment versions, tuning learning rate, weight decay, batch size, channel depth, dropout, pooling type, early stopping patience, and optimizer (Adam, AdamW, SGD).",
        },
        {
          heading: "Training visualization",
          detail:
            "Built a visualization pipeline to plot per-epoch training and validation loss/accuracy curves across all experiment versions for direct comparison.",
        },
        {
          heading: "Benchmarking against published work",
          detail:
            "Researched and benchmarked results against published papers and pretrained models, evaluating per-class precision, recall, F1, and confidence scores.",
        },
        {
          heading: "Project management",
          detail:
            "Managed development via GitHub for version control and Jira for task tracking.",
        },
      ],
    },
    {
      title: "Local Server",
      bullets: [
        {
          heading: "Multi-threaded C server",
          detail:
            "Programmed a working server in C capable of running and interacting with multiple threads simultaneously.",
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
        "Led a team that built Legit, a Chrome extension that uses AI and large language models to scan news articles in real time and flag potential misinformation, earning a finalist placement among all competing teams.",
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
