import Link from "next/link";
import { MissionLogo } from "@/components/brand/MissionLogo";
import { ProfileCard } from "@/components/home/ProfileCard";
import { prisma } from "@/lib/db/prisma";
import { requireAccount } from "@/lib/auth/session";
export const dynamic = "force-dynamic";
export default async function Home() {
  const account = await requireAccount();
  const children = await prisma.child.findMany({
    where: { familyId: account.family!.id },
    orderBy: { createdAt: "asc" },
  });
  return (
    <main className="home-shell">
      <div className="sky sky--one" aria-hidden="true" />
      <div className="sky sky--two" aria-hidden="true" />
      <div className="star-field" aria-hidden="true">
        {Array.from({ length: 22 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <nav className="home-nav">
        <MissionLogo />
        <div className="home-nav__actions">
          <Link className="parent-access" href="/family">
            Gérer ma famille
          </Link>
          <Link className="parent-access" href="/parent">
            Espace parents
          </Link>
          <form action="/api/auth/logout" method="post">
            <button className="parent-access" type="submit">
              Déconnexion
            </button>
          </form>
        </div>
      </nav>
      <section className="home-hero">
        <div className="home-hero__pill">
          <span>✦</span> Une aventure unique pour chaque enfant
        </div>
        <h1>
          Apprendre devient<span>une aventure.</span>
        </h1>
        <p className="home-hero__intro">
          Chaque enfant retrouve son prénom, son monde, ses quêtes et une
          progression qui lui appartient.
        </p>
        <div className="profile-grid">
          {children.map((c) => (
            <ProfileCard
              key={c.slug}
              firstName={c.firstName}
              mission={c.grade}
              description={
                c.objective ??
                (c.track === "leony"
                  ? "Méthode, autonomie et défis adaptés au collège."
                  : "Lecture, calcul et aventures adaptées à son niveau.")
              }
              badge={c.track === "leony" ? "Stratège" : "Explorateur"}
              tone={c.track === "leony" ? "sixth" : "ce2"}
              icon={c.track === "leony" ? "compass" : "rocket"}
              href={`/mission/${c.slug}`}
            />
          ))}
        </div>
        <div className="home-add-child-wrapper">
          <p className="home-add-child-label">
            Une nouvelle aventure commence ici
          </p>

          <Link href="/family" className="home-add-child">
            Ajouter un enfant
          </Link>
        </div>
      </section>
    </main>
  );
}
