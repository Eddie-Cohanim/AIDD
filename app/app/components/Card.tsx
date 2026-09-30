import { CARD_SURFACE } from "@/lib/styles";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <div className={`${CARD_SURFACE} p-6`}>{children}</div>;
}
