'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EmailCaptureData } from '@/lib/validations';

interface FormState {
  lead: EmailCaptureData | null;
  answers: Record<string, string | string[]>;
  currentStep: number;
  submissionId: number | null;

  setLead: (lead: EmailCaptureData) => void;
  setAnswer: (questionId: string, value: string | string[]) => void;
  setAnswers: (answers: Record<string, string | string[]>) => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSubmissionId: (id: number) => void;
  reset: () => void;
}

const TOTAL_STEPS = 6; // 0 (email capture) + 5 sections

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      lead: null,
      answers: {},
      currentStep: 0,
      submissionId: null,

      setLead: (lead) => set({ lead }),
      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: value },
        })),
      setAnswers: (newAnswers) =>
        set((state) => ({
          answers: { ...state.answers, ...newAnswers },
        })),
      goToStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),
      setSubmissionId: (id) => set({ submissionId: id }),
      reset: () =>
        set({ lead: null, answers: {}, currentStep: 0, submissionId: null }),
    }),
    {
      name: 'profit-leak-form',
      partialize: (state) => ({
        lead: state.lead,
        answers: state.answers,
        currentStep: state.currentStep,
      }),
    }
  )
);
