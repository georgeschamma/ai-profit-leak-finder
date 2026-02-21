import { NextRequest, NextResponse } from 'next/server';
import { getReportBySubmissionId } from '@/lib/db-queries';
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer';
import { ProfitLeakPDF } from '@/lib/pdf-generator';
import React, { type ReactElement, type JSXElementConstructor } from 'react';

export const runtime = 'nodejs';

export async function GET(
  _req: NextRequest,
  { params }: { params: { submissionId: string } }
) {
  const id = parseInt(params.submissionId, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid submission ID' }, { status: 400 });
  }

  const record = await getReportBySubmissionId(id);
  if (!record) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  const analysis = JSON.parse(record.analysis_json);
  const element = React.createElement(ProfitLeakPDF, {
    analysis,
    company: record.company,
    name: record.name,
  }) as unknown as ReactElement<DocumentProps, JSXElementConstructor<DocumentProps>>;
  const buffer = await renderToBuffer(element);

  const filename = `AI-Profit-Leak-Report-${record.company.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
