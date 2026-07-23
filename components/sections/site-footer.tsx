import { footerLinks } from "@/data/experience";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-[var(--line)] py-8">
      <div className="page-shell flex flex-col justify-between gap-5 text-sm text-[var(--muted)] md:flex-row md:items-center">
        <p className="font-semibold text-white">Xai</p>
        <nav className="flex flex-wrap gap-4 sm:gap-6" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.label} className="focus-ring rounded-sm transition-colors hover:text-white" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <p className="mono">2026 Xai Intelligence</p>
      </div>
    </footer>
  );
}
