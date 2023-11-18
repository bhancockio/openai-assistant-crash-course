import { atom } from "jotai";
import { Assistant } from "openai/resources/beta/assistants/assistants.mjs";
import { Thread } from "openai/resources/beta/threads/threads.mjs";

export const assistantAtom = atom<Assistant | null>(null);
export const fileAtom = atom<File | null>(null);
export const threadAtom = atom<Thread | null>(null);
export const runStateAtom = atom<
  | "queued"
  | "in_progress"
  | "requires_action"
  | "cancelling"
  | "cancelled"
  | "failed"
  | "completed"
  | "expired"
  | "N/A"
>("N/A");
