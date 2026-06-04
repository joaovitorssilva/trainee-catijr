import Topbar from "./components/layout/Topbar.tsx"
import Sidebar from "./components/layout/Sidebar.tsx"

export default function App() {
  return (
    <div className="bg-[#121212] min-h-screen">
      <Topbar />
      <Sidebar />
    </div>
  )
}