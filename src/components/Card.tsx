import type { ICardProps } from "@/types/models";

export const CARD_SURFACE = "rounded-2xl border border-slate-200 bg-white shadow-sm";

export function Card({ title, action, className = "", children }: ICardProps) {
  return (
    <section className={`flex flex-col gap-4 p-5 ${CARD_SURFACE} ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
