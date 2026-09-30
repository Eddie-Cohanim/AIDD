import type { NextConfig } from "next";

// Routes from the former multi-page layout, mapped to their section on the single page.
const LEGACY_ROUTE_SECTIONS: Record<string, string> = {
  about: "about",
  experience: "experience",
  projects: "projects",
  education: "education",
  skills: "skills",
  hackathons: "hackathons",
  army: "army",
  recommendations: "recommendations",
  contact: "contact",
  hobbies: "about",
  languages: "about",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(LEGACY_ROUTE_SECTIONS).map(([route, sectionId]) => ({
      source: `/${route}`,
      destination: `/#${sectionId}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
