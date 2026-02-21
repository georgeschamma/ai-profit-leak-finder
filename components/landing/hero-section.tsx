'use client';

import Link from 'next/link';
import { ArrowRight, Clock, DollarSign, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="bg-[#0F2847] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#1E3A5F] text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Free 5-Minute Assessment — No Credit Card Required
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-balance">
          Your Business Is Losing{' '}
          <span className="text-green-400">$47,000+</span> a Year to Inefficiency.
        </h1>

        <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Answer 15 questions about how your business operates. We will identify exactly
          where you are bleeding time and money — and show you how AI can stop it.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: Clock,        text: '5 minutes to complete' },
            { icon: DollarSign,   text: 'Completely free' },
            { icon: TrendingDown, text: 'Personalized to your business' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-blue-300 text-sm">
              <Icon className="w-4 h-4 text-green-400" />
              {text}
            </div>
          ))}
        </div>

        <Link href="/assessment">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-400 text-white text-lg px-8 py-6 rounded-xl font-semibold shadow-lg shadow-green-900/20 transition-all duration-200 hover:scale-105"
          >
            Find My Profit Leaks
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>

        <p className="text-blue-400 text-xs mt-4">
          Trusted by 500+ business owners · Results in under 60 seconds
        </p>
      </div>
    </section>
  );
}
