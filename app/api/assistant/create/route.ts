import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();

  try {
    const assistant = await openai.beta.assistants.create({
      instructions: `
      You are a professional stock analyst. 
      I will ask you questions about the stock market and you will answer them.
      You can use the documents I provide to you to help you answer the questions.
      If you're not 100% sure of the answer, you can say "I don't know".
        `,
      name: "Mini Stock Analyst",
      tools: [{ type: "retrieval" }],
      model: "gpt-4-1106-preview",
    });

    console.log(assistant);

    return Response.json({ assistant: assistant });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e });
  }
}
