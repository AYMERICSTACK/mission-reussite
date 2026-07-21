import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter15: NarrativeChapter = {
  id: "season-01-chapter-15",
  slug: "la-tour-des-boussoles",
  number: 15,
  title: "La Tour des Boussoles",
  subtitle: "Toutes les aiguilles tournent, sauf celle qui dit la vérité.",
  summary: "Dans une tour abandonnée, des dizaines de boussoles indiquent des directions contradictoires. Une seule suit la trace de la Porte des Mondes.",
  location: "Tour des Boussoles",
  symbol: "🧭",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Tour des Boussoles." },
    { speaker: "Nova", text: "Les données se contredisent. Ta capacité à vérifier sera notre meilleur guide.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-15-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-081",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Nova", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Oscar", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-15-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-082",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-15-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-083",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-15-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-084",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-15-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-085",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-15-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-086",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Nova", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Oscar", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-15", label: "Aiguille d’Azur", description: "Une aiguille capable de détecter les chemins sincères.", symbol: "🧭", xpBonus: 60 },
};
