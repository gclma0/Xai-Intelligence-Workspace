import { IntelligenceCore } from "@/components/three/intelligence-core";
import { heroCapabilities, heroTrustIndicators } from "@/data/experience";

export function HeroSection() {
  return (
    <section id="top" className="page-shell hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-copy__brand">Xai</p>
          <h1>
            Intelligence <br />
            Workspace
          </h1>
          <p className="hero-copy__text">
            Connect enterprise data, uncover meaningful intelligence and automate better decisions from one intelligent workspace.
          </p>

          <div className="hero-actions">
            <a className="button-primary focus-ring" href="#intelligence-dashboard">
              Explore Workspace
            </a>
            <a className="button-secondary focus-ring" href="#neural-pipeline">
              See How It Works
            </a>
          </div>

          <div className="hero-trust">
            <p>Trusted by enterprise teams worldwide</p>
            <div className="hero-logos" aria-label="Trusted teams">
              {heroTrustIndicators.map((indicator) => (
                <span key={indicator} className="hero-logo" aria-label={indicator} />
              ))}
            </div>
          </div>
        </div>

        <div className="hero-core" aria-label="AI core visualization">
          <div className="hero-core__frame">
            <IntelligenceCore />
          </div>
        </div>

        <aside className="hero-capabilities" aria-label="Xai capabilities">
          <div className="hero-capabilities__list">
            {heroCapabilities.map((capability, index) => (
              <div key={capability.title} className={`hero-capability ${index === 0 ? "is-active" : ""}`}>
                <span className="hero-capability__dot" aria-hidden="true" />
                <span className="hero-capability__title">{capability.title}</span>
              </div>
            ))}
            <div className="hero-capabilities__indicator" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
