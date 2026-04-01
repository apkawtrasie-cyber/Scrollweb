import SplashScreen from "@/components/sections/SplashScreen";
import CardReveal from "@/components/sections/CardReveal";
import PageWrapper from "@/components/layout/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      {/* Splash + Hero (ScrollTrigger driven) */}
      <SplashScreen />

      {/* Card Reveal: skills spread to reveal photo */}
      <section id="next-section">
        <CardReveal />
      </section>

      {/* Next sections go here */}
      <section className="relative min-h-screen flex items-center justify-center">
        <p className="text-text-muted font-display text-2xl uppercase tracking-widest">
          Więcej wkrótce...
        </p>
      </section>
    </PageWrapper>
  );
}
