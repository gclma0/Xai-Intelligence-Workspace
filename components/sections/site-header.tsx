"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { navItems } from "@/data/experience";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateHeaderState = () => setIsScrolled(window.scrollY > 12);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  return (
    <motion.header
      className={`sticky top-0 z-50 border-b bg-black transition-colors duration-200 ${
        isScrolled ? "border-[var(--line)] bg-opacity-95 backdrop-blur-xl" : "border-[rgba(36,36,36,0.8)]"
      }`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="page-shell flex h-14 items-center justify-between">
        <a className="text-lg font-semibold" href="#top" aria-label="Xai home">
          Xai
        </a>
        <nav className="hidden items-center gap-7 text-xs text-[var(--text-soft)] md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`transition-colors hover:text-white ${item.label === "Product" ? "font-semibold text-[var(--primary)]" : ""}`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a className="hidden text-xs text-white transition-colors hover:text-[var(--primary)] sm:inline" href="#top">
            Sign In
          </a>
          <a className="focus-ring rounded bg-[var(--primary)] px-5 py-2 text-xs font-semibold text-white" href="#intelligence-dashboard">
            Open Workspace
          </a>
        </div>
      </div>
    </motion.header>
  );
}
