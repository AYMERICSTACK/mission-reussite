"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./FamilyManager.module.css";

type Child = {
  slug: string;
  firstName: string;
  grade: string;
  age: number | null;
  interests: string[];
  objective: string | null;
  track: string;
};

type FamilyManagerProps = {
  initialFamilyName: string;
  initialChildren: Child[];
};

type FamilyResponse = {
  family?: {
    name?: string | null;
    children?: Child[];
  } | null;
};

const interestOptions = [
  "Animaux",
  "Chevaux",
  "Football",
  "Dessin",
  "Espace",
  "Dinosaures",
  "Lecture",
  "Musique",
  "Cuisine",
  "Jeux vidéo",
];

const interestIcons: Record<string, string> = {
  Animaux: "🐾",
  Chevaux: "🐴",
  Football: "⚽",
  Dessin: "🎨",
  Espace: "🚀",
  Dinosaures: "🦕",
  Lecture: "📚",
  Musique: "🎵",
  Cuisine: "🧁",
  "Jeux vidéo": "🎮",
};

const emptyForm = {
  firstName: "",
  grade: "CE2",
  age: "8",
  objective: "Consolider les bases",
  interests: [] as string[],
};

export function FamilyManager({
  initialFamilyName,
  initialChildren,
}: FamilyManagerProps) {
  const [familyName, setFamilyName] = useState(initialFamilyName);
  const [children, setChildren] = useState<Child[]>(initialChildren);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [childToDelete, setChildToDelete] = useState<Child | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function refreshFamily() {
    const response = await fetch("/api/family", { cache: "no-store" });
    if (!response.ok) throw new Error("Impossible de rafraîchir la famille.");

    const data = (await response.json()) as FamilyResponse;
    setFamilyName(data.family?.name ?? "Ma famille");
    setChildren(data.family?.children ?? []);
  }

  async function deleteChild() {
    if (!childToDelete) return;

    const child = childToDelete;
    setDeletingSlug(child.slug);
    setError(null);

    try {
      const response = await fetch("/api/family", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: child.slug }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Impossible de supprimer ce profil.");
      }

      setChildren((current) =>
        current.filter((currentChild) => currentChild.slug !== child.slug),
      );
      setChildToDelete(null);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Une erreur est survenue pendant la suppression.",
      );
    } finally {
      setDeletingSlug(null);
    }
  }

  async function add(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "Impossible de créer ce profil.");
      }

      setForm(emptyForm);
      await refreshFamily();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Une erreur est survenue pendant la création.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={styles.shell}>
      <nav className={styles.topbar} aria-label="Navigation famille">
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>★</span>
          <span>Mission Réussite</span>
        </Link>
        <Link href="/" className={styles.back}>
          <span aria-hidden="true">←</span> Retour à l’accueil
        </Link>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Espace famille</p>
          <h1>{familyName}</h1>
          <p>
            Un parcours unique pour chaque enfant, avec son prénom, ses goûts,
            ses progrès et une aventure qui évolue à son rythme.
          </p>
          <div className={styles.heroStats}>
            <span>🧒 {children.length} explorateur{children.length > 1 ? "s" : ""}</span>
            <span>✨ Progressions séparées</span>
            <span>🌍 Univers personnalisés</span>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.orbit}>
            <div className={styles.orbitCenter}>🏡</div>
            <span className={styles.orbitChild}>A</span>
            <span className={styles.orbitChild}>L</span>
          </div>
        </div>
      </header>

      <section className={styles.content}>
        <section className={`${styles.panel} ${styles.childrenPanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Les profils</p>
              <h2>Les explorateurs de la famille</h2>
            </div>
            <span className={styles.countBadge}>{children.length}</span>
          </div>

          {children.length ? (
            <div className={styles.childGrid}>
              {children.map((child) => {
                const isCollege = child.track === "leony";
                return (
                  <article className={styles.childCard} key={child.slug}>
                    <div
                      className={`${styles.childAvatar} ${
                        isCollege ? styles.childAvatarCollege : ""
                      }`}
                    >
                      {child.firstName.slice(0, 1).toUpperCase()}
                    </div>

                    <div className={styles.childInfo}>
                      <div className={styles.childTopline}>
                        <h3>{child.firstName}</h3>
                        <span className={styles.gradeBadge}>{child.grade}</span>
                      </div>
                      <p className={styles.childMeta}>
                        {child.age ? `${child.age} ans · ` : ""}
                        {child.objective ?? "Parcours personnalisé"}
                      </p>
                      <div className={styles.interests}>
                        {(child.interests.length
                          ? child.interests.slice(0, 4)
                          : ["Aventure"]
                        ).map((interest) => (
                          <span key={interest}>
                            {interestIcons[interest] ?? "✦"} {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.childActions}>
                      <Link
                        href={`/mission/${child.slug}`}
                        className={styles.openButton}
                      >
                        Ouvrir l’aventure →
                      </Link>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setChildToDelete(child)}
                        aria-label={`Supprimer le profil de ${child.firstName}`}
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span>🧭</span>
              <strong>Aucun explorateur pour le moment</strong>
              <p>Crée le premier profil pour ouvrir son aventure personnalisée.</p>
            </div>
          )}
        </section>

        <form className={`${styles.panel} ${styles.formPanel}`} onSubmit={add}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Nouveau profil</p>
              <h2>Ajouter un enfant</h2>
            </div>
            <span className={styles.countBadge}>＋</span>
          </div>

          <div className={styles.formIntro}>
            <span>✨</span>
            <p>
              Quelques informations suffisent pour attribuer le bon univers et
              personnaliser les futures aventures de Nova.
            </p>
          </div>

          {error ? <p className={styles.error}>{error}</p> : null}

          <label className={styles.field}>
            <span>Prénom de l’enfant</span>
            <input
              required
              maxLength={40}
              placeholder="Ex. Élise"
              value={form.firstName}
              onChange={(event) =>
                setForm({ ...form, firstName: event.target.value })
              }
            />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Classe</span>
              <select
                value={form.grade}
                onChange={(event) =>
                  setForm({ ...form, grade: event.target.value })
                }
              >
                <option>CP</option>
                <option>CE1</option>
                <option>CE2</option>
                <option>CM1</option>
                <option>CM2</option>
                <option>6e</option>
              </select>
            </label>

            <label className={styles.field}>
              <span>Âge</span>
              <input
                type="number"
                min="5"
                max="18"
                value={form.age}
                onChange={(event) =>
                  setForm({ ...form, age: event.target.value })
                }
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>Objectif principal</span>
            <select
              value={form.objective}
              onChange={(event) =>
                setForm({ ...form, objective: event.target.value })
              }
            >
              <option>Consolider les bases</option>
              <option>Retrouver confiance</option>
              <option>Approfondir</option>
              <option>Préparer la rentrée</option>
            </select>
          </label>

          <fieldset className={styles.fieldset}>
            <legend>Ses centres d’intérêt</legend>
            <div className={styles.interestGrid}>
              {interestOptions.map((interest) => {
                const selected = form.interests.includes(interest);
                return (
                  <button
                    type="button"
                    aria-pressed={selected}
                    className={`${styles.interestButton} ${
                      selected ? styles.interestSelected : ""
                    }`}
                    key={interest}
                    onClick={() =>
                      setForm({
                        ...form,
                        interests: selected
                          ? form.interests.filter((item) => item !== interest)
                          : [...form.interests, interest],
                      })
                    }
                  >
                    {interestIcons[interest]} {interest}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <button className={styles.submit} disabled={saving}>
            <span>{saving ? "⏳" : "🚀"}</span>
            {saving ? "Création du parcours…" : "Créer son aventure"}
          </button>
        </form>
      </section>

      {childToDelete ? (
        <div className={styles.modalBackdrop} role="presentation">
          <section
            className={styles.confirmModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-profile-title"
          >
            <div className={styles.modalIcon} aria-hidden="true">🗑️</div>
            <p className={styles.panelLabel}>Suppression définitive</p>
            <h2 id="delete-profile-title">Supprimer {childToDelete.firstName} ?</h2>
            <p>
              Son parcours, ses missions terminées, son avatar et toutes ses
              récompenses seront définitivement supprimés.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setChildToDelete(null)}
                disabled={deletingSlug === childToDelete.slug}
              >
                Annuler
              </button>
              <button
                type="button"
                className={styles.confirmDeleteButton}
                onClick={deleteChild}
                disabled={deletingSlug === childToDelete.slug}
              >
                {deletingSlug === childToDelete.slug
                  ? "Suppression…"
                  : "Oui, supprimer le profil"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
