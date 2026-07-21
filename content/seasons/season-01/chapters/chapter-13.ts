import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter13: NarrativeChapter = {
  id: "season-01-chapter-13",
  slug: "la-grotte-des-symboles",
  number: 13,
  title: "La Grotte des Symboles",
  subtitle: "Les parois parlent dans une langue faite de nombres et de mots.",
  summary: "Au fond d’une grotte lumineuse, des inscriptions anciennes protègent un passage. Alyssio doit comprendre leurs règles pour avancer.",
  location: "Grotte des Symboles",
  symbol: "🪨",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Grotte des Symboles." },
    { speaker: "Orion", text: "Ces signes ne sont pas là pour nous bloquer. Ils veulent vérifier que nous sommes prêts.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-13-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-069",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Orion", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Nova", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-13-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-070",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-13-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-071",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-13-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-072",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-13-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-073",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-13-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-074",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Orion", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Nova", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-13", label: "Craie des Anciens", description: "Elle révèle les symboles cachés sur les parois.", symbol: "🪨", xpBonus: 58 },
};
