import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter30: NarrativeChapter = {
  id: "season-01-chapter-30",
  slug: 'le-seigneur-de-l-ombre',
  number: 30,
  title: 'Le Seigneur de l’Ombre',
  subtitle: 'Le combat final pour garder les mondes reliés.',
  summary: 'Le Seigneur de l’Ombre emprisonne les souvenirs dans six sceaux. Pour le vaincre, Alyssio doit briser chaque sceau en utilisant tout ce qu’il a appris durant la Saison 1.',
  location: 'Le Sommet de l’Éclipse',
  symbol: '👁️',
  isBoss: true,
  tracks: ["alyssio"],
  opening: [
    { speaker: 'Narrateur', text: 'Au sommet, une silhouette immense se forme autour de la Porte des Mondes.', mood: "worried" },
    { speaker: 'Orion', text: 'Voici l’adversaire qui a déclenché le signal perdu.', mood: "determined" },
    { speaker: 'Nova', text: 'Il se nourrit du doute. Réponds avec méthode, et son pouvoir disparaîtra.', mood: "determined" }
  ],
  missions: [
    {
      id: "chapter-30-mission-01",
      title: 'Sceau de la lecture',
      activitySlug: "grande-bibliotheque-alyssio-171",
      objective: 'Comprendre un texte décisif et déjouer un faux indice.',
      intro: [{ speaker: 'Oscar', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Nova', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-30-mission-02",
      title: 'Sceau du calcul',
      activitySlug: "grande-bibliotheque-alyssio-172",
      objective: 'Résoudre les calculs qui alimentent le bouclier de l’Ombre.',
      intro: [{ speaker: 'Nova', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Oscar', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-30-mission-03",
      title: 'Sceau des mots',
      activitySlug: "grande-bibliotheque-alyssio-173",
      objective: 'Identifier et corriger les mots utilisés pour déformer les messages.',
      intro: [{ speaker: 'Lyra', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Lyra', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-30-mission-04",
      title: 'Sceau de la logique',
      activitySlug: "grande-bibliotheque-alyssio-174",
      objective: 'Reconstruire la suite logique des six sceaux.',
      intro: [{ speaker: 'Kael', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Kael', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-30-mission-05",
      title: 'Sceau de la mémoire',
      activitySlug: "grande-bibliotheque-alyssio-175",
      objective: 'Relier les souvenirs de toute la campagne.',
      intro: [{ speaker: 'Orion', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Orion', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-30-mission-06",
      title: 'Le Cœur contre l’Ombre',
      activitySlug: "grande-bibliotheque-alyssio-176",
      objective: 'Combiner toutes les compétences pour vaincre le boss final.',
      intro: [{ speaker: 'Narrateur', text: 'C’est la dernière étape de ce chapitre. Relie tout ce que tu as découvert.', mood: "determined" }],
      outro: [{ speaker: 'Narrateur', text: 'Le chapitre est accompli. La route peut continuer.', mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: 'Narrateur', text: 'Les six sceaux éclatent. La lumière traverse à nouveau la Porte des Mondes.', mood: "happy" },
    { speaker: 'Nova', text: 'Tu n’as pas seulement vaincu l’Ombre, Alyssio. Tu as sauvé les souvenirs de chaque monde.', mood: "happy" },
    { speaker: 'Oscar', text: 'Trente chapitres, cent quatre-vingts missions et une aventure incroyable. Tu es devenu un Explorateur Légendaire !', mood: "happy" }
  ],
  reward: {
    id: "reward-chapter-30",
    label: 'Badge Explorateur Légendaire',
    description: 'La récompense suprême de la Saison 1, réservée à ceux qui ont restauré la Porte des Mondes.',
    symbol: '🏆',
    xpBonus: 150,
  },
  finale: {
    title: "La Porte des Mondes est restaurée",
    message: "La Saison 1 est terminée. Alyssio reçoit le rang d’Explorateur Légendaire et découvre le premier signal d’une nouvelle aventure.",
    seasonTwoTitle: "Saison 2 · Les Îles du Temps",
    seasonTwoMessage: "Une nouvelle constellation vient d’apparaître. La Saison 2 est désormais débloquée et sera bientôt disponible.",
  },
};
