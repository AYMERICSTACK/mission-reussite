import type { NarrativeChapter } from "@/lib/narrative/types";

export const chapter28: NarrativeChapter = {
  id: "season-01-chapter-28",
  slug: 'le-cœur-de-nova',
  number: 28,
  title: 'Le Cœur de Nova',
  subtitle: 'Pour sauver les mondes, Nova doit retrouver sa mémoire.',
  summary: 'Au centre du refuge repose le véritable Cœur de Nova, séparé en fragments de mémoire. Alyssio doit reconstituer chaque souvenir sans se laisser tromper par les faux messages déposés par l’Ombre.',
  location: 'La Chambre du Cœur',
  symbol: '💠',
  isBoss: false,
  tracks: ["alyssio"],
  opening: [
    { speaker: 'Narrateur', text: 'Des fragments bleus tournent autour d’un cristal silencieux.', mood: "worried" },
    { speaker: 'Nova', text: 'Je reconnais ces images… mais certaines ont été modifiées.', mood: "determined" },
    { speaker: 'Oscar', text: 'On va distinguer les vrais souvenirs des pièges. Doucement, un indice après l’autre.', mood: "determined" }
  ],
  missions: [
    {
      id: "chapter-28-mission-01",
      title: 'Le premier souvenir',
      activitySlug: "grande-bibliotheque-alyssio-159",
      objective: 'Repérer les informations explicites d’un souvenir.',
      intro: [{ speaker: 'Oscar', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Nova', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-28-mission-02",
      title: 'Les fragments manquants',
      activitySlug: "grande-bibliotheque-alyssio-160",
      objective: 'Calculer combien de fragments sont nécessaires pour compléter chaque série.',
      intro: [{ speaker: 'Nova', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Oscar', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-28-mission-03",
      title: 'Les phrases altérées',
      activitySlug: "grande-bibliotheque-alyssio-161",
      objective: 'Corriger les mots qui rendent un message incohérent.',
      intro: [{ speaker: 'Lyra', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Lyra', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-28-mission-04",
      title: 'La carte des mondes',
      activitySlug: "grande-bibliotheque-alyssio-162",
      objective: 'Lire et interpréter une carte symbolique.',
      intro: [{ speaker: 'Kael', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Kael', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-28-mission-05",
      title: 'Le choix de Nova',
      activitySlug: "grande-bibliotheque-alyssio-163",
      objective: 'Comparer plusieurs solutions et justifier la plus sûre.',
      intro: [{ speaker: 'Orion', text: 'Observe bien les indices et explique ta stratégie avant de répondre.', mood: "determined" }],
      outro: [{ speaker: 'Orion', text: 'Mission réussie. Le passage suivant vient de s’ouvrir.', mood: "happy" }],
    },
    {
      id: "chapter-28-mission-06",
      title: 'La réunion du Cœur',
      activitySlug: "grande-bibliotheque-alyssio-164",
      objective: 'Combiner les savoirs pour reconstituer le Cœur de Nova.',
      intro: [{ speaker: 'Narrateur', text: 'C’est la dernière étape de ce chapitre. Relie tout ce que tu as découvert.', mood: "determined" }],
      outro: [{ speaker: 'Narrateur', text: 'Le chapitre est accompli. La route peut continuer.', mood: "happy" }],
    }
  ],
  completionDialogue: [
    { speaker: 'Nova', text: 'Je me souviens maintenant. J’ai été créée pour maintenir les mondes reliés.', mood: "happy" },
    { speaker: 'Oscar', text: 'Et Alyssio vient de rendre sa force à ton cœur.', mood: "happy" },
    { speaker: 'Narrateur', text: 'Mais au-dessus de la cité, une tour noire traverse les nuages.', mood: "happy" }
  ],
  reward: {
    id: "reward-chapter-28",
    label: 'Éclat du Cœur de Nova',
    description: 'Un fragment lumineux contenant un souvenir authentique de Nova.',
    symbol: '💠',
    xpBonus: 100,
  },
};
