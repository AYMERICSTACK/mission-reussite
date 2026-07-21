import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { requireAccount } from "@/lib/auth/session";
import { serializeAttempt, buildServerSummary } from "@/lib/progress/server-summary";
import { buildAdaptiveLearningProfile } from "@/lib/pedagogy/adaptive-learning";
import { ParentCooperationPanel } from "@/components/cooperation/ParentCooperationPanel";

export const dynamic = "force-dynamic";

export default async function ParentPage() {
  const account = await requireAccount();
  const family = await prisma.family.findUnique({
    where: { id: account.family!.id },
    include: {
      children: {
        orderBy: { createdAt: "asc" },
        include: { attempts: { orderBy: { completedAt: "desc" }, include: { child: true, mission: true } } },
      },
    },
  });

  return (
    <main className="family-shell">
      <header className="family-header">
        <div>
          <p className="family-eyebrow">Espace parents</p>
          <h1>{family?.name ?? "Ma famille"}</h1>
          <p>Une vue simple de la progression et du rythme choisi automatiquement pour chaque enfant.</p>
        </div>
        <div><Link className="family-back" href="/family">Gérer les profils</Link> <Link className="family-back" href="/">Accueil</Link></div>
      </header>

      <section className="parent-family-grid">
        {family?.children.map((child) => {
          const attempts = child.attempts.map(serializeAttempt);
          const summary = buildServerSummary(child, attempts);
          const adaptive = buildAdaptiveLearningProfile(child.track, attempts);
          return (
            <article className="parent-family-card" key={child.slug}>
              <div className={`family-avatar family-avatar--${child.track}`}>{child.firstName[0]}</div>
              <div><p className="family-eyebrow">{child.grade}</p><h2>{child.firstName}</h2></div>
              <div className="parent-family-kpis">
                <span><strong>{summary.totalXp}</strong> XP</span>
                <span><strong>{summary.completedMissions}</strong> quêtes</span>
                <span><strong>{summary.successRate}%</strong> réussite</span>
                <span><strong>{summary.totalMinutes}</strong> min</span>
              </div>
              <div className={`parent-family-adaptive parent-family-adaptive--${adaptive.pace}`}>
                <div><span>Professeur invisible</span><strong>{adaptive.pace === "gentle" ? "Rythme guidé" : adaptive.pace === "challenge" ? "Mode défi" : "Rythme équilibré"}</strong></div>
                <p>{adaptive.message}</p>
                <small>Difficulté cible {adaptive.targetDifficulty}/5 · {adaptive.revisionSkillIds.length ? `${adaptive.revisionSkillIds.length} révision(s) planifiée(s)` : "aucune révision urgente"}</small>
              </div>
              <p>{child.objective ?? "Parcours personnalisé en cours."}</p>
              <ParentCooperationPanel childSlug={child.slug} firstName={child.firstName} />
              <Link href={`/mission/${child.slug}`}>Voir son aventure →</Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
