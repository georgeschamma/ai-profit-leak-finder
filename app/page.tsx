import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { PainPointsSection } from '@/components/landing/pain-points-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PainPointsSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
