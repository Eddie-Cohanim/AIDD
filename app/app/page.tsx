import Link from "next/link";
import { profileData } from "@/lib/profile";

export default function HomePage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Hello, I am
      </p>
      <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl md:text-8xl">
        {profileData.name}
      </h1>
      <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">{profileData.tagline}</p>
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
