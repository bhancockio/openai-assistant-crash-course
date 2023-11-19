import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { message, threadId } = await req.json();

  if (!threadId || !message)
    return Response.json({ error: "Invalid message" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const threadMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    console.log(threadMessage);

    return Response.json({ message: threadMessage });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
