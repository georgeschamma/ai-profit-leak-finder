import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import type { RoadmapPhase } from '@/lib/claude';

const PHASE_COLORS = [
  { badge: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  { badge: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
  { badge: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
];

interface Props {
  roadmap: RoadmapPhase[];
  quickWins: string[];
}

export function RoadmapSection({ roadmap, quickWins }: Props) {
  return (
    <div className="space-y-6">
      {/* Roadmap */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Implementation Roadmap</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {roadmap.map((phase, i) => {
            const colors = PHASE_COLORS[i] || PHASE_COLORS[0];
            return (
              <Card key={phase.phase} className="h-full">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
                      Phase {phase.phase}
                    </span>
                    <span className="text-xs text-gray-400">{phase.timeframe}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{phase.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{phase.focus}</p>
                  <ul className="space-y-2">
                    {phase.actions.map((action, j) => (
                      <li key={j} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="text-gray-300 mt-0.5">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-green-700">{phase.expectedOutcome}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Wins */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-amber-600" />
          Start This Week — Free Quick Wins
        </h3>
        <ul className="space-y-3">
          {quickWins.map((win, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-amber-800">
              <span className="font-bold text-amber-600 flex-shrink-0">{i + 1}.</span>
              {win}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
