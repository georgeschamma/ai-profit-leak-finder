'use client';

import { Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  submissionId: number;
  company: string;
}

export function CtaSection({ submissionId, company }: Props) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';

  const handleDownload = async () => {
    try {
      const res = await fetch(`/api/pdf/${submissionId}`);
      if (!res.ok) throw new Error('PDF generation failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AI-Profit-Leak-Report-${company.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Could not generate PDF. Please try again.');
    }
  };

  return (
    <div className="bg-[#0F2847] rounded-2xl p-8 text-center text-white">
      <div className="inline-block bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        Your Report Is Ready
      </div>
      <h2 className="text-2xl font-bold mb-3">Ready to Plug These Leaks?</h2>
      <p className="text-blue-200 mb-8 max-w-lg mx-auto leading-relaxed">
        Book a free 30-minute strategy call. We will walk through your top profit leaks
        and build you a concrete 90-day AI implementation plan — no tech expertise required.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-400 text-white w-full sm:w-auto text-base px-8 py-4 font-semibold shadow-lg shadow-green-900/30 transition-all hover:scale-105"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Book My Free Strategy Call
          </Button>
        </a>

        <Button
          variant="outline"
          size="lg"
          onClick={handleDownload}
          className="border-white/30 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto text-base px-8 py-4 bg-transparent"
        >
          <Download className="mr-2 w-5 h-5" />
          Download PDF Report
        </Button>
      </div>

      <p className="text-blue-400 text-xs mt-6">
        No obligation. No sales pitch. Just a conversation about your numbers.
      </p>
    </div>
  );
}
