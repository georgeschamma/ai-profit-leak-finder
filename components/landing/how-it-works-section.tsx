import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardList, Brain, FileText } from 'lucide-react';

const STEPS = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Answer 15 Questions',
    description:
      'Tell us about your team, your manual processes, how you handle customers, and your current tools. No tech knowledge required.',
  },
  {
    icon: Brain,
    step: '02',
    title: 'AI Analyzes Your Operations',
    description:
      'Our AI benchmarks your answers against 500+ SMBs and identifies your highest-impact profit leak opportunities.',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Get Your Personalized Report',
    description:
      'Receive a ranked list of profit leaks, estimated annual savings per opportunity, and a clear 90-day action plan.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          From your first answer to a personalized profit report in under 5 minutes.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {STEPS.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative">
              <div className="text-6xl font-bold text-gray-100 mb-3 leading-none">{step}</div>
              <div className="w-10 h-10 bg-[#0F2847] rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/assessment">
            <Button
              size="lg"
              className="bg-[#0F2847] hover:bg-[#1E3A5F] text-white px-8 py-4"
            >
              Start Your Free Assessment
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
