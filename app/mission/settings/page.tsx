import Link from "next/link";
import { MissionLogo } from "@/components/brand/MissionLogo";
import { SoundSettingsPanel } from "@/components/audio/SoundSettingsPanel";
import styles from "./SettingsPage.module.css";

export default function MissionSettingsPage() {
  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <Link href="/" aria-label="Retour à l’accueil">
          <MissionLogo compact />
        </Link>
        <Link className={styles.close} href="/">
          Fermer
        </Link>
      </header>

      <section className={styles.card}>
        <span className={styles.eyebrow}>V17 · Ambiance sonore et effets</span>
        <h1 className={styles.title}>Mes préférences d’immersion</h1>
        <p className={styles.subtitle}>
          Choisis le niveau de musique, d’effets et d’animations qui te convient.
        </p>
        <SoundSettingsPanel />
      </section>
    </main>
  );
}
