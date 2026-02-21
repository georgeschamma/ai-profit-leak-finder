'use client';

import { Check } from 'lucide-react';
import type { SectionMeta } from '@/lib/constants';

interface Props {
  currentStep: number;
  totalSteps: number;
  sections: SectionMeta[];
}

export function StepIndicator({ currentStep, totalSteps, sections }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600">
          Section {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-gray-400">{sections[currentStep - 1]?.title}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-[#0F2847] h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        {sections.map((section) => {
          const done = section.id < currentStep;
          const active = section.id === currentStep;
          return (
            <div key={section.id} className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200
                  ${done ? 'bg-green-500 text-white' : ''}
                  ${active ? 'bg-[#0F2847] text-white ring-4 ring-blue-100' : ''}
                  ${!done && !active ? 'bg-gray-200 text-gray-400' : ''}
                `}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : section.id}
              </div>
              <span
                className={`text-xs hidden md:block ${
                  active ? 'text-[#0F2847] font-medium' : 'text-gray-400'
                }`}
              >
                {section.title.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
