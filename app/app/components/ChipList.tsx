interface ChipListProps {
  items: string[];
}

export default function ChipList({ items }: ChipListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
