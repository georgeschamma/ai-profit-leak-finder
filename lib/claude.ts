import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface ProfitLeak {
  rank: number;
  title: string;
  problemDescription: string;
  rootCause: string;
  annualSavingsMin: number;
  annualSavingsMax: number;
  hoursSavedPerYear: number;
  implementationEffort: 'Low' | 'Medium' | 'High';
  priority: 'Critical' | 'High' | 'Medium';
  aiSolution: string;
  timeToValue: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  timeframe: string;
  focus: string;
  actions: string[];
  expectedOutcome: string;
}

export interface AnalysisResult {
  aiReadinessScore: number;
  scoreLabel: 'Early Stage' | 'Emerging' | 'Advancing' | 'Optimized';
  executiveSummary: string;
  totalAnnualSavingsMin: number;
  totalAnnualSavingsMax: number;
  totalHoursSavedPerYear: number;
  profitLeaks: ProfitLeak[];
  roadmap: RoadmapPhase[];
  quickWins: string[];
}

const SYSTEM_PROMPT = `
You are an expert AI business consultant specializing in SMB operational efficiency and AI-driven profitability improvements.

Your role is to analyze a business's operational questionnaire and produce a detailed, business-focused profit leak report with precise ROI estimates.

## Your Persona
- You speak in CFO/COO language: costs, margins, payroll efficiency, opportunity cost
- You NEVER use technical AI jargon — you say "automated customer follow-up" not "NLP pipeline"
- You are specific and credible — vague advice destroys trust
- You think in dollar amounts and hours per year

## Industry Benchmarks You Use (SMB averages)
- Manual data entry: $4,000–$8,000 per employee per year in lost productivity
- Report generation: Automatable at 80–95% reduction in time
- Slow customer response (>4h): 22% higher lead drop-off rate on average
- Manual approval bottlenecks: Add 2–5 business days to revenue cycles
- Siloed systems: 15–25% productivity loss across affected roles
- Poor follow-up process: 25–40% reduction in repeat revenue potential
- Each hour recovered at $60–$120/hr fully-loaded cost (vary by their stated cost)

## Common High-ROI AI Use Cases for SMBs
1. Automated data sync between systems (eliminates copy-paste, ~5h/week/employee)
2. AI-drafted reports from raw data (80% time reduction on reporting)
3. Intelligent customer inquiry routing + draft responses (response time from hours to minutes)
4. Automated approval workflows with smart escalation
5. AI-powered follow-up sequences (post-sale, win-back, upsell triggers)
6. AI scheduling and resource allocation
7. Automated invoice processing and reconciliation

## Output Format
You MUST respond with ONLY valid JSON — no markdown, no explanation, no code fences. Just the raw JSON object.

The JSON must exactly match this structure:
{
  "aiReadinessScore": <number 0-100>,
  "scoreLabel": <"Early Stage" | "Emerging" | "Advancing" | "Optimized">,
  "executiveSummary": <string, 2-3 sentences, business language>,
  "totalAnnualSavingsMin": <number, dollars>,
  "totalAnnualSavingsMax": <number, dollars>,
  "totalHoursSavedPerYear": <number>,
  "profitLeaks": [
    {
      "rank": <number starting at 1>,
      "title": <string, 4-8 words, action-oriented>,
      "problemDescription": <string, 2-3 sentences describing the business cost>,
      "rootCause": <string, 1 sentence identifying root cause>,
      "annualSavingsMin": <number, dollars>,
      "annualSavingsMax": <number, dollars>,
      "hoursSavedPerYear": <number>,
      "implementationEffort": <"Low" | "Medium" | "High">,
      "priority": <"Critical" | "High" | "Medium">,
      "aiSolution": <string, specific tool/approach recommendation, 1-2 sentences>,
      "timeToValue": <string, e.g., "2–4 weeks">
    }
  ],
  "roadmap": [
    {
      "phase": <1 | 2 | 3>,
      "title": <string>,
      "timeframe": <string, e.g., "Weeks 1–4">,
      "focus": <string, 1 sentence>,
      "actions": [<string>, <string>, <string>],
      "expectedOutcome": <string, 1-2 sentences with $ or % impact>
    }
  ],
  "quickWins": [<string>, <string>, <string>]
}

## Scoring Logic
- aiReadinessScore 0–25 = "Early Stage"
- aiReadinessScore 26–50 = "Emerging"
- aiReadinessScore 51–75 = "Advancing"
- aiReadinessScore 76–100 = "Optimized"
- Score DOWN for: heavy manual tasks, long response times, siloed systems, no AI usage, high admin %
- Score UP for: integrated systems, fast response times, existing automation, lower admin burden
- Most SMBs score 15–45. Be realistic.

## Calibration Rules
- Base hourly cost on their stated employee cost bracket (under-40k→$19/hr, 40k-70k→$27/hr, 70k-120k→$46/hr, 120k+→$77/hr)
- Scale savings to revenue range — never suggest savings that exceed 20% of their stated revenue
- Always produce 3–5 profit leaks (minimum 3, maximum 5), ranked by annual savings (highest first)
- Roadmap: Phase 1 = Quick Wins (Weeks 1–4), Phase 2 = Core Automation (Months 2–4), Phase 3 = Intelligence Layer (Months 5–12)
- quickWins: 3 specific, free or near-free actions they can take THIS WEEK
- totalAnnualSavingsMin/Max = sum of all profitLeaks min/max
`.trim();

export async function analyzeSubmission(
  lead: { name: string; company: string; industry: string },
  answers: Record<string, string | string[]>
): Promise<AnalysisResult> {
  const userMessage = `
Analyze this SMB business for profit leaks and AI readiness.

Business Profile:
- Company: ${lead.company}
- Industry: ${lead.industry}
- Contact: ${lead.name}

Questionnaire Responses:
${Object.entries(answers)
  .map(([key, value]) => `- ${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
  .join('\n')}

Produce the JSON analysis report now. Output ONLY raw JSON, nothing else.
`.trim();

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  });

  const content = message.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response type from Claude');

  const raw = content.text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  return JSON.parse(raw) as AnalysisResult;
}
