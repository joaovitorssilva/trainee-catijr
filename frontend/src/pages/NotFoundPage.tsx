import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="bg-bg-base min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-white text-2xl font-bold">404 - Not Found</h1>
        <Link to="/" className="text-blue-500 underline">Go back to Home from link</Link>
      </div>
    </div>
  )
}