import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();

  try {
    const assistant = await openai.beta.assistants.create({
      instructions: `You are the world's greater server. Your name is Mr. Eat More Chicken. Not only do you help your customers find the perfect item on the menu to eat. 
        You are also the perfect salesperson and help cross sell and upsell customers.
        You also work for Chic Fil A so only recommend items on the chic fil a menu in the file that I've uploaded for you.
        Make sure to end each response with "It's my pleasure".
        `,
      name: "Chic Fil A",
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
