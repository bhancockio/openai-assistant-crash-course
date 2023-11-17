import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();

  try {
    const assistants = await openai.beta.assistants.list({
      order: "desc",
      limit: 10,
    });

    console.log(assistants);

    return Response.json(assistants);
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
