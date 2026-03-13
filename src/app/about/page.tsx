import { BAND, MEMBERS } from '@/lib/constants';
import MemberCard from '@/components/about/MemberCard';
import PressQuotes from '@/components/about/PressQuotes';
import BandInfo from '@/components/about/BandInfo';
import AnimatedText from '@/components/ui/AnimatedText';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 pt-32 pb-24 md:px-12 lg:px-24">
      {/* Page Header */}
      <section className="mb-24">
        <AnimatedText
          text="THE DUO"
          className="text-7xl md:text-9xl font-bold uppercase tracking-tight mb-6"
        />
        <RevealOnScroll delay={0.2}>
          <p className="text-lg text-smoke max-w-2xl leading-relaxed">
            {BAND.bio}
          </p>
        </RevealOnScroll>
      </section>

      {/* Members */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <RevealOnScroll direction="left">
          <MemberCard
            name={MEMBERS[0].name}
            fullName={MEMBERS[0].fullName}
            role={MEMBERS[0].role}
            bio={MEMBERS[0].bio}
            extraBio="Music Norway Change Agent (2022–2024). Collaborations with Ol' Burger Beats, GiddyGang."
            instagram={MEMBERS[0].instagram}
            spotify={MEMBERS[0].spotify}
          />
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.15}>
          <MemberCard
            name={MEMBERS[1].name}
            fullName={MEMBERS[1].fullName}
            role={MEMBERS[1].role}
            bio={MEMBERS[1].bio}
            instagram={MEMBERS[1].instagram}
          />
          </RevealOnScroll>
        </div>
      </section>

      {/* Press Quotes */}
      <RevealOnScroll>
        <section className="mb-32 max-w-3xl">
          <PressQuotes />
        </section>
      </RevealOnScroll>

      {/* Band Info & Connect */}
      <section>
        <BandInfo />
      </section>
    </div>
  );
}
