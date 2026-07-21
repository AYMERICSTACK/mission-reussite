import type { NarrativeSeason } from "@/lib/narrative/types";

/**
 * La Saison 2 est volontairement déclarée sans chapitre jouable.
 * Elle devient visible à la fin de la Saison 1 et accueillera la prochaine campagne.
 */
export const season02: NarrativeSeason = {
  id: "season-02",
  slug: "les-iles-du-temps",
  number: 2,
  title: "Les Îles du Temps",
  subtitle: "Une nouvelle constellation vient de s’éveiller.",
  synopsis: "Les horloges des mondes se dérèglent et des îles oubliées apparaissent dans le ciel. La prochaine aventure est débloquée et sera bientôt disponible.",
  chapters: [],
};
