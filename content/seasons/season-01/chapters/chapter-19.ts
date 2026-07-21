import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter19: NarrativeChapter = {
  id: "season-01-chapter-19",
  slug: "la-citadelle-des-nuages",
  number: 19,
  title: "La Citadelle des Nuages",
  subtitle: "Le deuxième gardien rassemble une tempête autour de la citadelle.",
  summary: "La citadelle apparaît enfin, encerclée par une tempête. Pour atteindre son cœur, Alyssio doit activer six balises anciennes.",
  location: "Citadelle des Nuages",
  symbol: "🏰",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Citadelle des Nuages." },
    { speaker: "Orion", text: "Le gardien nous observe. Chaque balise activée affaiblira la tempête.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-19-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-105",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Orion", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Nova", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-19-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-106",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-19-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-107",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-19-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-108",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-19-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-109",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Orion", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-19-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-110",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Orion", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Nova", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-19", label: "Clé des Hauteurs", description: "Elle ouvre les portes situées au-dessus des nuages.", symbol: "🏰", xpBonus: 64 },
};
