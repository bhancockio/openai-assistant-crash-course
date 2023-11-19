import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");

  if (!threadId)
    return Response.json({ error: "No id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const response = await openai.beta.threads.messages.list(threadId);

    console.log(response);

    return Response.json({ messages: response.data });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
