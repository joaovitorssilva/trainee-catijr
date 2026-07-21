import { useEffect, useState } from "react";

export default function PlayingIconAnimation(intervalMs = 400) {
  const [item, setItem] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setItem((prev) => (prev === 0 ? 1 : 0))
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return item
}