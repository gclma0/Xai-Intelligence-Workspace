"use client";

import { motion, useReducedMotion } from "framer-motion";
import { footerLinks } from "@/data/experience";

export function SiteFooter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      id="site-footer"
      className="site-footer"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="page-shell site-footer__inner">
        <p className="site-footer__brand">Xai</p>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.label} className="focus-ring" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <p className="site-footer__copyright">© 2024 Xai Intelligence. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}
