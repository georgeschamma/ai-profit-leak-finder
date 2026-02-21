'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '@/store/form-store';
import { emailCaptureSchema, INDUSTRY_OPTIONS, type EmailCaptureData } from '@/lib/validations';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';

export function EmailCaptureStep() {
  const { setLead, nextStep } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailCaptureData>({
    resolver: zodResolver(emailCaptureSchema),
  });

  const onSubmit = (data: EmailCaptureData) => {
    setLead(data);
    nextStep();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Step 1 of 6 — Your Details
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Where should we send your report?
          </h1>
          <p className="text-gray-500 text-sm">
            We need a few details to personalize your analysis and send you the PDF report.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Your Name
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Jane Smith"
                className="mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <Input
                id="company"
                {...register('company')}
                placeholder="Acme Consulting"
                className="mt-1"
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Work Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="jane@acme.com"
                className="mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                Industry
              </Label>
              <select
                id="industry"
                {...register('industry')}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select your industry…</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0F2847] hover:bg-[#1E3A5F] text-white py-3 text-base font-semibold"
            >
              Start Assessment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs">
              <Lock className="w-3 h-3" />
              Your data is private and never sold. Unsubscribe any time.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
