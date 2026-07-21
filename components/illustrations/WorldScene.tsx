import Image from "next/image";
import { WORLD_ART } from "@/lib/art/art-pack";
import styles from "./WorldScene.module.css";

export type WorldSceneId = "forest" | "city" | "valley" | "mountain" | "ocean" | "desert" | "stars";

type WorldSceneProps = {
  scene: WorldSceneId;
  locked?: boolean;
  className?: string;
  priority?: boolean;
};

export function WorldScene({ scene, locked = false, className, priority = false }: WorldSceneProps) {
  const art = WORLD_ART[scene];

  return (
    <span className={[styles.scene, styles[scene], art.image ? styles.hasArtwork : "", locked ? styles.locked : "", className].filter(Boolean).join(" ")} aria-hidden="true">
      {art.image ? (
        <Image className={styles.artwork} src={art.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" priority={priority} style={{ objectPosition: art.focalPoint }} />
      ) : (
        <>
          <span className={styles.sky} />
          <span className={styles.sun} />
          <span className={styles.cloudOne} />
          <span className={styles.cloudTwo} />
          <span className={styles.backdrop} />
          <span className={styles.landOne} />
          <span className={styles.landTwo} />
          <span className={styles.landThree} />
          <span className={styles.path} />
          <span className={styles.sparkOne}>✦</span>
          <span className={styles.sparkTwo}>✦</span>
        </>
      )}
      <span className={styles.lightWash} />
      <span className={styles.lockIcon}>🔒</span>
    </span>
  );
}
