"use client";

import { fileAtom } from "@/atom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAtom } from "jotai";
import React, { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { File as OpenAIFile } from "openai/src/_shims/auto/types";

function AssistantFile() {
  // Atom State
  const [file, setFile] = useAtom(fileAtom);

  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post<{ file: OpenAIFile }>(
        "/api/file/upload",
        formData
      );

      console.log(response);

      const newFile = response.data.file;
      console.log("newFile", newFile);

      toast.success("Successfully uploaded file", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file", { position: "bottom-center" });
      // Handle upload error
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = () => {
    setCreating(true);
    try {
    } catch (error) {
    } finally {
      setCreating(false);
    }
  };

  const handleList = () => {
    setListing(true);
    try {
    } catch (error) {
    } finally {
      setListing(false);
    }
  };

  const handleDelete = () => {
    setDeleting(true);
    try {
    } catch (error) {
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
        <Button onClick={() => fileInputRef.current?.click()}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        <Button onClick={handleCreate}>
          {creating ? "Creating..." : "Create"}
        </Button>
        <Button onClick={handleList}>{listing ? "Listing..." : "List"}</Button>
        <Button onClick={handleDelete}>
          {deleting ? "Deleting" : "Delete"}
        </Button>
      </div>
    </div>
  );
}

export default AssistantFile;
