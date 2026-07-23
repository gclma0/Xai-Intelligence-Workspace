import { BrainCircuit } from "lucide-react";
import { pipelineOutputs, pipelineSources } from "@/data/experience";

export function NeuralPipeline() {
  return (
    <section id="neural-pipeline" className="pipeline-section">
      <div className="page-shell">
        <div className="section-heading">
          <p className="eyebrow">Neural Pipeline</p>
          <h2>Seamless Data Translation</h2>
        </div>

        <div className="pipeline-grid">
          <div className="pipeline-stack">
            {pipelineSources.map((source) => {
              const Icon = source.icon;

              return (
                <article key={source.label} className="glass-surface pipeline-card">
                  <Icon aria-hidden="true" />
                  <span>{source.label}</span>
                </article>
              );
            })}
          </div>

          <div className="pipeline-line" aria-hidden="true" />

          <div className="pipeline-core">
            <div className="pipeline-core__ring">
              <div className="pipeline-core__diamond">
                <BrainCircuit aria-hidden="true" />
              </div>
            </div>
            <p>XAI CORE v2.4</p>
          </div>

          <div className="pipeline-line pipeline-line--right" aria-hidden="true" />

          <div className="pipeline-stack">
            {pipelineOutputs.map((output, index) => (
              <article key={output} className={`glass-surface pipeline-card pipeline-card--output ${index === 0 ? "pipeline-card--active" : ""}`}>
                {output}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
