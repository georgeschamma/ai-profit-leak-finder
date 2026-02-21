import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Profit Leak Finder — Find Where Your Business Is Losing Money',
  description:
    'Answer 15 questions about your operations and discover exactly where AI could recover $47,000+ per year in lost productivity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white">{children}</body>
    </html>
  );
}
