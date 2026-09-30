interface EntryHeaderProps {
  title: string;
  subtitle?: string;
  meta?: string;
}

export default function EntryHeader({ title, subtitle, meta }: EntryHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {meta && (
          <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">{meta}</span>
        )}
      </div>
      {subtitle && <p className="text-sm font-medium text-accent">{subtitle}</p>}
    </div>
  );
}
