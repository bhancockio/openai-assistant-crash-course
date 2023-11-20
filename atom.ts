import { atom } from "jotai";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages.mjs";
import { Run } from "openai/resources/beta/threads/runs/runs.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";

export const assistantAtom = atom<Assistant | null>(null);
export const fileAtom = atom<string | null>(null);
export const assistantFileAtom = atom<string | null>(null);
export const threadAtom = atom<Thread | null>(null);
export const runAtom = atom<Run | null>(null);
export const messagesAtom = atom<ThreadMessage[]>([]);

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
