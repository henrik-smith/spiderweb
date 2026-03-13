const quotes = [
  {
    text: '"Noe av det kuleste og mest unorske"',
    translation: 'Some of the coolest and most un-Norwegian',
    source: 'NRK P3',
  },
  {
    text: '"Passer like godt inn på en mørk kjellerklubb i London, så vel som på catwalken"',
    translation: 'Fits equally in a dark basement club in London or on a catwalk',
    source: 'Press',
  },
];

export default function PressQuotes() {
  return (
    <section className="press-quote">
      <h3 className="font-mono text-xs tracking-[0.3em] text-smoke uppercase mb-12">
        Press
      </h3>

      <div className="space-y-12">
        {quotes.map((quote, i) => (
          <blockquote
            key={i}
            className="border-l-2 border-spark pl-6 md:pl-10"
          >
            <p className="text-2xl md:text-4xl italic leading-snug mb-3">
              {quote.text}
            </p>
            <p className="text-sm text-smoke italic mb-2">
              ({quote.translation})
            </p>
            <cite className="font-mono text-xs tracking-[0.2em] text-smoke not-italic">
              — {quote.source}
            </cite>
          </blockquote>
        ))}
      </div>

      <p className="mt-12 font-mono text-sm tracking-[0.15em] text-smoke italic">
        Luksuriøs
      </p>
    </section>
  );
}
