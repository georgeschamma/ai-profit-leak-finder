'use client';

import { useEffect, useState } from 'react';
import { Brain, Search, BarChart3, FileText, Loader2 } from 'lucide-react';

const STEPS = [
  { icon: Search,    text: 'Scanning your operational data...' },
  { icon: Brain,     text: 'Benchmarking against 500+ SMBs...' },
  { icon: BarChart3, text: 'Calculating your savings potential...' },
  { icon: FileText,  text: 'Building your personalized report...' },
];

export default function AnalyzingPage() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F2847] flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md w-full">
        <div className="relative mb-10 flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-blue-800 border-t-green-400 rounded-full animate-spin" />
          <Brain className="w-10 h-10 text-green-400 absolute" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Analyzing Your Business</h2>
        <p className="text-blue-300 text-sm mb-10">
          This usually takes 15–30 seconds. Please stay on this page.
        </p>

        <div className="space-y-4 text-left bg-white/5 rounded-xl p-5">
          {STEPS.map((step, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            const Icon = step.icon;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 transition-opacity duration-500 ${
                  i > stepIndex ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    done ? 'text-green-400' : active ? 'text-blue-300' : 'text-gray-500'
                  }`}
                />
                <span
                  className={`text-sm flex-1 ${
                    done ? 'text-green-400' : active ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {step.text}
                </span>
                {done && <span className="text-green-400 text-xs font-medium">Done</span>}
                {active && <Loader2 className="w-4 h-4 animate-spin text-blue-300" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
