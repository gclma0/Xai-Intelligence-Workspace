import { navItems } from "@/data/experience";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(5,5,5,0.78)] backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between">
        <a className="text-lg font-semibold" href="#top" aria-label="Xai home">
          Xai
        </a>
        <nav className="hidden items-center gap-8 text-sm text-[var(--text-soft)] md:flex">
          {navItems.map((item) => (
            <a key={item.href} className="transition-colors hover:text-white" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#intelligence-dashboard"
          className="focus-ring rounded border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--primary)]"
        >
          Open Workspace
        </a>
      </div>
    </header>
  );
}
