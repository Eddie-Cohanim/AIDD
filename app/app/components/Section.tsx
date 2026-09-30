import type { SectionId } from "@/lib/sections";

interface SectionProps {
  id: SectionId;
  title: string;
  children: React.ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-20 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2
          id={headingId}
          className="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
