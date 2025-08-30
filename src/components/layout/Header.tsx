import { ToggleTheme } from "../theme/ToggleTheme";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 w-full flex items-center justify-between 
                 px-4 sm:px-6 py-2 sm:py-3 
                 bg-background shadow-md dark:shadow-lg z-50"
    >
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#00a67e] truncate">
        Chat Interface
      </h3>
      <ToggleTheme />
    </header>
  );
}
