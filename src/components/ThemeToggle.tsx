"use client";

import { useEffect, useState } from "react";
import { Row, ToggleButton, useTheme } from "@once-ui-system/core";

interface ThemeToggleProps {
  className?: string;
  size?: "s" | "m" | "l";
}

export const ThemeToggle = ({ className, size }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
    
    // Listen to theme changes
    const updateTheme = () => {
      setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
    };
    
    // Use MutationObserver to watch for theme attribute changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    
    return () => observer.disconnect();
  }, []);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      size={size}
      className={className}
    />
  );
};
