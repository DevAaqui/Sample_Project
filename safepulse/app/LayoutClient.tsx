"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.classList.toggle("light", savedTheme === "light");
  }, []);

  return (
    <div
      className={clsx(
        "min-h-[90%] bg-background font-sans antialiased"
        // beVietnamPro.variable
      )}
    >
      <div className="flex-1 h-full">
        <main className="flex-1 items-left">
          <Toaster position="top-center" />
          {children}
        </main>
        <footer className="w-full flex items-center justify-center py-3"></footer>
      </div>
    </div>
  );
}
