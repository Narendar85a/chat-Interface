import { ToggleTheme } from "../theme/ToggleTheme"

export default function Header() {
  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-6 py-2 
                       bg-background shadow-md dark:shadow-lg z-50">
      <h3 className="text-lg font-semibold text-[#80F2B0]">Chat Interface</h3>
      <ToggleTheme />
    </header>
  )
}
