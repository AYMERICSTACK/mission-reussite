import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter29: NarrativeChapter = {
  id: "season-01-chapter-29",
  slug: 'l-ascension',
  number: 29,
  title: 'L’Ascension',
  subtitle: 'La dernière route monte jusqu’au domaine de l’Ombre.',
  summary: 'La Tour de l’Éclipse s’élève au-dessus des mondes. Chaque étage impose une épreuve plus difficile. Alyssio guide toute l’équipe vers le sommet pendant que l’Ombre tente de brouiller leurs décisions.',
  location: 'La Tour de l’Éclipse',
  symbol: '🗼',
  isBoss: false,
  tracks: ["alyssio"],
  opening: [
    { speaker: 'Narrateur', text: 'Les marches de la tour apparaissent puis disparaissent dans le vide.', mood: "worried" },
    { speaker: 'Kael', text: 'Les mécanismes changent à chaque étage. Nous n’aurons pas droit à l’erreur.', mood: "determined" },
    { speaker: 'Lyra', text: 'Alyssio a déjà traversé vingt-huit chapitres. Il est prêt pour cette ascension.', mood: "determined" }
  ],
  missions: [
    {
      id: "chapter-29-mission-01",
      title: 'L’escalier des nombres',
      activitySlug: "grande-bibliotheque-alyssio-165",
      objective: 'Calculer rapidement pour stabiliser les premières marches.',
      intro: [{ speaker: 'Oscar', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Nova', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-29-mission-02",
      title: 'La galerie des mots',
      activitySlug: "grande-bibliotheque-alyssio-166",
      objective: 'Analyser des phrases pour désactiver les illusions.',
      intro: [{ speaker: 'Nova', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Oscar', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-29-mission-03",
      title: 'Le mécanisme du vent',
      activitySlug: "grande-bibliotheque-alyssio-167",
      objective: 'Résoudre un problème de mesures et de répartition.',
      intro: [{ speaker: 'Lyra', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Lyra', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-29-mission-04",
      title: 'Les portes jumelles',
      activitySlug: "grande-bibliotheque-alyssio-168",
      objective: 'Comparer deux parcours et choisir le plus efficace.',
      intro: [{ speaker: 'Kael', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Kael', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-29-mission-05",
      title: 'Le dernier campement',
      activitySlug: "grande-bibliotheque-alyssio-169",
      objective: 'Organiser les ressources avant le combat final.',
      intro: [{ speaker: 'Orion', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Orion', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-29-mission-06",
      title: 'La porte de l’éclipse',
      activitySlug: "grande-bibliotheque-alyssio-170",
      objective: 'Mobiliser toutes les compétences pour ouvrir la porte du sommet.',
      intro: [{ speaker: 'Narrateur', text: 'C’est la dernière étape de ce chapitre. Relie tout ce que tu as découvert.', mood: "determined" }],
      outro: [{ speaker: 'Narrateur', text: 'Le chapitre est accompli. La route peut continuer.', mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: 'Kael', text: 'La porte est ouverte. Tous les mécanismes de la tour sont sous contrôle.', mood: "happy" },
    { speaker: 'Lyra', text: 'De l’autre côté se trouve le Seigneur de l’Ombre.', mood: "happy" },
    { speaker: 'Nova', text: 'Alyssio, quoi qu’il arrive, souviens-toi : chaque savoir rallume une lumière.', mood: "happy" }
  ],
  reward: {
    id: "reward-chapter-29",
    label: 'Clé de l’Éclipse',
    description: 'La clé qui ouvre la salle du dernier adversaire de la Saison 1.',
    symbol: '🗝️',
    xpBonus: 106,
  },
};
