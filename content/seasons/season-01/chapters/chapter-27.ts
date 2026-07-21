import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter27: NarrativeChapter = {
  id: "season-01-chapter-27",
  slug: 'les-veilleurs',
  number: 27,
  title: 'Les Veilleurs',
  subtitle: 'Ils protègent la mémoire des mondes depuis toujours.',
  summary: 'Dans un refuge dissimulé sous la cité, Alyssio rencontre les derniers Veilleurs. Pour gagner leur confiance, il doit réussir leurs épreuves et comprendre pourquoi le Seigneur de l’Ombre cherche à effacer les souvenirs de Nova.',
  location: 'Le Refuge des Veilleurs',
  symbol: '🛡️',
  isBoss: false,
  tracks: ["alyssio"],
  opening: [
    { speaker: 'Narrateur', text: 'Une porte de pierre s’ouvre sur une salle où brillent des centaines de symboles.', mood: "worried" },
    { speaker: 'Orion', text: 'Voici les Veilleurs. Ils n’accordent leur confiance qu’à ceux qui savent expliquer leurs choix.', mood: "determined" },
    { speaker: 'Nova', text: 'Leurs archives contiennent peut-être la vérité sur mon origine.', mood: "determined" }
  ],
  missions: [
    {
      id: "chapter-27-mission-01",
      title: 'L’épreuve de précision',
      activitySlug: "grande-bibliotheque-alyssio-153",
      objective: 'Lire précisément une consigne et sélectionner les bons indices.',
      intro: [{ speaker: 'Oscar', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Nova', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-27-mission-02",
      title: 'Les réserves du refuge',
      activitySlug: "grande-bibliotheque-alyssio-154",
      objective: 'Calculer les quantités restantes dans les réserves.',
      intro: [{ speaker: 'Nova', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Oscar', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-27-mission-03",
      title: 'Le serment des Veilleurs',
      activitySlug: "grande-bibliotheque-alyssio-155",
      objective: 'Comprendre le sens principal d’un texte court.',
      intro: [{ speaker: 'Lyra', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Lyra', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-27-mission-04",
      title: 'La chronologie interdite',
      activitySlug: "grande-bibliotheque-alyssio-156",
      objective: 'Remettre des événements dans un ordre logique.',
      intro: [{ speaker: 'Kael', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Kael', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-27-mission-05",
      title: 'Le conseil des cinq',
      activitySlug: "grande-bibliotheque-alyssio-157",
      objective: 'Résoudre un problème à plusieurs contraintes.',
      intro: [{ speaker: 'Orion', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Orion', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-27-mission-06",
      title: 'Le sceau de confiance',
      activitySlug: "grande-bibliotheque-alyssio-158",
      objective: 'Mobiliser plusieurs compétences pour obtenir la confiance des Veilleurs.',
      intro: [{ speaker: 'Narrateur', text: 'C’est la dernière étape de ce chapitre. Relie tout ce que tu as découvert.', mood: "determined" }],
      outro: [{ speaker: 'Narrateur', text: 'Le chapitre est accompli. La route peut continuer.', mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: 'Orion', text: 'Les Veilleurs reconnaissent désormais ton courage et ta méthode.', mood: "happy" },
    { speaker: 'Nova', text: 'J’ai appris que mon cœur contient la mémoire des passages entre les mondes.', mood: "happy" },
    { speaker: 'Lyra', text: 'Alors l’Ombre ne veut pas seulement te capturer. Elle veut fermer toutes les portes.', mood: "happy" }
  ],
  reward: {
    id: "reward-chapter-27",
    label: 'Sceau des Veilleurs',
    description: 'Le symbole officiel de ceux qui protègent la mémoire et les passages.',
    symbol: '🛡️',
    xpBonus: 96,
  },
};
