import client from "../config/openai.js";
import { hitesh } from "./hc.js";
import { piyush } from "./pg.js";

export async function message(role, prompt = "") {
  const MSG = [
    {
      role: "system",
      content: role,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const result = await client.chat.completions.create({
    model: "gemini-3-flash-preview",
    messages: MSG,
  });

  const res = result.choices[0].message.content;
  const parsedResult = JSON.parse(res);

  if (!Array.isArray(parsedResult) || parsedResult.length === 0) {
    throw new Error("Invalid response format");
  }

  return parsedResult.at(-1).text;
}
