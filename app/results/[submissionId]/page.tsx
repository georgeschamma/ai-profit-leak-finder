import { notFound } from 'next/navigation';
import { getReportBySubmissionId } from '@/lib/db-queries';
import { ScoreCard } from '@/components/results/score-card';
import { SavingsSummary } from '@/components/results/savings-summary';
import { LeakCard } from '@/components/results/leak-card';
import { RoadmapSection } from '@/components/results/roadmap-section';
import { CtaSection } from '@/components/results/cta-section';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import type { AnalysisResult } from '@/lib/claude';

interface Props {
  params: { submissionId: string };
}

export default async function ResultsPage({ params }: Props) {
  const id = parseInt(params.submissionId, 10);
  if (isNaN(id)) notFound();

  const record = await getReportBySubmissionId(id);
  if (!record) notFound();

  const analysis: AnalysisResult = JSON.parse(record.analysis_json);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Top banner */}
      <div className="bg-[#0F2847] text-white py-8 px-4 text-center">
        <p className="text-blue-300 text-sm mb-1">AI Profit Leak Report</p>
        <h1 className="text-2xl font-bold">{record.company}</h1>
        <p className="text-blue-400 text-sm mt-1">Personalized for {record.name}</p>
      </div>

      <main className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
          <ScoreCard
            score={analysis.aiReadinessScore}
            label={analysis.scoreLabel}
            summary={analysis.executiveSummary}
          />

          <SavingsSummary
            min={analysis.totalAnnualSavingsMin}
            max={analysis.totalAnnualSavingsMax}
            hours={analysis.totalHoursSavedPerYear}
          />

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Your Top Profit Leaks
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Ranked by annual savings impact — highest first
            </p>
            {analysis.profitLeaks.map((leak) => (
              <LeakCard key={leak.rank} leak={leak} />
            ))}
          </section>

          <RoadmapSection
            roadmap={analysis.roadmap}
            quickWins={analysis.quickWins}
          />

          <CtaSection submissionId={id} company={record.company} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
