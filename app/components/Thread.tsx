"use client";

import { messagesAtom, threadAtom } from "@/atom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAtom } from "jotai";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Thread() {
  // Atom State
  const [thread, setThread] = useAtom(threadAtom);
  const [, setMessages] = useAtom(messagesAtom);

  // State
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const response = await axios.get<{ thread: Thread }>(
        "/api/thread/create"
      );

      const newThread = response.data.thread;
      console.log("response", newThread);
      setThread(newThread);
      localStorage.setItem("thread", JSON.stringify(newThread));
      toast.success("Successfully created thread", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create thread", { position: "bottom-center" });
    } finally {
      setCreating(false);
    }
  };
  const handleDelete = async () => {
    if (!thread) throw new Error("No thread to delete");

    setDeleting(true);
    try {
      const response = await axios.get<{ thread: Thread }>(
        `/api/thread/delete?threadId=${thread.id}`
      );

      const deletedThread = response.data.thread;
      console.log("response", deletedThread);
      setThread(null);
      localStorage.removeItem("thread");
      setMessages([]);
      toast.success("Successfully deleted thread", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete thread", { position: "bottom-center" });
    } finally {
      setDeleting(false);
    }
  };

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
