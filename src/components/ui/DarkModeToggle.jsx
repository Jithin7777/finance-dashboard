import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;

    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <Button
      variant="outline"
      onClick={() => setIsDark(!isDark)}
      className="flex items-center gap-2 px-3 sm:px-4"
    >
      {isDark ? (
        <>
          <Sun size={16} />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={16} />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </Button>
  );
}
