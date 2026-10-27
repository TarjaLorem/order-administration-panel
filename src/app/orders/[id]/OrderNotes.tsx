"use client";

import { useOptimistic, useState, useTransition } from "react";

import { Card } from "@/components/Card";
import { formatDateTime } from "@/lib/format";
import type { IOrderNote, IOrderNotesProps } from "@/types/models";

import { addOrderNote } from "../actions";

const MAX_LENGTH = 500;

type DisplayNote = IOrderNote & { pending?: boolean };

export function OrderNotes({ orderId, notes }: IOrderNotesProps) {
  const [optimisticNotes, addOptimisticNote] = useOptimistic<DisplayNote[], DisplayNote>(notes, (state, note) => [
    ...state,
    note,
  ]);
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const trimmed = text.trim();
  const canSubmit = trimmed.length > 0 && trimmed.length <= MAX_LENGTH && !isPending;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    const draft = trimmed;
    setError(null);
    setText("");

    startTransition(async () => {
      addOptimisticNote({ id: `temp-${Date.now()}`, text: draft, createdAt: new Date().toISOString(), pending: true });
      const result = await addOrderNote(orderId, draft);
      if (!result.ok) {
        setError(result.error);
        setText(draft);
      }
    });
  };

  return (
    <Card title="Notes">
      {optimisticNotes.length === 0 ? (
        <p className="text-sm text-slate-500">No notes yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {optimisticNotes.map((note) => (
            <li
              key={note.id}
              className={`flex flex-col gap-1 rounded-xl bg-slate-50 p-3 ${note.pending ? "opacity-60" : ""}`}
            >
              <p className="text-sm whitespace-pre-wrap">{note.text}</p>
              <span className="text-xs text-slate-400">
                {note.pending ? "Saving…" : formatDateTime(note.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={submit} className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_LENGTH}
          rows={3}
          placeholder="Add a note…"
          className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {trimmed.length}/{MAX_LENGTH}
          </span>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add note
          </button>
        </div>
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>
    </Card>
  );
}
