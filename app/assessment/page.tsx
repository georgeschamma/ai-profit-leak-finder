'use client';

import { useFormStore } from '@/store/form-store';
import { EmailCaptureStep } from '@/components/assessment/email-capture-step';
import { QuestionStep } from '@/components/assessment/question-step';
import { StepIndicator } from '@/components/assessment/step-indicator';
import { SECTIONS, QUESTIONS } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function AssessmentPage() {
  const { currentStep, lead, answers, setSubmissionId } = useFormStore();
  const router = useRouter();

  const questionsBySection = SECTIONS.map((section) => ({
    section,
    questions: QUESTIONS.filter((q) => q.section === section.id),
  }));

  const handleSubmit = async () => {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead, answers }),
    });

    if (res.ok) {
      const data = await res.json();
      setSubmissionId(data.submissionId);
      router.push(`/results/${data.submissionId}`);
    } else {
      const err = await res.json();
      alert(err.error || 'Something went wrong. Please try again.');
    }
  };

  // Step 0 = email capture
  if (currentStep === 0) {
    return <EmailCaptureStep />;
  }

  const sectionIndex = currentStep - 1; // 0-indexed
  const sectionData = questionsBySection[sectionIndex];

  if (!sectionData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={SECTIONS.length}
          sections={SECTIONS}
        />
      </div>
      <QuestionStep
        section={sectionData.section}
        questions={sectionData.questions}
        isLastStep={currentStep === SECTIONS.length}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
