import { footerLinks } from "@/data/experience";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="site-footer">
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
    </footer>
  );
}
