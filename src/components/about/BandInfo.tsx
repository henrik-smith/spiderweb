import { BAND } from '@/lib/constants';

export default function BandInfo() {
  return (
    <section className="band-info">
      <h3 className="font-mono text-xs tracking-[0.3em] text-smoke uppercase mb-12">
        The Project
      </h3>

      <p className="text-lg md:text-xl text-smoke leading-relaxed max-w-2xl mb-12">
        The music draws inspiration from the life and travels of the enigmatic
        figure Mario Dante — a world shrouded in mystery and intrigue.
      </p>

      <div className="space-y-6 font-mono text-sm tracking-[0.2em]">
        <div>
          <span className="text-smoke text-xs">Genre</span>
          <p className="text-wire mt-1">HOUSE · HIP-HOP · ELECTRONICA</p>
        </div>
        <div>
          <span className="text-smoke text-xs">Label</span>
          <p className="text-wire mt-1 uppercase">{BAND.label}</p>
        </div>
        <div>
          <span className="text-smoke text-xs">Cities</span>
          <p className="text-wire mt-1">{BAND.cities.join(' · ')}</p>
        </div>
      </div>

      {/* Connect */}
      <div className="mt-24">
        <h3 className="font-mono text-xs tracking-[0.3em] text-smoke uppercase mb-8">
          Connect
        </h3>

        <div className="flex flex-wrap gap-6 font-mono text-xs tracking-[0.15em] mb-8">
          {Object.entries(BAND.socials).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke hover:text-wire transition-colors uppercase"
            >
              {platform === 'appleMusic' ? 'Apple Music' : platform}
            </a>
          ))}
        </div>

        <p className="text-sm text-smoke">
          For bookings and press inquiries:{' '}
          <span className="text-wire font-mono text-xs">
            lenomdeguerre [at] gmail.com
          </span>
        </p>
      </div>
    </section>
  );
}
