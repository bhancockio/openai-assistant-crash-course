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
    return Response.json({ error: "No fileId provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const updatedAssistant = await openai.beta.assistants.update(assistantId, {
      file_ids: [fileId],
    });

    console.log(updatedAssistant);

    return Response.json({ assistant: updatedAssistant });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
