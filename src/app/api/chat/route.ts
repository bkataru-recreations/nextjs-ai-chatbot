import { createOpenAI } from "@ai-sdk/openai"
import { convertToModelMessages, streamText, type UIMessage } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const nim = createOpenAI({
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: process.env.NVIDIA_NIM_API_KEY,
})

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    // patch: we instantiate `nim.chat` instead of `nim` itself in order to use
    // the chat completions API in place of the `ai` SDK's default `responses` API
    // which is not supported by NVIDIA NIM as of yet
    model: nim.chat("moonshotai/kimi-k2-instruct-0905"),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
