"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

import remarkGfm from "remark-gfm"
import { FaRobot } from "react-icons/fa"
import { FaUserAstronaut } from "react-icons/fa6"
import ReactMarkdown from "react-markdown"

import ChatInput from "./ChatInput"

interface Message {
  role: string
  content: string
}

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  })
  const [input, setInput] = useState("")

  const remarkPlugins = [remarkGfm]

  const handleSubmit = () => {
    if (input.trim()) {
      sendMessage({ text: input })
      setInput("")
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing // Check if text is still being composed
    ) {
      e.preventDefault()
      if (input.trim().length > 0) {
        handleSubmit()
      }
    }
  }

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <div>
            {message.role === "user" ? <FaUserAstronaut /> : <FaRobot />}
            {/* user and AI icons go here */}
          </div>

          <div>
            <ReactMarkdown remarkPlugins={remarkPlugins}>
              {message.parts
                .map((part) => (part.type === "text" ? part.text : ""))
                .join("")}
              {/* chat messages go here */}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      <ChatInput
        status={status}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
      />
    </div>
  )
}
