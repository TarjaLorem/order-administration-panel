"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from "react";

import type { IOrderModalProps } from "@/types/props";

export function OrderModal({ children, fullPageHref }: IOrderModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const close = () => router.back();

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    close();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) close();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="m-auto max-h-[90vh] w-[min(64rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl bg-slate-50 p-0 shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur">
        <a href={fullPageHref} className="text-sm text-indigo-600 hover:underline">
          Open full page ↗
        </a>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          ✕
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
