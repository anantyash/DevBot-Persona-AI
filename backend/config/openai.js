import "dotenv/config";
import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.AI_APIKEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export default client;
