import { BrainCircuit } from "lucide-react";

export function IntelligenceCore() {
  return (
    <div className="intelligence-core" aria-hidden="true">
      <div className="intelligence-core__glow" />
      <div className="ai-core-ring ai-core-ring--1" />
      <div className="ai-core-ring ai-core-ring--2" />
      <div className="ai-core-ring ai-core-ring--3" />
      <div className="ai-core-ring ai-core-ring--4" />
      <div className="ai-core-ring ai-core-ring--5" />

      <div className="intelligence-core__center">
        <div className="intelligence-core__diamond">
          <BrainCircuit />
        </div>

        <span className="data-block data-block--1" />
        <span className="data-block data-block--2" />
        <span className="data-block data-block--3" />
        <span className="data-block data-block--4" />
        <span className="data-block data-block--5" />

        <svg className="intelligence-core__lines" viewBox="0 0 200 200">
          <line stroke="#0070f3" strokeWidth="0.5" x1="100" x2="160" y1="100" y2="40" />
          <line stroke="#0070f3" strokeWidth="0.5" x1="100" x2="40" y1="100" y2="100" />
          <line stroke="#0070f3" strokeWidth="0.5" x1="100" x2="140" y1="100" y2="160" />
          <line stroke="#0070f3" strokeOpacity="0.4" strokeWidth="0.3" x1="160" x2="40" y1="40" y2="100" />
          <line stroke="#0070f3" strokeOpacity="0.4" strokeWidth="0.3" x1="40" x2="140" y1="100" y2="160" />
          <circle cx="160" cy="40" r="2" fill="#0070f3" />
          <circle cx="40" cy="100" r="2" fill="#0070f3" />
          <circle cx="140" cy="160" r="2" fill="#0070f3" />
          <circle cx="100" cy="20" r="1.5" fill="#0070f3" fillOpacity="0.6" />
          <circle cx="180" cy="100" r="1.5" fill="#0070f3" fillOpacity="0.6" />
        </svg>
      </div>
    </div>
  );
}
