import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");

  if (!threadId)
    return Response.json({ error: "No id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const thread = await openai.beta.threads.del(threadId);

    console.log(thread);

    return Response.json({ thread: thread });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
