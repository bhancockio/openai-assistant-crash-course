"use client";

import {
  assistantAtom,
  fileAtom,
  threadAtom,
  runStateAtom,
  assistantFileAtom,
} from "@/atom";
import { useAtom } from "jotai";
import React from "react";

function Header() {
  const [assistant] = useAtom(assistantAtom);
  const [file] = useAtom(fileAtom);
  const [assistantFile] = useAtom(assistantFileAtom);
  const [thread] = useAtom(threadAtom);
  const [runState] = useAtom(runStateAtom);

  return (
    <div className="flex flex-row justify-between text-xl font-semibold">
      <div className="flex-1 flex flex-col items-center">
        <span>Assistant:</span>
        <span className="text-blue-500 text-sm">{assistant?.id}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>File:</span>
        <span className="text-blue-500 text-sm">{file}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>Assistant File:</span>
        <span className="text-blue-500 text-sm">{assistantFile}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>Thread:</span>
        <span className="text-blue-500 text-sm">{thread?.id}</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <span>Run State:</span>
        <span className="text-blue-500 text-sm">{runState}</span>
      </div>
    </div>
  );
}

export default Header;
