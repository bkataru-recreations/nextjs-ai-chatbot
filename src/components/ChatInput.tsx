import type { ChatStatus } from "ai"

import Button from "@/components/Button"

// export default function ChatInput({
//   input: string,
//   setInput: (input: string) => void,
//   handleSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>,
//   handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>
// }) {

interface ChatInputProps {
  status: ChatStatus
  input: string
  setInput: (input: string) => void
  handleSubmit: () => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => Promise<void>
}

export default function ChatInput({
  status,
  input,
  setInput,
  handleSubmit,
  handleKeyDown,
}: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={status !== "ready"}
          placeholder="Type your message here..."
          title="Chat input"
        />
        <Button disabled={input.length === 0 || status !== "ready"} />
      </div>
    </form>
  )
}
