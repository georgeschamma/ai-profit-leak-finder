import { supabase } from './db';

export interface SubmissionInsert {
  name: string;
  company: string;
  email: string;
  industry: string;
  answers_json: string;
}

export interface ReportInsert {
  submission_id: number;
  analysis_json: string;
}

export interface ReportRecord {
  id: number;
  submission_id: number;
  analysis_json: string;
  created_at: string;
  name: string;
  company: string;
  industry: string;
  email: string;
}

type SubmissionJoin = {
  name: string;
  company: string;
  industry: string;
  email: string;
};

export async function insertSubmission(data: SubmissionInsert): Promise<number> {
  const { data: row, error } = await supabase
    .from('submissions')
    .insert(data)
    .select('id')
    .single();
  if (error) throw new Error(`insertSubmission: ${error.message}`);
  return row.id;
}

export async function insertReport(data: ReportInsert): Promise<number> {
  const { data: row, error } = await supabase
    .from('reports')
    .insert(data)
    .select('id')
    .single();
  if (error) throw new Error(`insertReport: ${error.message}`);
  return row.id;
}

export async function getReportBySubmissionId(submissionId: number): Promise<ReportRecord | null> {
  const { data, error } = await supabase
    .from('reports')
    .select(`
      id,
      submission_id,
      analysis_json,
      created_at,
      submissions (name, company, industry, email)
    `)
    .eq('submission_id', submissionId)
    .single();

  if (error || !data) return null;

  const sub = (data.submissions as unknown as SubmissionJoin) ?? null;
  return {
    id: data.id,
    submission_id: data.submission_id,
    analysis_json: data.analysis_json,
    created_at: data.created_at,
    name: sub?.name ?? '',
    company: sub?.company ?? '',
    industry: sub?.industry ?? '',
    email: sub?.email ?? '',
  };
}
