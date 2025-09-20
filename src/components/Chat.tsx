"use client"

import { useState } from "react"
import remarkGfm from "remark-gfm"
import ChatInput from "./ChatInput"
import { FaRobot } from "react-icons/fa"
import { FaUserAstronaut } from "react-icons/fa6"
import ReactMarkdown from "react-markdown"

interface Message {
  role: string
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const remarkPlugins = [remarkGfm]

  const handleSubmit = () => {
    if (input.trim().length === 0) return

    const newMessages = [...messages, { role: "user", content: input }]

    setMessages(newMessages)
    setInput("")
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
      {messages.map((m, i) => (
        <div key={`${m.role}-${i}`}>
          <div>
            {m.role === "user" ? <FaUserAstronaut /> : <FaRobot />}
            {/* user and AI icons go here */}
          </div>

          <div>
            <ReactMarkdown remarkPlugins={remarkPlugins}>
              {m.content}
              {/* chat messages go here */}
            </ReactMarkdown>
          </div>
        </div>
      ))}

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
      />
    </div>
  )
}
