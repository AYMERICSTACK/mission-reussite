"use client";

import { useEffect, useState } from "react";
import { playSound, refreshAudioPreferences } from "@/lib/audio/audio-engine";
import {
  defaultAudioPreferences,
  loadAudioPreferences,
  saveAudioPreferences,
  type AudioPreferences,
} from "@/lib/audio/settings";
import styles from "./SoundSettingsPanel.module.css";

const options: Array<{
  key: keyof AudioPreferences;
  title: string;
  description: string;
  icon: string;
}> = [
  { key: "music", title: "Musiques et ambiances", description: "Active les ambiances douces propres à chaque monde.", icon: "🎵" },
  { key: "effects", title: "Effets sonores", description: "Joue les sons de validation, coffre, badge et interactions.", icon: "🔔" },
  { key: "animations", title: "Animations", description: "Affiche les halos, étoiles, gains d’XP et confettis légers.", icon: "✨" },
  { key: "economyMode", title: "Mode économie", description: "Réduit les animations, vibrations et effets secondaires.", icon: "🔋" },
  { key: "respectReducedMotion", title: "Respecter les préférences système", description: "Suit automatiquement le réglage de réduction des animations de l’appareil.", icon: "♿" },
];

export function SoundSettingsPanel() {
  const [preferences, setPreferences] = useState<AudioPreferences>(defaultAudioPreferences);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPreferences(loadAudioPreferences());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function update(key: keyof AudioPreferences) {
    const next = { ...preferences, [key]: !preferences[key] };
    setPreferences(next);
    saveAudioPreferences(next);
    refreshAudioPreferences();
    if (key === "effects" && next.effects) playSound("correct");
  }

  if (!ready) {
    return <div className={styles.loading}>Chargement des préférences…</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <span className={styles.introIcon}>🎧</span>
        <div>
          <strong>Une immersion qui reste sous ton contrôle</strong>
          <p>Chaque réglage est mémorisé uniquement sur cet appareil.</p>
        </div>
      </div>

      <div className={styles.list}>
        {options.map((option) => {
          const isEnabled = preferences[option.key];
          return (
            <button
              type="button"
              className={styles.setting}
              key={option.key}
              onClick={() => update(option.key)}
              aria-pressed={isEnabled}
            >
              <span className={styles.icon}>{option.icon}</span>
              <span className={styles.copy}>
                <strong>{option.title}</strong>
                <small>{option.description}</small>
              </span>
              <span className={`${styles.switch} ${isEnabled ? styles.switchOn : ""}`}>
                <i className={styles.switchDot} />
              </span>
            </button>
          );
        })}
      </div>

      <button type="button" className={styles.test} onClick={() => playSound("levelUp")}>
        Tester l’ambiance sonore
      </button>
    </div>
  );
}
