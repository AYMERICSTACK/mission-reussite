import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter26: NarrativeChapter = {
  id: "season-01-chapter-26",
  slug: 'la-cite-perdue',
  number: 26,
  title: 'La Cité Perdue',
  subtitle: 'Les rues attendent le retour de leur lumière.',
  summary: 'Au-delà du labyrinthe, l’équipe découvre une cité figée dans une nuit artificielle. Les Veilleurs ont disparu et les portes ne répondent plus. Alyssio doit rallumer les cinq balises qui protègent la route du Cœur de Nova.',
  location: 'La Cité Perdue',
  symbol: '🏛️',
  isBoss: false,
  tracks: ["alyssio"],
  opening: [
    { speaker: 'Narrateur', text: 'Les tours de la cité émergent dans une brume violette. Aucune fenêtre ne brille.', mood: "worried" },
    { speaker: 'Lyra', text: 'Cette ville n’est pas abandonnée. Elle retient son souffle.', mood: "determined" },
    { speaker: 'Kael', text: 'Les balises ont été désaccordées. Alyssio, nous devons les remettre dans le bon ordre.', mood: "determined" }
  ],
  missions: [
    {
      id: "chapter-26-mission-01",
      title: 'Lire le plan effacé',
      activitySlug: "grande-bibliotheque-alyssio-147",
      objective: 'Repérer les informations utiles sur un plan ancien.',
      intro: [{ speaker: 'Oscar', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Nova', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-26-mission-02",
      title: 'Réparer les compteurs de lumière',
      activitySlug: "grande-bibliotheque-alyssio-148",
      objective: 'Calculer les écarts nécessaires pour rétablir chaque compteur.',
      intro: [{ speaker: 'Nova', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Oscar', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-26-mission-03",
      title: 'Classer les messages des Veilleurs',
      activitySlug: "grande-bibliotheque-alyssio-149",
      objective: 'Identifier noms, verbes et adjectifs dans les messages retrouvés.',
      intro: [{ speaker: 'Lyra', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Lyra', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-26-mission-04",
      title: 'Partager l’énergie des quartiers',
      activitySlug: "grande-bibliotheque-alyssio-150",
      objective: 'Résoudre un problème en plusieurs étapes pour répartir l’énergie.',
      intro: [{ speaker: 'Kael', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Kael', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-26-mission-05",
      title: 'Déduire le code des cinq balises',
      activitySlug: "grande-bibliotheque-alyssio-151",
      objective: 'Utiliser une suite logique pour reconstruire le code des balises.',
      intro: [{ speaker: 'Orion', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Orion', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-26-mission-06",
      title: 'Rallumer la place centrale',
      activitySlug: "grande-bibliotheque-alyssio-152",
      objective: 'Combiner lecture, calcul et logique pour rallumer la cité.',
      intro: [{ speaker: 'Narrateur', text: 'C’est la dernière étape de ce chapitre. Relie tout ce que tu as découvert.', mood: "determined" }],
      outro: [{ speaker: 'Narrateur', text: 'Le chapitre est accompli. La route peut continuer.', mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: 'Lyra', text: 'La lumière revient jusque dans les rues les plus hautes.', mood: "happy" },
    { speaker: 'Nova', text: 'Un signal vient de répondre. Les Veilleurs sont encore en vie.', mood: "happy" },
    { speaker: 'Orion', text: 'Retrouvez-les avant que l’Ombre n’atteigne la chambre du Cœur.', mood: "happy" }
  ],
  reward: {
    id: "reward-chapter-26",
    label: 'Lanterne de la Cité',
    description: 'Une lanterne ancienne qui révèle les chemins cachés dans l’obscurité.',
    symbol: '🏮',
    xpBonus: 92,
  },
};
