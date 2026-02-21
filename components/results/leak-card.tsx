import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, Zap } from 'lucide-react';
import type { ProfitLeak } from '@/lib/claude';

const PRIORITY_STYLE = {
  Critical: 'bg-red-100 text-red-700 border-red-200',
  High:     'bg-orange-100 text-orange-700 border-orange-200',
  Medium:   'bg-yellow-100 text-yellow-700 border-yellow-200',
} as const;

const BORDER_COLOR = {
  Critical: 'border-l-red-500',
  High:     'border-l-orange-500',
  Medium:   'border-l-yellow-500',
} as const;

const EFFORT_STYLE = {
  Low:    'bg-green-100 text-green-700',
  Medium: 'bg-blue-100 text-blue-700',
  High:   'bg-purple-100 text-purple-700',
} as const;

export function LeakCard({ leak }: { leak: ProfitLeak }) {
  return (
    <Card className={`mb-4 border-l-4 ${BORDER_COLOR[leak.priority]}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl font-bold text-gray-200 flex-shrink-0">#{leak.rank}</span>
            <h3 className="text-base font-bold text-gray-900 leading-snug">{leak.title}</h3>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border flex-shrink-0 ${PRIORITY_STYLE[leak.priority]}`}>
            {leak.priority}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-green-700">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">
              ${leak.annualSavingsMin.toLocaleString()} – ${leak.annualSavingsMax.toLocaleString()}/yr
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-700">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{leak.hoursSavedPerYear.toLocaleString()} hrs/yr recovered</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Zap className="w-4 h-4" />
            <span className="text-sm">{leak.timeToValue}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{leak.problemDescription}</p>

        <div className="bg-blue-50 rounded-lg p-3 mb-3">
          <p className="text-xs font-semibold text-blue-800 mb-1">Recommended Solution</p>
          <p className="text-sm text-blue-700">{leak.aiSolution}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Implementation effort:</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${EFFORT_STYLE[leak.implementationEffort]}`}>
            {leak.implementationEffort}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
