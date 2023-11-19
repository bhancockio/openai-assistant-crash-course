import { threadAtom } from "@/atom";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import React, { useState } from "react";

function Thread() {
  // Atom State
  const [thread, setThread] = useAtom(threadAtom);

  // State
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCreate = async () => {};
  const handleDelete = async () => {};

  return (
    <div className="flex flex-col mb-8">
      <h1 className="text-4xl font-semibold mb-4">Thread</h1>
      <div className="flex flex-row gap-x-4 w-full">
        <Button onClick={handleCreate}>
          {creating ? "Creating..." : "Create"}
        </Button>
        <Button onClick={handleDelete} disabled={!thread}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}

export default Thread;
