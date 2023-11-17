import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { message, id } = await req.json();

  if (!id || !message)
    return Response.json({ error: "Invalid message" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const response = await openai.beta.threads.messages.create(id, {
      role: "user",
      content: message,
    });

    console.log(response);

    return Response.json(response);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
