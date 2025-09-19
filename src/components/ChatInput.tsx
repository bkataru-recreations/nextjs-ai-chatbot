import Button from "@/components/Button"

export default function ChatInput({
  input,
  setInput,
  handleSubmit,
  handleKeyDown,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          title="Chat input"
        />
        <Button disabled={input.length === 0} />
      </div>
    </form>
  )
}
