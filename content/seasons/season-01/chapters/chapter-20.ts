import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter20: NarrativeChapter = {
  id: "season-01-chapter-20",
  slug: "le-gardien-de-la-tempete",
  number: 20,
  title: "Le Gardien de la Tempête",
  subtitle: "Un duel de savoirs décidera du sort de la vallée.",
  summary: "Aérion, le gardien des hauteurs, a été emprisonné dans sa propre tempête. Alyssio doit réunir toutes ses compétences pour le libérer.",
  location: "Cœur de la Tempête",
  symbol: "⚡",
  isBoss: true,
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Cœur de la Tempête." },
    { speaker: "Oscar", text: "Tout ce que tu as appris depuis la forêt nous conduit ici. Ensemble, libérons Aérion.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-20-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-111",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Oscar", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Nova", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-20-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-112",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-20-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-113",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-20-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-114",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-20-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-115",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-20-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-116",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Oscar", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Nova", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La tempête se dissipe et Aérion retrouve sa lumière.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-20", label: "Sceau des Hauteurs", description: "La preuve que la Vallée des Explorateurs a été sauvée.", symbol: "⚡", xpBonus: 100 },
};
