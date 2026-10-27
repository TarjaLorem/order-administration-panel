import type { ReactNode } from "react";

export interface ICardProps {
  title?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}
