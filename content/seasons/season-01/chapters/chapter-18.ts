import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter18: NarrativeChapter = {
  id: "season-01-chapter-18",
  slug: "les-archives-de-nova",
  number: 18,
  title: "Les Archives de Nova",
  subtitle: "Un souvenir effacé pourrait révéler l’origine du signal.",
  summary: "Nova découvre une porte vers ses anciennes archives. Les fragments sont mélangés et certains ont été corrompus par l’ombre.",
  location: "Archives Stellaires",
  symbol: "💫",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Archives Stellaires." },
    { speaker: "Nova", text: "Je reconnais cet endroit… mais pas ce qui s’y est passé. Aide-moi à reconstruire mes souvenirs.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-18-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-099",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Nova", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Oscar", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-18-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-100",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-18-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-101",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-18-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-102",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-18-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-103",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Oscar", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-18-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-104",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Nova", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Oscar", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-18", label: "Mémoire Stellaire", description: "Un fragment restauré de la mémoire de Nova.", symbol: "💫", xpBonus: 63 },
};
