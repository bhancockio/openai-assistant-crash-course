"use client";

import { useEffect } from "react";
import Assistant from "./components/Assistant";
import AssistantFile from "./components/AssistantFile";
import Header from "./components/Header";
import { useAtom } from "jotai";
import {
  assistantAtom,
  fileAtom,
  runStateAtom,
  threadAtom,
  RunState,
  isValidRunState,
  assistantFileAtom,
} from "@/atom";
import Thread from "./components/Thread";
import Run from "./components/Run";
import ChatContainer from "./components/ChatContainer";

export default function Home() {
  // Atom State
  const [, setAssistant] = useAtom(assistantAtom);
  const [, setFile] = useAtom(fileAtom);
  const [, setAssistantFile] = useAtom(assistantFileAtom);
  const [, setThread] = useAtom(threadAtom);
  const [, setRunState] = useAtom(runStateAtom);

  // Load default data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localAssistant = localStorage.getItem("assistant");
      if (localAssistant) {
        setAssistant(JSON.parse(localAssistant));
      }
      const localFile = localStorage.getItem("file");
      if (localFile) {
        setFile(localFile);
      }
      const localAssistantFile = localStorage.getItem("assistantFile");
      if (localAssistantFile) {
        setAssistantFile(localAssistantFile);
      }
      const localThread = localStorage.getItem("thread");
      if (localThread) {
        setThread(JSON.parse(localThread));
      }
      const localRunState = localStorage.getItem("runState");
      if (localRunState && isValidRunState(localRunState)) {
        setRunState(localRunState);
      }
    }
  }, []);

  return (
    <main className="flex flex-col">
      <Header />
      <div className="flex flex-row mt-20 gap-x-10">
        {/* Actions */}
        <div className="flex flex-col w-full">
          <Assistant />
          <AssistantFile />
          <Thread />
          <Run />
        </div>
        {/* Chat */}
        <div className="w-full">
          <ChatContainer />
        </div>
      </div>
    </main>
  );
}
