interface EntryHeaderProps {
  title: string;
  subtitle?: string;
  meta?: string;
}

export default function EntryHeader({ title, subtitle, meta }: EntryHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-2xl font-bold font-stretch-semi-expanded tracking-tight text-ink">{title}</h3>
        {meta && (
          <span className="shrink-0 text-sm tabular-nums text-ink-faint">{meta}</span>
        )}
      </div>
      {subtitle && <p className="mt-1 font-medium text-ink-muted">{subtitle}</p>}
    </div>
  );
}
