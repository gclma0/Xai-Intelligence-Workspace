import { footerLinks } from "@/data/experience";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-8">
      <div className="page-shell flex flex-col justify-between gap-5 text-sm text-[var(--muted)] md:flex-row md:items-center">
        <p className="font-semibold text-white">Xai</p>
        <nav className="flex flex-wrap gap-4 sm:gap-6">
          {footerLinks.map((link) => (
            <a key={link} className="transition-colors hover:text-white" href="#">
              {link}
            </a>
          ))}
        </nav>
        <p className="mono">2026 Xai Intelligence</p>
      </div>
    </footer>
  );
}
