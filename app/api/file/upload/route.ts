import { NextRequest } from "next/server";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const base64Data = requestBody.file;

    if (!base64Data)
      return Response.json({ error: "No file provided" }, { status: 400 });

    // Convert Base64 string to a Blob
    const blob = base64ToBlob(base64Data);

    // Create a File object from the Blob
    const fileToUpload = new File([blob], "uploadedFile.pdf", {
      type: blob.type,
      lastModified: new Date().getTime(), // Or a specific timestamp if you have it
    });

    const openai = new OpenAI();

    const file = await openai.files.create({
      file: fileToUpload,
      purpose: "assistants",
    });

    console.log(file);

    return Response.json(file);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}

// Helper function to convert Base64 to Blob
function base64ToBlob(base64: string): Blob {
  const byteString = atob(base64.split(",")[1]);
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  const byteNumbers = new Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeString });
}
