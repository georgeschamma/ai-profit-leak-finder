import { z } from 'zod';

export const emailCaptureSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  company:  z.string().min(1, 'Company name is required'),
  email:    z.string().email('Enter a valid email address'),
  industry: z.string().min(1, 'Please select your industry'),
});

export type EmailCaptureData = z.infer<typeof emailCaptureSchema>;

export const INDUSTRY_OPTIONS = [
  'Professional Services (Legal, Accounting, Consulting)',
  'Healthcare & Wellness',
  'Real Estate',
  'E-Commerce & Retail',
  'Construction & Trades',
  'Manufacturing',
  'Financial Services',
  'Hospitality & Food Service',
  'Marketing & Creative Agency',
  'Technology / SaaS',
  'Education & Training',
  'Other',
];
