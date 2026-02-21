import { TrendingUp, Clock } from 'lucide-react';

interface Props {
  min: number;
  max: number;
  hours: number;
}

export function SavingsSummary({ min, max, hours }: Props) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
      <p className="text-sm font-medium text-green-700 mb-2">
        Total Annual Savings Opportunity Identified
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <span className="text-3xl font-bold text-green-800">
            ${min.toLocaleString()} – ${max.toLocaleString()}
          </span>
          <span className="text-green-600 font-medium">/year</span>
        </div>
        <div className="flex items-center gap-2 text-green-700">
          <Clock className="w-5 h-5" />
          <span className="text-lg font-semibold">{hours.toLocaleString()} hrs</span>
          <span className="text-sm text-green-600">recovered per year</span>
        </div>
      </div>
    </div>
  );
}
