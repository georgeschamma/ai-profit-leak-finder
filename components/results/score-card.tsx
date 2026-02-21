import { Card, CardContent } from '@/components/ui/card';

const SCORE_CONFIG = {
  'Early Stage': { ring: '#F87171', bg: 'bg-red-50',    text: 'text-red-600',    desc: 'Significant opportunity ahead' },
  'Emerging':    { ring: '#FBBF24', bg: 'bg-yellow-50', text: 'text-yellow-700', desc: 'Good foundation to build on' },
  'Advancing':   { ring: '#60A5FA', bg: 'bg-blue-50',   text: 'text-blue-700',   desc: 'Strong progress, keep going' },
  'Optimized':   { ring: '#34D399', bg: 'bg-green-50',  text: 'text-green-700',  desc: 'Best-in-class operations' },
} as const;

interface Props {
  score: number;
  label: keyof typeof SCORE_CONFIG;
  summary: string;
}

export function ScoreCard({ score, label, summary }: Props) {
  const config = SCORE_CONFIG[label];
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
        {/* SVG gauge */}
        <div className="relative flex-shrink-0">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="12" />
            <circle
              cx="70" cy="70" r={radius}
              fill="none"
              stroke={config.ring}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{score}%</span>
            <span className="text-xs text-gray-400">AI Ready</span>
          </div>
        </div>

        <div>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${config.bg} ${config.text}`}>
            {label} — {config.desc}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Your AI Readiness Score</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
}
