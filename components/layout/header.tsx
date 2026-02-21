import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0F2847] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <span className="font-bold text-[#0F2847] text-sm">AI Profit Finder</span>
        </Link>
        <Link
          href="/assessment"
          className="text-sm font-medium text-white bg-[#0F2847] px-4 py-2 rounded-lg hover:bg-[#1E3A5F] transition-colors"
        >
          Start Free Assessment
        </Link>
      </div>
    </header>
  );
}
