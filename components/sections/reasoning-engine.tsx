import { Check } from "lucide-react";
import { reasoningEvents, reasoningHighlights, reasoningRecommendation } from "@/data/experience";

function eventClassName(tone: string) {
  if (tone === "error") return "tone-error";
  if (tone === "primary") return "tone-primary";
  if (tone === "muted") return "tone-muted";
  return "";
}

function KnowledgeGraphBackdrop() {
  return (
    <svg className="knowledge-graph-bg" viewBox="0 0 400 400" aria-hidden="true">
      <circle cx="50" cy="100" r="2" fill="#0070f3" />
      <circle cx="350" cy="150" r="2" fill="#0070f3" />
      <circle cx="100" cy="350" r="2" fill="#0070f3" />
      <circle cx="300" cy="380" r="2" fill="#0070f3" />
      <line stroke="#0070f3" strokeDasharray="4 4" strokeWidth="0.5" x1="50" x2="350" y1="100" y2="150" />
      <line stroke="#0070f3" strokeDasharray="4 4" strokeWidth="0.5" x1="350" x2="300" y1="150" y2="380" />
      <line stroke="#0070f3" strokeDasharray="4 4" strokeWidth="0.5" x1="300" x2="100" y1="380" y2="350" />
      <line stroke="#0070f3" strokeDasharray="4 4" strokeWidth="0.5" x1="100" x2="50" y1="350" y2="100" />
    </svg>
  );
}

export function ReasoningEngine() {
  return (
    <section id="reasoning-engine" className="reasoning-section">
      <div className="page-shell reasoning-grid">
        <div className="reasoning-copy">
          <p className="eyebrow">The Reasoning Engine</p>
          <h2>
            Observe AI logic <br />
            in real-time.
          </h2>
          <p className="reasoning-copy__text">
            No more black boxes. Xai allows you to audit the exact reasoning path our models take to reach business critical recommendations.
          </p>

          <div className="reasoning-highlights">
            {reasoningHighlights.map((highlight) => (
              <article key={highlight.title} className="reasoning-highlight">
                <span className="reasoning-highlight__icon" aria-hidden="true">
                  <Check />
                </span>
                <p>
                  <strong>{highlight.title}</strong>
                  <span>{highlight.copy}</span>
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="reasoning-visual">
          <KnowledgeGraphBackdrop />
          <svg className="reasoning-geometry" viewBox="0 0 520 520" aria-hidden="true">
            <path d="M60 280 C160 120 260 420 458 180" fill="none" stroke="#0070f3" strokeWidth="1" />
            <path d="M92 162 C220 88 318 284 430 344" fill="none" stroke="#aec6ff" strokeOpacity="0.45" strokeWidth="1" />
          </svg>

          <article className="glass-surface reasoning-panel">
            <header className="reasoning-panel__header">
              <div className="reasoning-panel__title">
                <span className="reasoning-panel__pulse" />
                <span>REASONING_ENGINE::THREAD_492</span>
              </div>
              <span className="live-badge">Live Stream</span>
            </header>

            <div className="reasoning-log">
              {reasoningEvents.map((event, index) => (
                <div key={event.time} className={`reasoning-log__row ${index >= 2 ? "is-nested" : ""}`}>
                  <span className="reasoning-log__time">[{event.time}]</span>
                  <span className={eventClassName(event.tone)}>{event.message}</span>
                </div>
              ))}

              <div className="recommendation">
                <p>Recommendation Generated</p>
                <p>&quot;{reasoningRecommendation}&quot;</p>
              </div>
            </div>

            <footer className="reasoning-panel__footer">
              <span>
                <span className="reasoning-status-dot" />
                Status: Operational
              </span>
              <span>Load: 4.1%</span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
