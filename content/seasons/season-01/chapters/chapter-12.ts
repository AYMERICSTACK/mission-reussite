import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter12: NarrativeChapter = {
  id: "season-01-chapter-12",
  slug: "le-camp-des-cartographes",
  number: 12,
  title: "Le Camp des Cartographes",
  subtitle: "Une carte incomplète cache le passage vers les hauteurs.",
  summary: "Les cartographes ont disparu en laissant derrière eux des plans codés. Chaque réussite permet de replacer une portion du chemin.",
  location: "Camp des Cartographes",
  symbol: "🗺️",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Camp des Cartographes." },
    { speaker: "Nova", text: "Je peux analyser les symboles, mais j’ai besoin de ta logique pour les remettre dans l’ordre.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-12-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-063",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Nova", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Oscar", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-12-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-064",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-12-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-065",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-12-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-066",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-12-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-067",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-12-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-068",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Nova", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Oscar", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-12", label: "Fragment de Carte", description: "Une partie restaurée de la route des explorateurs.", symbol: "🗺️", xpBonus: 57 },
};
