import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter17: NarrativeChapter = {
  id: "season-01-chapter-17",
  slug: "le-village-suspendu",
  number: 17,
  title: "Le Village Suspendu",
  subtitle: "Les habitants ont besoin d’aide pour remettre leurs mécanismes en marche.",
  summary: "Le village est immobilisé au-dessus des nuages. Calculs, messages et mécanismes doivent être réparés avant la tombée de la nuit.",
  location: "Village Suspendu",
  symbol: "🏘️",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Après les événements précédents, l’équipe atteint Village Suspendu." },
    { speaker: "Oscar", text: "Cette fois, on ne sauve pas seulement notre route. Tout un village compte sur toi.", mood: "determined" },
    { speaker: "Nova", text: "Six étapes nous séparent du prochain fragment. Je resterai à tes côtés.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-17-mission-01",
      title: "Le message dissimulé",
      activitySlug: "grande-bibliotheque-alyssio-093",
      objective: "Repérer les informations utiles et écarter les faux indices.",
      intro: [{ speaker: "Oscar", text: "Observe les détails avant de choisir." }],
      outro: [{ speaker: "Nova", text: "Premier indice confirmé. Le chemin réagit.", mood: "happy" }],
    },
    {
      id: "chapter-17-mission-02",
      title: "Les nombres du passage",
      activitySlug: "grande-bibliotheque-alyssio-094",
      objective: "Choisir une stratégie de calcul efficace puis vérifier le résultat.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-17-mission-03",
      title: "La phrase des anciens",
      activitySlug: "grande-bibliotheque-alyssio-095",
      objective: "Identifier les mots importants pour reconstruire un message précis.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-17-mission-04",
      title: "Le calcul des balises",
      activitySlug: "grande-bibliotheque-alyssio-096",
      objective: "Résoudre le défi étape par étape sans se précipiter.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-17-mission-05",
      title: "L’indice retrouvé",
      activitySlug: "grande-bibliotheque-alyssio-097",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois : explique-toi avant de valider." }],
      outro: [{ speaker: "Nova", text: "Très bien. Une nouvelle partie du passage apparaît.", mood: "happy" }],
    },
    {
      id: "chapter-17-mission-06",
      title: "La clé du monde",
      activitySlug: "grande-bibliotheque-alyssio-098",
      objective: "Mobiliser les acquis du chapitre afin d’ouvrir le passage.",
      intro: [{ speaker: "Oscar", text: "Dernière épreuve : rassemble tout ce que tu as découvert." }],
      outro: [{ speaker: "Nova", text: "Le mécanisme est complet. Le chapitre peut se refermer.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "La route s’ouvre un peu plus loin devant l’expédition.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré cette victoire. Le prochain passage est maintenant accessible." },
  ],
  reward: { id: "reward-chapter-17", label: "Rouage Céleste", description: "Un mécanisme léger comme l’air, offert par les habitants.", symbol: "🏘️", xpBonus: 62 },
};
