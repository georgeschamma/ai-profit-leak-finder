'use client';

import { useState } from 'react';
import { useFormStore } from '@/store/form-store';
import { RadioCards } from './question-types/radio-cards';
import { CheckboxCards } from './question-types/checkbox-cards';
import { SliderInput } from './question-types/slider-input';
import { TextInput } from './question-types/text-input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import type { Question, SectionMeta } from '@/lib/constants';

interface Props {
  section: SectionMeta;
  questions: Question[];
  isLastStep: boolean;
  onSubmit: () => Promise<void>;
}

export function QuestionStep({ section, questions, isLastStep, onSubmit }: Props) {
  const { answers, setAnswer, nextStep, prevStep, currentStep } = useFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const q of questions) {
      if (!q.required) continue;
      const val = answers[q.id];
      if (q.type === 'checkbox-cards') {
        if (!val || (val as string[]).length === 0) {
          newErrors[q.id] = 'Please select at least one option';
        }
      } else if (q.type === 'slider') {
        // slider always has a value (defaults to midpoint)
      } else {
        if (!val || String(val).trim() === '') {
          newErrors[q.id] = 'This field is required';
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (isLastStep) {
      setSubmitting(true);
      try {
        await onSubmit();
      } finally {
        setSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  const renderQuestion = (q: Question) => {
    const rawVal = answers[q.id];

    if (q.type === 'radio-cards') {
      return (
        <RadioCards
          options={q.options!}
          value={(rawVal as string) || ''}
          onChange={(v) => setAnswer(q.id, v)}
        />
      );
    }
    if (q.type === 'checkbox-cards') {
      return (
        <CheckboxCards
          options={q.options!}
          value={(rawVal as string[]) || []}
          onChange={(v) => setAnswer(q.id, v)}
        />
      );
    }
    if (q.type === 'slider') {
      return (
        <SliderInput
          value={rawVal !== undefined ? Number(rawVal) : (q.min ?? 0) + ((q.max ?? 100) - (q.min ?? 0)) / 2}
          onChange={(v) => setAnswer(q.id, String(v))}
          min={q.min}
          max={q.max}
          step={q.step}
          unit={q.unit}
        />
      );
    }
    if (q.type === 'text') {
      return (
        <TextInput
          value={(rawVal as string) || ''}
          onChange={(v) => setAnswer(q.id, v)}
          placeholder={q.placeholder}
        />
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-gray-900 leading-snug mb-1">
                  {q.text}
                </h2>
                {q.subText && (
                  <p className="text-sm text-gray-400">{q.subText}</p>
                )}
              </div>
              {renderQuestion(q)}
              {errors[q.id] && (
                <p className="text-red-500 text-xs mt-3">{errors[q.id]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep <= 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            className="bg-[#0F2847] hover:bg-[#1E3A5F] text-white gap-2 px-6"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : isLastStep ? (
              <>
                Get My Report
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Next Section
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
