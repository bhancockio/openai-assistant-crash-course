import { runStateAtom } from "@/atom";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import React, { useState } from "react";

function Run() {
  // Atom State
  const [runState, setRunState] = useAtom(runStateAtom);

  // State
  const [creating, setCreating] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const handleCreate = async () => {};
  const handleCancel = async () => {};

  return (
    <div className="flex flex-col mb-8">
      <h1 className="text-4xl font-semibold mb-4">Run</h1>
      <div className="flex flex-row gap-x-4 w-full">
        <Button onClick={handleCreate}>
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
