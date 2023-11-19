import { atom } from "jotai";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";

export const assistantAtom = atom<Assistant | null>(null);
export const fileAtom = atom<string | null>(null);
export const assistantFileAtom = atom<string | null>(null);
export const threadAtom = atom<Thread | null>(null);

export type RunState =
  | "queued"
  | "in_progress"
  | "requires_action"
  | "cancelling"
  | "cancelled"
  | "failed"
  | "completed"
  | "expired"
  | "N/A";

export const runStateAtom = atom<RunState>("N/A");

export const isValidRunState = (
  value: RunState | string
): value is RunState => {
  const validStates: RunState[] = [
    "queued",
    "in_progress",
    "requires_action",
    "cancelling",
    "cancelled",
    "failed",
    "completed",
    "expired",
    "N/A",
  ];

  return validStates.includes(value as RunState);
};
