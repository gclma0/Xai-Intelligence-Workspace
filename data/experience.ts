import { Activity, BrainCircuit, CheckCircle, Database, FileText, GitBranch, LayoutDashboard, Workflow, Zap } from "lucide-react";

export const navItems = [
  { label: "Product", href: "#top" },
  { label: "Intelligence", href: "#intelligence-dashboard" },
  { label: "Automations", href: "#automation-builder" },
  { label: "Resources", href: "#site-footer" }
];

export const pipelineSources = [
  { label: "PDF_REPORT_Q3.PDF", icon: FileText },
  { label: "CRM_LIVE_FEED", icon: Database },
  { label: "ANALYTICS_V4.CSV", icon: Activity }
];

export const pipelineOutputs = ["Knowledge Graph", "Real-time Insights", "Smart Automations"];

export const dashboardNav = [
  { label: "Overview", href: "#intelligence-dashboard", icon: LayoutDashboard },
  { label: "Data Sources", href: "#neural-pipeline", icon: Database },
  { label: "Intelligence", href: "#reasoning-engine", icon: BrainCircuit },
  { label: "Reports", href: "#intelligence-dashboard", icon: FileText },
  { label: "Automations", href: "#automation-builder", icon: Workflow }
];

export const dashboardFindings = [
  {
    finding: "Ticket resolution time increased by 4h for premium accounts.",
    impact: "+42% impact"
  },
  {
    finding: "Integration errors spikes detected in North America region.",
    impact: "+18% impact"
  }
];

export const forecastBars = [
  { month: "SEP", height: 20 },
  { month: "OCT", height: 35 },
  { month: "NOV", height: 50 },
  { month: "DEC", height: 75 },
  { month: "JAN", height: 90 }
];

export const reasoningEvents = [
  { time: "08:42:11", message: "INPUT RECEIVED: EMAIL_CLIENT_A71_URGENT.eml", tone: "muted" },
  { time: "08:42:12", message: "ANALYZING SENTIMENT... FRUSTRATED (91%)", tone: "error" },
  { time: "08:42:13", message: "CROSS-REFERENCING SLA_TIER... PLATINUM_FOUND", tone: "primary" },
  { time: "08:42:14", message: "CHECKING RECENT DOWNTIME... NODE_US_WEST_ERROR_DETECTED", tone: "default" }
];

export const reasoningHighlights = [
  {
    title: "Step-by-Step Logic Logs",
    copy: "Full transparency into every weighted decision."
  },
  {
    title: "Cross-Entity Validation",
    copy: "Data is verified against multiple internal sources."
  }
];

export const reasoningRecommendation =
  "Escalate to Priority Support and trigger automatic service credit for Node US West outage. Send personalized apology via CSM.";

export const heroTrustIndicators = ["NOVA", "AXIS", "VERTEX"];

export const heroCapabilities = [
  {
    title: "Connect fragmented data.",
    copy: "Unify files, warehouse rows, customer records, and event streams into one operational context."
  },
  {
    title: "Reveal meaningful intelligence.",
    copy: "Surface causal signals, confidence levels, and relationships that decision-makers can evaluate quickly."
  },
  {
    title: "Automate business decisions.",
    copy: "Convert approved recommendations into auditable workflows with clear execution status."
  }
];

export const automationSteps = [
  { label: "Trigger", value: "Webhook: Order", icon: Zap },
  { label: "AI Analysis", value: "Analyze Risk Profile", icon: BrainCircuit },
  { label: "Entity Match", value: "Customer DB Sync", icon: GitBranch },
  { label: "Outcome", value: "Notify Slack", icon: CheckCircle }
];

export const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Security", href: "#reasoning-engine" },
  { label: "Contact", href: "mailto:hello@xai.example" }
];
