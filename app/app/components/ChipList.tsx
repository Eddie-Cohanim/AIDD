interface ChipListProps {
  items: string[];
}

export default function ChipList({ items }: ChipListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-sunken px-3 py-1 text-sm text-ink-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
