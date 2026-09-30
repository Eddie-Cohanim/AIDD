export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto flex max-w-4xl items-center gap-4 px-6">
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-accent/80" />
      <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-accent/80" />
    </div>
  );
}
