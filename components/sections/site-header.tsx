"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/experience";

export function SiteHeader() {
  const shouldReduceMotion = useReducedMotion();
  const [activeHref, setActiveHref] = useState("#top");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (href: string) => (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setActiveHref(href);
      }
    };

    navItems.forEach((item) => {
      // Convert href like '#neural-pipeline' to id 'neural-pipeline'
      const id = item.href === "#top" ? "top" : item.href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(handleIntersect(item.href), {
        rootMargin: "-15% 0px -55% 0px",
        threshold: 0,
      });
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <motion.header
      className={`site-header${menuOpen ? " is-menu-open" : ""}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="page-shell site-header__inner">
        <a className="site-header__brand focus-ring" href="#top" aria-label="Xai home">
          Xai
        </a>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`site-header__nav-link focus-ring${activeHref === item.href ? " is-active" : ""}`}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="site-header__signin focus-ring" href="#top">
            Sign In
          </a>
          <a className="button-primary focus-ring" href="#intelligence-dashboard">
            Open Workspace
          </a>
        </div>

        <button
          className="site-header__menu-button focus-ring"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-navigation" className="site-header__mobile-panel">
        <nav className="site-header__mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`focus-ring${activeHref === item.href ? " is-active" : ""}`}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__mobile-actions">
          <a className="site-header__signin focus-ring" href="#top" onClick={closeMenu}>
            Sign In
          </a>
          <a className="button-primary focus-ring" href="#intelligence-dashboard" onClick={closeMenu}>
            Open Workspace
          </a>
        </div>
      </div>
    </motion.header>
  );
}
