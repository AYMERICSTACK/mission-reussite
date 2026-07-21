import Link from "next/link";

type ProfileCardProps = {
  firstName: string;
  mission: string;
  description: string;
  badge: string;
  tone: "ce2" | "sixth";
  icon: "rocket" | "compass";
  href: string;
};

function MissionIcon({ icon }: Pick<ProfileCardProps, "icon">) {
  if (icon === "rocket") {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M57.8 17.8c10.7-5.4 20.1-4.7 20.1-4.7s.7 9.4-4.7 20.1L59.6 60.4 35.6 36.4l22.2-18.6Z" />
        <path d="M36 37 23.5 38.8 14 48.3l20.3 3.4M59 60l-1.7 12.5L47.7 82l-3.4-20.3" />
        <circle cx="61.5" cy="30.5" r="8.5" />
        <path className="icon-accent" d="M31.5 57.5c-8.3 1.1-13.8 6.6-15 15 8.4-1.2 13.9-6.7 15-15Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r="31" />
      <circle cx="48" cy="48" r="24" />
      <path d="m57.8 38.2-6.2 13.4-13.4 6.2 6.2-13.4 13.4-6.2Z" />
      <path className="icon-accent" d="M48 10v8M48 78v8M10 48h8M78 48h8" />
    </svg>
  );
}

export function ProfileCard({
  firstName,
  mission,
  description,
  badge,
  tone,
  icon,
  href,
}: ProfileCardProps) {
  return (
    <article className={`profile-card profile-card--${tone}`}>
      <div className="profile-card__glow" aria-hidden="true" />
      <header className="profile-card__topline">
        <span className="profile-card__badge">{badge}</span>
        <span className="profile-card__status">
          <span aria-hidden="true" /> Prêt pour l&apos;aventure
        </span>
      </header>

      <div className="profile-card__content">
        <div className="profile-card__illustration">
          <span className="profile-card__orbit" aria-hidden="true" />
          <MissionIcon icon={icon} />
        </div>

        <div className="profile-card__copy">
          <p className="profile-card__eyebrow">Parcours de {firstName}</p>
          <h2>{mission}</h2>
          <p>{description}</p>
        </div>
      </div>

      <Link className="profile-card__button" href={href}>
        Commencer la mission
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 5 7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}
