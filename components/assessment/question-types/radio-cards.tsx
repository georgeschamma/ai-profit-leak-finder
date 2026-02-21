'use client';

import type { QuestionOption } from '@/lib/constants';

interface Props {
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioCards({ options, value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`text-left p-4 rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400
              ${
                selected
                  ? 'border-[#0F2847] bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 transition-colors
                  ${selected ? 'border-[#0F2847] bg-[#0F2847]' : 'border-gray-300'}
                `}
              >
                {selected && (
                  <div className="w-full h-full rounded-full scale-50 bg-white" />
                )}
              </div>
              <div>
                <div className={`font-medium text-sm ${selected ? 'text-[#0F2847]' : 'text-gray-800'}`}>
                  {option.label}
                </div>
                {option.subLabel && (
                  <div className="text-xs text-gray-400 mt-0.5">{option.subLabel}</div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
