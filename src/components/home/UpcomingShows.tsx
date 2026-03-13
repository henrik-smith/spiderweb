import { UPCOMING_SHOWS } from '@/lib/constants';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
}

export default function UpcomingShows() {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-xs tracking-[0.3em] text-smoke">
          UPCOMING
        </span>

        <div className="mt-12 space-y-6">
          {UPCOMING_SHOWS.map((show) => (
            <div
              key={`${show.date}-${show.venue}`}
              className="border border-ash bg-concrete p-8 md:p-12"
            >
              <p className="text-3xl font-bold tracking-tight text-wire md:text-5xl">
                {formatDate(show.date)}
              </p>
              <h3 className="mt-4 text-xl font-bold uppercase tracking-wide text-wire md:text-2xl">
                {show.venue.toUpperCase()}
              </h3>
              <p className="mt-2 font-mono text-xs tracking-[0.2em] text-smoke">
                {show.stage.toUpperCase()} &middot; {show.time} &middot; {show.city.toUpperCase()}
              </p>

              <div className="mt-8">
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-smoke px-6 py-3 font-mono text-xs tracking-[0.2em] text-smoke transition-colors hover:border-wire hover:text-wire"
                >
                  TICKETS
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
