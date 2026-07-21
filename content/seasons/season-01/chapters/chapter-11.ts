import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter11: NarrativeChapter = {
  id: "season-01-chapter-11",
  slug: "la-vallee-des-echoes",
  number: 11,
  title: "La Vallée des Échos",
  subtitle: "Les voix du passé se mélangent aux véritables indices.",
  summary: "Après avoir quitté la forêt, l’équipe atteint une vallée où chaque parole revient transformée. Alyssio doit distinguer les bons messages des faux échos.",
  location: "Vallée des Explorateurs",
  symbol: "🏞️",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Vallée des Explorateurs." },
    { speaker: "Oscar", text: "Les échos répètent tout, mais seuls les bons raisonnements nous montreront la route.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-11-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-057",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Oscar", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Nova", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-11-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-058",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-11-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-059",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-11-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-060",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-11-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-061",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-11-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-062",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Oscar", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Nova", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-11", label: "Pierre d’Écho", description: "Un cristal qui conserve les paroles justes.", symbol: "🏞️", xpBonus: 56 },
};
