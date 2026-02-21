import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, insertReport } from '@/lib/db-queries';
import { analyzeSubmission } from '@/lib/claude';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead, answers } = body;

    if (!lead?.email || !lead?.name || !lead?.company || !answers) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const submissionId = await insertSubmission({
      name:         lead.name,
      company:      lead.company,
      email:        lead.email,
      industry:     lead.industry || 'Other',
      answers_json: JSON.stringify(answers),
    });

    const analysis = await analyzeSubmission(lead, answers);

    await insertReport({
      submission_id: submissionId,
      analysis_json: JSON.stringify(analysis),
    });

    return NextResponse.json({ submissionId, analysis }, { status: 200 });
  } catch (error) {
    console.error('[POST /api/submit] Error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
