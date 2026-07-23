import { navItems } from "@/data/experience";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell site-header__inner">
        <a className="site-header__brand focus-ring" href="#top" aria-label="Xai home">
          Xai
        </a>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} className="focus-ring" href={item.href}>
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
      </div>
    </header>
  );
}
