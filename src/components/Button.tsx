import { FaArrowCircleRight } from "react-icons/fa"
import type { ButtonHTMLAttributes } from "react"

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="submit" className={className} {...props}>
      <FaArrowCircleRight />
    </button>
  )
}
