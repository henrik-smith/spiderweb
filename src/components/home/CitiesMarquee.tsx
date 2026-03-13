import { BAND } from '@/lib/constants';

export default function CitiesMarquee() {
  const text = BAND.cities.join(' \u00B7 ');
  // Repeat enough times to fill the screen and loop seamlessly
  const repeated = Array.from({ length: 8 }, () => text).join(' \u00B7 ');

  return (
    <div className="overflow-hidden border-y border-ash py-4">
      <div className="marquee-track flex whitespace-nowrap">
        <span className="marquee-segment font-mono text-xs tracking-[0.3em] text-smoke uppercase">
          {repeated} &middot;&nbsp;
        </span>
        <span className="marquee-segment font-mono text-xs tracking-[0.3em] text-smoke uppercase">
          {repeated} &middot;&nbsp;
        </span>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-segment {
          flex-shrink: 0;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
