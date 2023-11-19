"use client";

import { assistantAtom, assistantFileAtom, fileAtom } from "@/atom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAtom } from "jotai";
import { FileObject } from "openai/resources/files.mjs";
import React, { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  AssistantFilesPage,
  AssistantFile,
} from "openai/resources/beta/assistants/files.mjs";

function AssistantFile() {
  // Atom State
  const [assistant] = useAtom(assistantAtom);
  const [file, setFile] = useAtom(fileAtom);
  const [assistantFile, setAssistantFile] = useAtom(assistantFileAtom);

  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [listing, setListing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      handleUpload(file);
    } else {
      toast.error("No file selected", { position: "bottom-center" });
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("file", file);

      // Send the FormData object directly
      const response = await axios.post<{ file: FileObject }>(
        "/api/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedFile = response.data.file;

      console.log("response", uploadedFile);
      toast.success("Successfully uploaded file", {
        position: "bottom-center",
      });
      setFile(uploadedFile.id);
      localStorage.setItem("file", uploadedFile.id);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file", { position: "bottom-center" });
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async () => {
    if (!file || !assistant) {
      throw new Error("No file or assistant");
    }

    setCreating(true);
    try {
      const response = await axios.get<{ assistantFile: AssistantFile }>(
        `/api/assistant-file/create?assistantId=${assistant.id}&fileId=${file}`
      );

      const assistantFile = response.data.assistantFile;

      console.log("assistantFile", assistantFile);
      toast.success("Successfully created assistant file", {
        position: "bottom-center",
      });
      setAssistantFile(assistantFile.id);
      localStorage.setItem("assistantFile", assistantFile.id);
    } catch (error) {
      console.error("Error creating assistant file:", error);
      toast.error("Error creating assistant file", {
        position: "bottom-center",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleList = async () => {
    if (!assistant) {
      throw new Error("No assistant");
    }

    setListing(true);
    try {
      const response = await axios.get<{
        assistantFiles: AssistantFilesPage;
      }>(`/api/assistant-file/list?assistantId=${assistant.id}`);

      const fetchedAssistantFiles = response.data.assistantFiles;

      console.log("fetchedAssistantFiles", fetchedAssistantFiles);

      toast.success(
        `Assistants:\n${fetchedAssistantFiles.data.map(
          (af) => `${af.id + "\n"}`
        )} `,
        {
          position: "bottom-center",
        }
      );
    } catch (error) {
    } finally {
      setListing(false);
    }
  };

  const handleDelete = async () => {
    if (!assistant || !assistantFile) {
      throw new Error("No assistant");
    }

    setDeleting(true);
    try {
      await axios.get(
        `/api/assistant-file/delete?assistantId=${assistant?.id}&fileId=${file}`
      );

      toast.success("Successfully deleted assistant file", {
        position: "bottom-center",
      });
      setAssistantFile("");
      localStorage.removeItem("assistantFile");
    } catch (error) {
      console.error("Error deleting assistant file:", error);
      toast.error("Error deleting assistant file", {
        position: "bottom-center",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col mb-8">
      <h1 className="text-4xl font-semibold mb-4">Assistant File</h1>
      <div className="flex flex-row gap-x-4 w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        <Button onClick={handleCreate} disabled={!assistant || !file}>
          {creating ? "Creating..." : "Create"}
        </Button>
        <Button onClick={handleList} disabled={!assistant}>
          {listing ? "Listing..." : "List"}
        </Button>
        <Button onClick={handleDelete} disabled={!assistant || !assistantFile}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}

export default AssistantFile;
