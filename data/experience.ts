import {
  Activity,
  BrainCircuit,
  Database,
  FileText,
  GitBranch,
  LayoutDashboard,
  MessageSquare,
  Network,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";

export const navItems = [
  { label: "Product", href: "#top" },
  { label: "Pipeline", href: "#neural-pipeline" },
  { label: "Dashboard", href: "#intelligence-dashboard" },
  { label: "Reasoning", href: "#reasoning-engine" },
  { label: "Automations", href: "#automation-builder" }
];

export const insightStages = [
  {
    eyebrow: "01 / Ingest",
    title: "Ingest Data",
    copy: "Raw reports, warehouse tables, support threads, and event streams are normalized into a reliable product context.",
    icon: Database,
    metric: "4.8M events"
  },
  {
    eyebrow: "02 / Analyze",
    title: "Analyze with AI",
    copy: "Entity relations, anomalies, and causal signals are scored through an explainable reasoning layer.",
    icon: BrainCircuit,
    metric: "94.8% confidence"
  },
  {
    eyebrow: "03 / Act",
    title: "Generate Insight",
    copy: "Xai turns the model output into ranked recommendations and automations that teams can audit before execution.",
    icon: Sparkles,
    metric: "12 actions queued"
  }
];

export const dashboardNav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Sources", icon: FileText },
  { label: "Reasoning", icon: Network },
  { label: "Automations", icon: Workflow }
];

export const tableRows = [
  ["Tier 2 latency", "Support", "+42%", "Escalate"],
  ["Usage drop", "Enterprise", "+18%", "Monitor"],
  ["Pipeline drift", "Data Ops", "+9%", "Review"]
];

export const reasoningEvents = [
  { time: "08:42:11", label: "Input received", value: "EMAIL_CLIENT_A71_URGENT" },
  { time: "08:42:12", label: "Sentiment classified", value: "FRUSTRATED / 91%" },
  { time: "08:42:13", label: "SLA matched", value: "PLATINUM_ACCOUNT" },
  { time: "08:42:14", label: "Recommendation", value: "PRIORITY_SUPPORT + SERVICE_CREDIT" }
];

export const heroStats = [
  { label: "Connected sources", value: "128" },
  { label: "Signals processed", value: "4.8M" },
  { label: "Automation latency", value: "82ms" }
];

export const workflowNodes = [Database, GitBranch, Activity, Sparkles];

export const automationSteps = [
  { label: "Trigger", value: "Webhook: Order", icon: Zap },
  { label: "AI Analysis", value: "Analyze Risk Profile", icon: BrainCircuit },
  { label: "Entity Match", value: "Customer DB Sync", icon: Network },
  { label: "Outcome", value: "Notify Team", icon: MessageSquare }
];

export const footerLinks = ["Privacy", "Terms", "Security", "Contact"];
