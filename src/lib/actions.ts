// DEPRECATED
// we're keeping this file for reference, but it's no longer used in the app
// the logic is moved to a server side route at src/app/api/chat/route.ts

"use server"

import { createOpenAI } from "@ai-sdk/openai"
import { type ModelMessage, streamText } from "ai"

const nim = createOpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_NIM_API_KEY,
})

export async function continueConversation(
  messages: ModelMessage[],
): Promise<Response> {
  const result = streamText({
    model: nim("google/gemma-2-9b-it"),
    messages,
  })

  return result.toUIMessageStreamResponse()
}
