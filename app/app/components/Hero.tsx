import { profileData } from "@/lib/profile";
import { HERO_ID, sectionHref } from "@/lib/sections";
import { isTodo } from "@/lib/todo";
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from "@/lib/styles";

export default function Hero() {
  const { linkedin } = profileData.contact;

  return (
    <section id={HERO_ID} aria-label="Introduction" className="flex min-h-screen flex-col justify-center">
      <div className="mx-auto w-full max-w-3xl px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {profileData.tagline}
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          {profileData.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
          {profileData.summary}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href={sectionHref("experience")} className={BUTTON_PRIMARY}>
            See my experience
          </a>
          <a href={sectionHref("contact")} className={BUTTON_SECONDARY}>
            Get in touch
          </a>
          {!isTodo(linkedin) && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={BUTTON_SECONDARY}>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
