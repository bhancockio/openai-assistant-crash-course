import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();

  try {
    const response = await openai.beta.assistants.list({
      order: "desc",
      limit: 10,
    });

    const assistants = response.data;

    console.log(assistants);

    return Response.json({ assistants: assistants });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
