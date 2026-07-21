import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter09: NarrativeChapter = {
  id: "season-01-chapter-09",
  slug: "le-grand-chene",
  number: 9,
  title: "Le Secret du Grand Chêne",
  subtitle: "Le cœur de la forêt s’ouvre enfin.",
  summary: "Tous les indices conduisent au Grand Chêne. Dans son tronc se cache le premier noyau de la boussole, protégé par une ultime série d’épreuves.",
  location: "Le Cœur des Racines",
  symbol: "🌳",
  tracks: ["alyssio"],
  opening: [
    { speaker: "Narrateur", text: "Le signal de la boussole entraîne l’équipe vers Le Cœur des Racines." },
    { speaker: "Oscar", text: "On avance ensemble. Cette fois encore, chaque savoir va nous ouvrir un passage.", mood: "determined" },
    { speaker: "Nova", text: "J’ai préparé six étapes. Prends ton temps et utilise les indices.", mood: "calm" },
  ],
  missions: [
    {
      id: "chapter-09-mission-01",
      title: "Le message caché",
      activitySlug: "grande-bibliotheque-alyssio-045",
      objective: "Repérer les informations utiles pour faire avancer l’enquête.",
      intro: [{ speaker: "Oscar", text: "Observe bien avant de répondre : la forêt laisse toujours un indice." }],
      outro: [{ speaker: "Nova", text: "Indice validé. Le chemin devient plus clair.", mood: "happy" }],
    },
    {
      id: "chapter-09-mission-02",
      title: "Les nombres du sentier",
      activitySlug: "grande-bibliotheque-alyssio-046",
      objective: "Choisir une stratégie de calcul efficace et vérifier le résultat.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois. Chaque réussite stabilise le chemin." }],
      outro: [{ speaker: "Oscar", text: "Indice validé. Le chemin devient plus clair.", mood: "happy" }],
    },
    {
      id: "chapter-09-mission-03",
      title: "La phrase des gardiens",
      activitySlug: "grande-bibliotheque-alyssio-047",
      objective: "Identifier les mots importants et reconstruire un message précis.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois. Chaque réussite stabilise le chemin." }],
      outro: [{ speaker: "Nova", text: "Indice validé. Le chemin devient plus clair.", mood: "happy" }],
    },
    {
      id: "chapter-09-mission-04",
      title: "Le calcul des cristaux",
      activitySlug: "grande-bibliotheque-alyssio-048",
      objective: "Résoudre le défi sans se précipiter.",
      intro: [{ speaker: "Nova", text: "Une étape à la fois. Chaque réussite stabilise le chemin." }],
      outro: [{ speaker: "Oscar", text: "Indice validé. Le chemin devient plus clair.", mood: "happy" }],
    },
    {
      id: "chapter-09-mission-05",
      title: "L’indice oublié",
      activitySlug: "grande-bibliotheque-alyssio-049",
      objective: "Relier plusieurs indices pour comprendre la situation.",
      intro: [{ speaker: "Oscar", text: "Une étape à la fois. Chaque réussite stabilise le chemin." }],
      outro: [{ speaker: "Nova", text: "Indice validé. Le chemin devient plus clair.", mood: "happy" }],
    },
    {
      id: "chapter-09-mission-06",
      title: "La clé du passage",
      activitySlug: "grande-bibliotheque-alyssio-050",
      objective: "Mobiliser les acquis du chapitre pour ouvrir le passage.",
      intro: [{ speaker: "Nova", text: "C’est la dernière épreuve de ce chapitre. Rassemble tout ce que tu as appris." }],
      outro: [{ speaker: "Oscar", text: "Le passage réagit ! Le chapitre est presque terminé.", mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: "Oscar", text: "Chapitre terminé ! Tu viens de rendre une nouvelle partie de la carte visible.", mood: "happy" },
    { speaker: "Nova", text: "La boussole a enregistré tes progrès. Le prochain passage peut maintenant s’ouvrir." },
  ],
  reward: { id: "reward-chapter-09", label: "Cœur de Sève", description: "Le noyau vivant qui alimente la Boussole des Mondes.", symbol: "🌳", xpBonus: 60 },
};
