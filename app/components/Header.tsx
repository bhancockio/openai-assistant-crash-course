"use client";

import { assistantAtom, fileAtom, threadAtom, runStateAtom } from "@/atom";
import { useAtom } from "jotai";
import React from "react";

function Header() {
  const [assistant] = useAtom(assistantAtom);
  const [file] = useAtom(fileAtom);
  const [thread] = useAtom(threadAtom);
  const [runState] = useAtom(runStateAtom);

  return (
    <div className="flex flex-row justify-around text-2xl font-semibold">
      <div>
        Assistant: <span className="text-blue-500">{assistant?.id}</span>
      </div>
      <div>
        File: <span className="text-blue-500">{file?.name}</span>
      </div>
      <div>
        Thread: <span className="text-blue-500">{thread?.id}</span>
      </div>
      <div>
        Run State: <span className="text-blue-500">{runState}</span>
      </div>
    </div>
  );
}

export default Header;
