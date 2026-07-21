import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter14: NarrativeChapter = {
  id: "season-01-chapter-14",
  slug: "le-pont-des-vents",
  number: 14,
  title: "Le Pont des Vents",
  subtitle: "Un pont invisible apparaît seulement quand les réponses sont exactes.",
  summary: "Un gouffre sépare l’équipe de la prochaine balise. Le pont se construit morceau par morceau grâce aux stratégies d’Alyssio.",
  location: "Pont des Vents",
  symbol: "🌬️",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Pont des Vents." },
    { speaker: "Oscar", text: "Ne regarde pas le vide. Regarde la prochaine étape, puis la suivante.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-14-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-075",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Oscar", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Nova", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-14-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-076",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-14-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-077",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-14-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-078",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-14-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-079",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-14-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-080",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Oscar", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Nova", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-14", label: "Plume d’Équilibre", description: "Elle aide à garder son calme quand le chemin tremble.", symbol: "🌬️", xpBonus: 59 },
};
