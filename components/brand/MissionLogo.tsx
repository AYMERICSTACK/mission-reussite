type MissionLogoProps = {
  compact?: boolean;
};

export function MissionLogo({ compact = false }: MissionLogoProps) {
  return (
    <div className="mission-logo" aria-label="Mission Réussite">
      <span className="mission-logo__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img">
          <path d="M24 3.5 29.7 16l13.5 1.4-10.1 9.1 3 13.2L24 33l-12.1 6.7 3-13.2-10.1-9.1L18.3 16 24 3.5Z" />
          <path className="mission-logo__spark" d="m24 12 2.7 6 6.5.7-4.9 4.4 1.5 6.4-5.8-3.2-5.8 3.2 1.5-6.4-4.9-4.4 6.5-.7L24 12Z" />
        </svg>
      </span>
      <span className="mission-logo__text">
        <strong>Mission</strong>
        {!compact && <em>Réussite</em>}
      </span>
    </div>
  );
}
