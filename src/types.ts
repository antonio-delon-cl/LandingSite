export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface DevPhase {
  phase: string;
  duration: string;
  deliverables: string[];
}

export interface Proposal {
  complexity: "Low" | "Medium" | "High" | "Enterprise" | string;
  timeline: string;
  costRange: string;
  architectureSummary: string;
  techStack: TechStack;
  keyFeatures: KeyFeature[];
  developmentPhases: DevPhase[];
  advisorNotes: string;
}

export interface LeadSubmission {
  name: string;
  email: string;
  company: string;
  message: string;
  proposalData?: Proposal | null;
}
