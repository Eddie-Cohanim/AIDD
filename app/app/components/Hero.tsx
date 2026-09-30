import BlueprintName from "./BlueprintName";
import { profileData } from "@/lib/profile";
import { HERO_ID, sectionHref } from "@/lib/sections";
import { isTodo } from "@/lib/todo";
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from "@/lib/styles";

export default function Hero() {
  const { linkedin } = profileData.contact;

  return (
    <section
      id={HERO_ID}
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div className="relative mx-auto w-full max-w-4xl px-6">
        <h1>
          <span className="sr-only">{profileData.name}</span>
          <BlueprintName name={profileData.name} />
        </h1>
        <p className="mt-10 text-xl font-semibold font-stretch-semi-expanded text-ink sm:text-3xl">
          {profileData.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
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
