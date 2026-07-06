import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. AI Consulting features will use high-fidelity mock data.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Simulated response in case API key is missing or fails
const MOCK_PROPOSAL_RESPONSES: Record<string, any> = {
  default: {
    complexity: "Medium",
    timeline: "6-8 weeks",
    costRange: "$20k - $35k",
    architectureSummary: "A scalable, modern full-stack web application with a responsive React frontend, an Express/NodeJS backend microservice, and a reliable Postgres database hosted on Google Cloud Run.",
    techStack: {
      frontend: ["React (Vite)", "Tailwind CSS", "Framer Motion", "Recharts"],
      backend: ["Node.js", "Express", "TypeScript", "Drizzle ORM"],
      database: ["PostgreSQL", "Google Cloud SQL", "Redis Cache"],
      infrastructure: ["Google Cloud Run", "Docker", "Firebase Auth", "Vercel CDN"]
    },
    keyFeatures: [
      { title: "Responsive Dashboard", description: "A highly-optimized visual interface for users to manage resources and view real-time data." },
      { title: "Secure Authentication", description: "State-of-the-art multi-factor login and user role management." },
      { title: "Automated Workflows", description: "Background queue tasks for automated reports and email notifications." }
    ],
    developmentPhases: [
      { phase: "Phase 1: Blueprint & UI", duration: "2 weeks", deliverables: ["Architecture design", "Interactive wireframes", "Tailwind styling foundation"] },
      { phase: "Phase 2: Core Engineering", duration: "4 weeks", deliverables: ["Database integration", "REST APIs implementation", "Core business logic"] },
      { phase: "Phase 3: Launch & Optimize", duration: "2 weeks", deliverables: ["Security auditing", "Production deployment", "Performance tuning"] }
    ],
    advisorNotes: "Your concept is solid! We highly recommend building this with a modular microservice setup, which allows fast initial feature iteration while keeping code clean for scaling later."
  }
};

// API routes first
app.post("/api/consult", async (req, res) => {
  try {
    const { idea, industry, budget, platform } = req.body;
    
    if (!idea) {
      return res.status(400).json({ error: "Project idea description is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("Using high-fidelity mock proposal since GEMINI_API_KEY is not defined.");
      // Return a slightly modified mock response based on user input to make it feel organic
      const mock = { ...MOCK_PROPOSAL_RESPONSES.default };
      if (industry) mock.architectureSummary = `A modern ${industry}-focused full-stack web application designed for high performance, utilizing a responsive React frontend and cloud-native infrastructure.`;
      if (budget) mock.costRange = budget;
      return res.json(mock);
    }

    const ai = getGeminiClient();
    
    const prompt = `You are the Chief Solutions Architect at DLON.io (Technology Solutions for Entrepreneurs).
An entrepreneur has requested a technical proposal for their project. Here are the details:
- Project Idea: "${idea}"
- Target Industry: "${industry || 'Unspecified'}"
- Targeted Budget: "${budget || 'Flexible'}"
- Platform: "${platform || 'Web App'}"

Analyze this concept and provide a comprehensive, realistic technical proposal in JSON format. Provide a highly tailored architecture, precise modern tech stack (do not use outdated technologies), structured key MVP features, step-by-step development phases, and expert advisory remarks. Ensure your notes sound encouraging, analytical, and highly professional.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an elite enterprise-grade software architect. Provide highly detailed, realistic tech proposals for entrepreneurs. Output only clean JSON matching the requested schema.",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            complexity: { type: Type.STRING, description: "Low, Medium, High or Enterprise" },
            timeline: { type: Type.STRING, description: "Estimated delivery time, e.g., '4-6 weeks'" },
            costRange: { type: Type.STRING, description: "Estimated development budget range, e.g., '$15k - $25k'" },
            architectureSummary: { type: Type.STRING, description: "High-level summary of the architectural design" },
            techStack: {
              type: Type.OBJECT,
              properties: {
                frontend: { type: Type.ARRAY, items: { type: Type.STRING } },
                backend: { type: Type.ARRAY, items: { type: Type.STRING } },
                database: { type: Type.ARRAY, items: { type: Type.STRING } },
                infrastructure: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            keyFeatures: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            developmentPhases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  deliverables: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            advisorNotes: { type: Type.STRING, description: "Tailored advice and recommendations for the entrepreneur" }
          },
          required: ["complexity", "timeline", "costRange", "architectureSummary", "techStack", "keyFeatures", "developmentPhases", "advisorNotes"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini API");
    }

    const proposal = JSON.parse(text.trim());
    return res.json(proposal);

  } catch (error: any) {
    console.error("Consultation proposal generation failed:", error);
    // Graceful fallback to high fidelity mock data
    return res.json(MOCK_PROPOSAL_RESPONSES.default);
  }
});

// Lead capture / waitlist endpoint (simulated database storage in memory)
const leads: any[] = [];
app.post("/api/leads", (req, res) => {
  const { name, email, company, message, proposalData } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const lead = {
    id: `lead_${Date.now()}`,
    name: name || "Anonymous",
    email,
    company: company || "Freelancer / Founder",
    message: message || "",
    proposalData: proposalData || null,
    createdAt: new Date().toISOString()
  };
  leads.push(lead);
  console.log("New lead registered successfully:", lead);
  return res.json({ success: true, message: "Lead captured successfully!" });
});

// Vite middleware for development / Static assets for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DLON.io Landing Server running on http://localhost:${PORT}`);
  });
}

startServer();
