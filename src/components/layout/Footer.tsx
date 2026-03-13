import { BAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-steel/50 px-6 py-6">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-smoke">
        {/* Left: Copyright */}
        <span className="uppercase">
          {BAND.name} &copy; {new Date().getFullYear()}
        </span>

        {/* Center: Label */}
        <span className="uppercase text-smoke/60">NORTH OF</span>

        {/* Right: Social links */}
        <div className="flex items-center gap-4">
          <a
            href={BAND.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase hover:text-wire transition-colors duration-300"
          >
            IG
          </a>
          <a
            href={BAND.socials.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase hover:text-wire transition-colors duration-300"
          >
            SP
          </a>
          <a
            href={BAND.socials.appleMusic}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase hover:text-wire transition-colors duration-300"
          >
            AM
          </a>
          <a
            href={BAND.socials.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase hover:text-wire transition-colors duration-300"
          >
            SC
          </a>
        </div>
      </div>
    </footer>
  );
}
