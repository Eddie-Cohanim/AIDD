import Link from "next/link";
import { profileData } from "@/lib/profile";
import { CONTENT_Z_INDEX } from "@/lib/constants";

const WELCOME_HEADLINE = "Welcome to Eddie's landing page!";

export default function HomePage() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ zIndex: CONTENT_Z_INDEX }}
    >
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
        {WELCOME_HEADLINE}
      </h1>
      <p className="mt-6 text-2xl font-medium text-gray-700 dark:text-gray-200">
        {profileData.name} - {profileData.tagline}
      </p>
      <p className="mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
        Explore my experience, projects, and education, or ask my AI assistant anything about my background.
      </p>
      <div className="mt-10 flex gap-4">
        <Link
          href="/about"
          className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-gray-900 transition-colors hover:bg-gray-700 dark:hover:bg-gray-100"
        >
          Learn more
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
