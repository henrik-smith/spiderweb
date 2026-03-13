interface MemberCardProps {
  name: string;
  fullName: string;
  role: string;
  bio: string;
  extraBio?: string;
  instagram?: string;
  spotify?: string;
}

export default function MemberCard({
  name,
  fullName,
  role,
  bio,
  extraBio,
  instagram,
  spotify,
}: MemberCardProps) {
  const initial = name.charAt(0);

  return (
    <div className="member-card">
      {/* Photo placeholder */}
      <div className="aspect-[3/4] bg-concrete flex items-center justify-center mb-8">
        <span className="text-8xl md:text-9xl font-bold text-steel select-none">
          {initial}
        </span>
      </div>

      {/* Name */}
      <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-2">
        {name}
      </h2>

      {/* Role */}
      <p className="font-mono text-sm tracking-[0.2em] text-smoke uppercase mb-1">
        {role}
      </p>

      {/* Full name */}
      <p className="font-mono text-xs text-smoke mb-6">{fullName}</p>

      {/* Bio */}
      <p className="text-smoke leading-relaxed mb-2">{bio}</p>
      {extraBio && (
        <p className="text-smoke leading-relaxed mb-6">{extraBio}</p>
      )}
      {!extraBio && <div className="mb-6" />}

      {/* Social links */}
      <div className="flex gap-6 font-mono text-xs tracking-[0.15em]">
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-smoke hover:text-wire transition-colors uppercase"
          >
            Instagram
          </a>
        )}
        {spotify && (
          <a
            href={spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-smoke hover:text-wire transition-colors uppercase"
          >
            Spotify
          </a>
        )}
      </div>
    </div>
  );
}
