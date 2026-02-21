export type QuestionType =
  | 'text'
  | 'number'
  | 'radio-cards'
  | 'checkbox-cards'
  | 'slider'
  | 'select';

export interface QuestionOption {
  value: string;
  label: string;
  subLabel?: string;
}

export interface Question {
  id: string;
  section: number;
  sectionTitle: string;
  text: string;
  subText?: string;
  type: QuestionType;
  options?: QuestionOption[];
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required: boolean;
}

export interface SectionMeta {
  id: number;
  title: string;
  icon: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 1, title: 'Team & Operations',    icon: 'Users' },
  { id: 2, title: 'Manual Tasks',          icon: 'ClipboardList' },
  { id: 3, title: 'Customer Experience',   icon: 'MessageSquare' },
  { id: 4, title: 'Tools & Technology',    icon: 'Wrench' },
  { id: 5, title: 'Financial Snapshot',    icon: 'DollarSign' },
];

export const QUESTIONS: Question[] = [
  // ── SECTION 1: Team & Operations ─────────────────────────────────────────────
  {
    id: 'team_size',
    section: 1,
    sectionTitle: 'Team & Operations',
    text: 'How many full-time employees (or equivalent) does your business currently have?',
    subText: 'Include part-time staff as 0.5 FTEs.',
    type: 'radio-cards',
    options: [
      { value: '1-5',   label: '1–5 people',   subLabel: 'Solo or micro team' },
      { value: '6-15',  label: '6–15 people',  subLabel: 'Small team' },
      { value: '16-50', label: '16–50 people', subLabel: 'Growing team' },
      { value: '51+',   label: '51+ people',   subLabel: 'Mid-market' },
    ],
    required: true,
  },
  {
    id: 'revenue_generating_roles_pct',
    section: 1,
    sectionTitle: 'Team & Operations',
    text: 'What percentage of your team spends the majority of their time on revenue-generating activities?',
    subText: 'Revenue-generating = sales, service delivery, client work. Non-revenue = admin, reporting, coordination.',
    type: 'slider',
    min: 0,
    max: 100,
    step: 5,
    unit: '%',
    required: true,
  },
  {
    id: 'weekly_admin_hours',
    section: 1,
    sectionTitle: 'Team & Operations',
    text: 'Roughly how many hours per week does your average employee spend on purely administrative tasks?',
    subText: 'Examples: scheduling, data entry, internal emails, copying information between systems.',
    type: 'radio-cards',
    options: [
      { value: '0-2',  label: '0–2 hrs/week',  subLabel: 'Very lean' },
      { value: '3-5',  label: '3–5 hrs/week',  subLabel: 'Typical' },
      { value: '6-10', label: '6–10 hrs/week', subLabel: 'High overhead' },
      { value: '10+',  label: '10+ hrs/week',  subLabel: 'Critical issue' },
    ],
    required: true,
  },

  // ── SECTION 2: Manual Tasks ───────────────────────────────────────────────────
  {
    id: 'manual_data_entry_hours',
    section: 2,
    sectionTitle: 'Manual Tasks',
    text: 'How many hours per week does your team spend on manual data entry, copy-pasting, or moving information between systems?',
    subText: 'Includes updating spreadsheets, re-entering CRM data, copying invoice details, etc.',
    type: 'radio-cards',
    options: [
      { value: 'under-2', label: 'Under 2 hours', subLabel: 'Minimal' },
      { value: '2-5',     label: '2–5 hours',     subLabel: 'Moderate' },
      { value: '5-15',    label: '5–15 hours',    subLabel: 'Significant drag' },
      { value: '15+',     label: '15+ hours',     subLabel: 'Major bottleneck' },
    ],
    required: true,
  },
  {
    id: 'report_generation_hours',
    section: 2,
    sectionTitle: 'Manual Tasks',
    text: 'How much time does your team spend each month manually creating reports, summaries, or status updates for leadership or clients?',
    type: 'radio-cards',
    options: [
      { value: 'under-2', label: 'Under 2 hrs/month', subLabel: 'Mostly automated' },
      { value: '2-8',     label: '2–8 hrs/month',     subLabel: 'Some manual work' },
      { value: '8-20',    label: '8–20 hrs/month',    subLabel: 'Time-consuming' },
      { value: '20+',     label: '20+ hrs/month',     subLabel: 'Unsustainable' },
    ],
    required: true,
  },
  {
    id: 'manual_approval_bottlenecks',
    section: 2,
    sectionTitle: 'Manual Tasks',
    text: 'Which of the following manual approval or review processes regularly slow your team down?',
    subText: 'Select all that apply.',
    type: 'checkbox-cards',
    options: [
      { value: 'invoices',   label: 'Invoice / expense approvals' },
      { value: 'proposals',  label: 'Proposal or quote review' },
      { value: 'hiring',     label: 'Hiring / HR paperwork' },
      { value: 'compliance', label: 'Compliance or legal reviews' },
      { value: 'scheduling', label: 'Scheduling / resource allocation' },
      { value: 'none',       label: 'None — approvals are fast' },
    ],
    required: true,
  },

  // ── SECTION 3: Customer Experience ───────────────────────────────────────────
  {
    id: 'customer_response_time',
    section: 3,
    sectionTitle: 'Customer Experience',
    text: 'How long does a new customer inquiry typically wait before receiving a substantive response from your team?',
    type: 'radio-cards',
    options: [
      { value: 'under-1h', label: 'Under 1 hour',     subLabel: 'Best-in-class' },
      { value: '1-4h',     label: '1–4 hours',        subLabel: 'Acceptable' },
      { value: '4-24h',    label: '4–24 hours',       subLabel: 'Losing deals' },
      { value: '24h+',     label: 'More than 24 hrs', subLabel: 'Critical risk' },
    ],
    required: true,
  },
  {
    id: 'complaint_frequency',
    section: 3,
    sectionTitle: 'Customer Experience',
    text: 'Approximately what percentage of your customers raise a complaint or issue that requires manual follow-up each month?',
    type: 'radio-cards',
    options: [
      { value: 'under-2', label: 'Under 2%', subLabel: 'Excellent retention' },
      { value: '2-5',     label: '2–5%',     subLabel: 'Industry average' },
      { value: '5-15',    label: '5–15%',    subLabel: 'Revenue at risk' },
      { value: '15+',     label: '15%+',     subLabel: 'High churn risk' },
    ],
    required: true,
  },
  {
    id: 'follow_up_process',
    section: 3,
    sectionTitle: 'Customer Experience',
    text: 'How does your team currently handle post-sale or post-delivery customer follow-up?',
    type: 'radio-cards',
    options: [
      { value: 'automated', label: 'Fully automated',        subLabel: 'CRM sequences, drip emails' },
      { value: 'mixed',     label: 'Mix of manual and auto', subLabel: 'Some automation' },
      { value: 'manual',    label: 'Mostly manual',          subLabel: 'Team remembers to reach out' },
      { value: 'none',      label: 'We rarely follow up',    subLabel: 'Lost revenue opportunity' },
    ],
    required: true,
  },

  // ── SECTION 4: Tools & Technology ────────────────────────────────────────────
  {
    id: 'software_stack',
    section: 4,
    sectionTitle: 'Tools & Technology',
    text: 'Which categories of software does your business currently use?',
    subText: 'Select all that apply.',
    type: 'checkbox-cards',
    options: [
      { value: 'crm',          label: 'CRM',                  subLabel: 'Salesforce, HubSpot, etc.' },
      { value: 'accounting',   label: 'Accounting / Finance', subLabel: 'QuickBooks, Xero, etc.' },
      { value: 'project_mgmt', label: 'Project Management',   subLabel: 'Asana, Monday, ClickUp' },
      { value: 'helpdesk',     label: 'Customer Support',     subLabel: 'Zendesk, Freshdesk' },
      { value: 'marketing',    label: 'Marketing Automation', subLabel: 'Mailchimp, Klaviyo' },
      { value: 'spreadsheets', label: 'Spreadsheets Only',    subLabel: 'Heavy Excel / Google Sheets' },
    ],
    required: true,
  },
  {
    id: 'integration_gaps',
    section: 4,
    sectionTitle: 'Tools & Technology',
    text: 'Do your key business systems "talk to each other" automatically, or does your team manually bridge the gaps?',
    type: 'radio-cards',
    options: [
      { value: 'fully_integrated',  label: 'Fully integrated',       subLabel: 'Data flows automatically' },
      { value: 'mostly_integrated', label: 'Mostly integrated',      subLabel: 'Minor manual steps' },
      { value: 'mostly_manual',     label: 'Mostly manual handoffs', subLabel: 'Team copies data between tools' },
      { value: 'siloed',            label: 'Completely siloed',      subLabel: 'No connection between systems' },
    ],
    required: true,
  },
  {
    id: 'ai_tool_usage',
    section: 4,
    sectionTitle: 'Tools & Technology',
    text: 'Is your team currently using any AI tools in day-to-day work?',
    type: 'radio-cards',
    options: [
      { value: 'advanced',   label: 'Yes — systematically', subLabel: 'Custom workflows, integrated AI' },
      { value: 'occasional', label: 'Yes — occasionally',   subLabel: 'ChatGPT, Copilot ad-hoc' },
      { value: 'exploring',  label: 'Exploring options',    subLabel: 'Evaluating but not deployed' },
      { value: 'none',       label: 'Not yet',              subLabel: 'No AI tools in use' },
    ],
    required: true,
  },

  // ── SECTION 5: Financial Snapshot ────────────────────────────────────────────
  {
    id: 'annual_revenue_range',
    section: 5,
    sectionTitle: 'Financial Snapshot',
    text: "What is your business's approximate annual revenue?",
    subText: 'This helps us calibrate savings estimates to your scale.',
    type: 'radio-cards',
    options: [
      { value: 'under-500k', label: 'Under $500K' },
      { value: '500k-2m',    label: '$500K – $2M' },
      { value: '2m-10m',     label: '$2M – $10M' },
      { value: '10m-50m',    label: '$10M – $50M' },
      { value: '50m+',       label: '$50M+' },
    ],
    required: true,
  },
  {
    id: 'avg_employee_cost',
    section: 5,
    sectionTitle: 'Financial Snapshot',
    text: 'What is the approximate fully-loaded annual cost per employee (salary + benefits + overhead)?',
    subText: 'This powers our savings calculations.',
    type: 'radio-cards',
    options: [
      { value: 'under-40k', label: 'Under $40K',   subLabel: 'Lower cost markets' },
      { value: '40k-70k',   label: '$40K – $70K',  subLabel: 'Mid-range' },
      { value: '70k-120k',  label: '$70K – $120K', subLabel: 'Professional roles' },
      { value: '120k+',     label: '$120K+',        subLabel: 'Senior / specialist' },
    ],
    required: true,
  },
  {
    id: 'biggest_pain_point',
    section: 5,
    sectionTitle: 'Financial Snapshot',
    text: 'In your own words, what is the single biggest operational headache costing you the most time or money right now?',
    subText: 'Be as specific as possible — this directly shapes your personalized recommendations.',
    type: 'text',
    placeholder:
      'e.g., "We spend 3 hours every Monday pulling data from 4 different systems to build a report that takes 20 minutes to present..."',
    required: true,
  },
];
