'use client';

import { Slider } from '@/components/ui/slider';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export function SliderInput({ value, onChange, min = 0, max = 100, step = 5, unit = '%' }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{min}{unit}</span>
        <div className="text-center">
          <span className="text-3xl font-bold text-[#0F2847]">{value}</span>
          <span className="text-lg text-[#0F2847] ml-1">{unit}</span>
        </div>
        <span className="text-sm text-gray-500">{max}{unit}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
}
