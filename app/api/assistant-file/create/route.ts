import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const assistantId = searchParams.get("assistantId");
  const fileId = searchParams.get("fileId");

  if (!assistantId)
    return Response.json(
      { error: "No assistant id provided" },
      { status: 400 }
    );
  if (!fileId)
    return Response.json({ error: "No file id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const assistantFile = await openai.beta.assistants.files.create(
      assistantId,
      {
        file_id: fileId,
      }
    );

    console.log(assistantFile);

    return Response.json({ assistantFile: assistantFile });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
