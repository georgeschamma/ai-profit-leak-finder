'use client';

import { Check } from 'lucide-react';
import type { QuestionOption } from '@/lib/constants';

interface Props {
  options: QuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function CheckboxCards({ options, value, onChange }: Props) {
  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => {
        const selected = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
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
                className={`w-4 h-4 rounded border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors
                  ${selected ? 'border-[#0F2847] bg-[#0F2847]' : 'border-gray-300'}
                `}
              >
                {selected && <Check className="w-3 h-3 text-white" />}
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
