export type AmbienceId = "forest" | "city" | "ocean" | "volcano" | "ice" | "space" | "quiet";

export type AmbienceProfile = {
  baseFrequency: number;
  secondaryFrequency: number;
  volume: number;
  fadeMs: number;
  wave: OscillatorType;
};

export const AMBIENCES: Record<AmbienceId, AmbienceProfile> = {
  forest: { baseFrequency: 174, secondaryFrequency: 261, volume: 0.012, fadeMs: 900, wave: "sine" },
  city: { baseFrequency: 220, secondaryFrequency: 330, volume: 0.011, fadeMs: 850, wave: "triangle" },
  ocean: { baseFrequency: 110, secondaryFrequency: 165, volume: 0.014, fadeMs: 1100, wave: "sine" },
  volcano: { baseFrequency: 73, secondaryFrequency: 110, volume: 0.012, fadeMs: 800, wave: "triangle" },
  ice: { baseFrequency: 294, secondaryFrequency: 440, volume: 0.009, fadeMs: 1200, wave: "sine" },
  space: { baseFrequency: 98, secondaryFrequency: 196, volume: 0.01, fadeMs: 1400, wave: "sine" },
  quiet: { baseFrequency: 196, secondaryFrequency: 294, volume: 0.006, fadeMs: 700, wave: "sine" },
};

export function ambienceFromWorld(world?: string): AmbienceId {
  const value = (world ?? "").toLowerCase();
  if (value.includes("forêt") || value.includes("foret")) return "forest";
  if (value.includes("cité") || value.includes("cite") || value.includes("ville")) return "city";
  if (value.includes("océan") || value.includes("ocean") || value.includes("rivière")) return "ocean";
  if (value.includes("volcan") || value.includes("feu")) return "volcano";
  if (value.includes("glace") || value.includes("banquise")) return "ice";
  if (value.includes("espace") || value.includes("étoile")) return "space";
  return "quiet";
}
