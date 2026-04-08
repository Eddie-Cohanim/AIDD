interface SectionPageProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionPage({ title, children }: SectionPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 pb-24">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      {children}
    </div>
  );
}
