import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter16: NarrativeChapter = {
  id: "season-01-chapter-16",
  slug: "le-marais-des-miroirs",
  number: 16,
  title: "Le Marais des Miroirs",
  subtitle: "Les reflets inventent de fausses solutions pour égarer les voyageurs.",
  summary: "Chaque miroir du marais montre une réponse différente. Alyssio doit justifier ses choix pour dissiper les illusions.",
  location: "Marais des Miroirs",
  symbol: "🪞",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Marais des Miroirs." },
    { speaker: "Orion", text: "Une réponse peut sembler brillante et pourtant être fausse. Cherche toujours la preuve.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-16-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-087",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Orion", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Nova", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-16-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-088",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-16-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-089",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-16-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-090",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-16-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-091",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-16-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-092",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Orion", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Nova", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-16", label: "Éclat de Vérité", description: "Un morceau de miroir qui ne reflète que ce qui est juste.", symbol: "🪞", xpBonus: 61 },
};
