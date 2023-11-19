import { assistantAtom, runAtom, runStateAtom, threadAtom } from "@/atom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAtom } from "jotai";
import React, { useState } from "react";

function Run() {
  // Atom State
  const [run, setRun] = useAtom(runAtom);
  const [runState, setRunState] = useAtom(runStateAtom);
  const [thread] = useAtom(threadAtom);
  const [assistant] = useAtom(assistantAtom);

  // State
  const [creating, setCreating] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const handleCreate = async () => {
    if (!assistant || !thread) return;

    setCreating(true);
    try {
      await axios.get;
    } catch (error) {
    } finally {
      setCreating(false);
    }
  };
  const handleCancel = async () => {};

  return (
    <div className="flex flex-col mb-8">
      <h1 className="text-4xl font-semibold mb-4">Run</h1>
      <div className="flex flex-row gap-x-4 w-full">
        <Button
          onClick={handleCreate}
          disabled={creating || !assistant || !thread}
        >
          {creating ? "Creating..." : "Create"}
        </Button>
        <Button onClick={handleCancel} disabled={["N/A"].includes(runState)}>
          {canceling ? "Canceling..." : "Cancel"}
        </Button>
      </div>
    </div>
  );
}

export default Run;
