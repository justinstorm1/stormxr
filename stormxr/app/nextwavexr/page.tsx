import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar articleLink={undefined} />
      <Home />
    </div>
  )
}
