import type { LearningMission, MissionDifficulty, MissionStep } from "@/lib/content/missions";
import type { ChildKey } from "@/lib/progress/types";
import type { LibraryContentType } from "@/lib/content/library-types";

type PackDefinition = {
  child: ChildKey;
  tone: LearningMission["tone"];
  firstName: string;
  grade: string;
  worldId: string;
  stageIds: string[];
  companion: string;
  companionRole: string;
  skills: Array<{ id: string; label: string; category: string; objective: string }>;
};

const TYPES: LibraryContentType[] = ["story", "problem", "exercise", "challenge", "game"];

const packs: PackDefinition[] = [
  {
    child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2", worldId: "foret-mille-secrets",
    stageIds: ["sentier-feuilles", "riviere-chantante", "clairiere-lucioles", "grand-chene"], companion: "Oscar", companionRole: "Gardien de la Grande Bibliothèque",
    skills: [
      { id: "ce2-reading-explicit", label: "Compréhension", category: "Lecture & compréhension", objective: "Repérer une information explicitement écrite dans un texte court." },
      { id: "ce2-reading-inference", label: "Compréhension", category: "Lecture & compréhension", objective: "Relier plusieurs indices pour produire une inférence simple." },
      { id: "ce2-reading-message", label: "Compréhension", category: "Lecture & compréhension", objective: "Comprendre l’idée principale et le message d’un récit." },
      { id: "ce2-number-complements", label: "Calcul mental", category: "Mathématiques", objective: "Utiliser les compléments à 10 pour calculer rapidement." },
      { id: "ce2-mental-calculation", label: "Calcul mental", category: "Mathématiques", objective: "Choisir une stratégie efficace d’addition, soustraction ou multiplication." },
      { id: "ce2-subtraction-strategies", label: "Soustractions", category: "Mathématiques", objective: "Calculer et vérifier une soustraction avec une stratégie adaptée." },
      { id: "ce2-problem-subtraction", label: "Problèmes", category: "Problème guidé", objective: "Identifier une situation de retrait et choisir la bonne opération." },
      { id: "ce2-word-classes", label: "Nature des mots", category: "Grammaire", objective: "Reconnaître un nom, un verbe et un adjectif dans une phrase." },
      { id: "ce2-present-conjugation", label: "Conjugaison", category: "Français", objective: "Accorder un verbe du premier groupe avec son sujet au présent." },
      { id: "ce2-vocabulary-relations", label: "Vocabulaire", category: "Français", objective: "Identifier des synonymes et des mots de la même famille." },
    ],
  },
  {
    child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e", worldId: "cite-horizons",
    stageIds: ["porte-idees", "archives-flottantes", "pont-enigmes", "tour-aube"], companion: "Milo", companionRole: "Archiviste de la Grande Bibliothèque",
    skills: [
      { id: "sixth-instruction-verbs", label: "Méthodologie", category: "Méthodologie", objective: "Identifier avec précision les verbes et les actions d’une consigne." },
      { id: "sixth-task-planning", label: "Organisation", category: "Organisation", objective: "Découper un travail en étapes réalistes et ordonnées." },
      { id: "sixth-school-autonomy", label: "Autonomie", category: "Organisation", objective: "Anticiper le matériel et les tâches nécessaires au travail scolaire." },
      { id: "sixth-fraction-meaning", label: "Fractions", category: "Mathématiques", objective: "Interpréter et comparer des fractions simples." },
      { id: "sixth-proportional-reasoning", label: "Proportionnalité", category: "Mathématiques", objective: "Reconnaître et compléter une situation proportionnelle." },
      { id: "sixth-english-personal-info", label: "Anglais", category: "Anglais", objective: "Comprendre une présentation personnelle simple en anglais." },
      { id: "sixth-english-present-simple", label: "Anglais", category: "Anglais", objective: "Comprendre et employer le présent simple à la troisième personne." },
      { id: "sixth-text-main-idea", label: "Synthèse", category: "Français", objective: "Identifier le thème et reformuler l’idée essentielle d’un texte." },
      { id: "sixth-word-classes", label: "Classes grammaticales", category: "Français", objective: "Identifier des classes grammaticales et justifier un accord." },
    ],
  },
];

const ce2Scenes = [
  "la cabane d’Oscar", "le pont de mousse", "la rive aux galets", "le sentier des lucioles", "le jardin des écureuils", "la tour des feuilles", "la clairière silencieuse", "le moulin de la vallée",
];
const sixthScenes = [
  "les Archives flottantes", "la galerie des cartes", "le laboratoire d’Aube", "le pont des énigmes", "la salle des langues", "la bibliothèque suspendue", "l’observatoire", "la cour des mécanismes",
];
const objects = ["une boussole", "un carnet", "trois cristaux", "une clé", "un message", "un plan", "une lanterne", "un fragment de code"];

function choice(label: string, value: string) { return { label, value }; }

function numericSteps(a: number, b: number, operation: "add" | "sub" | "mul"): MissionStep[] {
  const result = operation === "add" ? a + b : operation === "sub" ? a - b : a * b;
  const sign = operation === "add" ? "+" : operation === "sub" ? "−" : "×";
  const wrong1 = result + (operation === "mul" ? a : 2);
  const wrong2 = Math.max(0, result - (operation === "mul" ? b : 3));
  return [
    { eyebrow: "Je comprends", title: "Quelle opération correspond à la situation ?", instruction: "Observe ce qui arrive aux quantités.", choices: [choice(`${a} ${sign} ${b}`, "correct-op"), choice(`${a} + ${b + 3}`, "wrong-op-1"), choice(`${a} × ${Math.max(2, b - 1)}`, "wrong-op-2")], answer: "correct-op", success: "Exact, tu as choisi l’opération adaptée.", hint: "Repère si la quantité augmente, diminue ou se répète." },
    { eyebrow: "Je calcule", title: `Combien font ${a} ${sign} ${b} ?`, instruction: "Calcule avec la stratégie la plus rapide.", choices: [choice(String(result), "result"), choice(String(wrong1), "wrong-1"), choice(String(wrong2), "wrong-2")], answer: "result", success: `Bravo : ${a} ${sign} ${b} = ${result}.`, hint: operation === "sub" ? "Décompose le nombre retiré." : "Utilise une dizaine ou un résultat connu." },
    { eyebrow: "Je vérifie", title: "Quelle vérification est la plus utile ?", instruction: "Choisis une manière de contrôler le résultat.", choices: [choice(operation === "sub" ? `Ajouter ${b} au résultat` : "Recalculer autrement", "check"), choice("Choisir le plus grand nombre", "guess"), choice("Ne pas vérifier", "none")], answer: "check", success: "Très bien, une autre stratégie permet de confirmer le résultat.", hint: "Une vérification doit utiliser les nombres de la question." },
  ];
}

function readingSteps(index: number, scene: string, object: string, sixth: boolean): MissionStep[] {
  const time = index % 2 === 0 ? "avant le lever du soleil" : "après la pluie";
  return [
    { eyebrow: "Je repère", title: `Quel objet est découvert dans ${scene} ?`, instruction: "Relis la première information du récit.", choices: [choice(object, "object"), choice("une couronne", "crown"), choice("un ballon", "ball")], answer: "object", success: "Exact, tu as retrouvé l’information explicite.", hint: "L’objet est cité directement dans le texte." },
    { eyebrow: "Je déduis", title: `Que peut-on comprendre grâce à l’indice « ${time} » ?`, instruction: "Relie cet indice au contexte.", choices: [choice(index % 2 === 0 ? "La scène se déroule très tôt" : "Le sol peut être humide", "inference"), choice("Il fait forcément nuit", "night"), choice("Le personnage est perdu", "lost")], answer: "inference", success: "Bravo, tu as utilisé un indice pour déduire une information.", hint: sixth ? "Distingue ce qui est certain de ce qui est seulement possible." : "Pense à ce que cet indice change dans le décor." },
    { eyebrow: "Je résume", title: "Quelle phrase résume le mieux la mission ?", instruction: "Choisis l’idée essentielle.", choices: [choice(`Un indice retrouvé dans ${scene} permet de poursuivre l’aventure.`, "summary"), choice("Les personnages abandonnent leur recherche.", "abandon"), choice("Le décor n’a aucun rôle.", "decor")], answer: "summary", success: "Très bien, tu as identifié l’idée principale.", hint: "Garde uniquement l’événement le plus important." },
  ];
}

function languageSteps(index: number, sixth: boolean): MissionStep[] {
  const subject = index % 2 === 0 ? "Les explorateurs" : "La jeune archiviste";
  const verb = index % 2 === 0 ? "observent" : "classe";
  const adjective = index % 2 === 0 ? "lumineux" : "anciens";
  const sentence = `${subject} ${verb} des signes ${adjective}.`;
  return [
    { eyebrow: "J’observe", title: `Dans « ${sentence} », quel mot est le verbe ?`, instruction: "Repère l’action.", choices: [choice(verb, "verb"), choice(adjective, "adjective"), choice("signes", "noun")], answer: "verb", success: "Exact, le verbe exprime l’action.", hint: "Demande-toi ce que fait le sujet." },
    { eyebrow: "J’identifie", title: "Quel mot est un nom commun ?", instruction: "Repère ce qui désigne une chose.", choices: [choice("signes", "noun"), choice(verb, "verb"), choice(adjective, "adjective")], answer: "noun", success: "Bravo, « signes » est un nom commun.", hint: "Le nom peut être précédé d’un déterminant." },
    { eyebrow: "J’accorde", title: `Pourquoi « ${adjective} » est-il au pluriel ?`, instruction: "Cherche le mot qu’il complète.", choices: [choice("Il s’accorde avec « signes »", "agreement"), choice("Parce que le verbe est au pluriel", "verb-agreement"), choice("Il est toujours pluriel", "always")], answer: "agreement", success: sixth ? "Très bien, l’adjectif s’accorde en genre et en nombre avec le nom." : "Très bien, l’adjectif s’accorde avec le nom.", hint: "Quel nom est décrit par cet adjectif ?" },
  ];
}

function methodSteps(index: number): MissionStep[] {
  const action = index % 3 === 0 ? "compare" : index % 3 === 1 ? "explique" : "relève";
  return [
    { eyebrow: "Je décode", title: `Que demande le verbe « ${action} » ?`, instruction: "Choisis l’action scolaire exacte.", choices: [choice(action === "compare" ? "Trouver ressemblances et différences" : action === "explique" ? "Donner les causes et le raisonnement" : "Prélever une information précise", "action"), choice("Recopier tout le document", "copy"), choice("Donner son avis sans preuve", "opinion")], answer: "action", success: "Exact, le verbe de consigne indique le travail attendu.", hint: "Transforme le verbe en une action concrète." },
    { eyebrow: "Je planifie", title: "Quelle étape vient en premier ?", instruction: "Organise ton travail.", choices: [choice("Lire entièrement la consigne", "read"), choice("Rédiger sans lire", "write"), choice("Choisir une réponse au hasard", "guess")], answer: "read", success: "Oui, comprendre la consigne précède toujours la réponse.", hint: "Il faut savoir ce qui est demandé avant de commencer." },
    { eyebrow: "Je contrôle", title: "Comment vérifier que la réponse est complète ?", instruction: "Reviens aux mots importants.", choices: [choice("Cocher chaque action demandée", "check"), choice("Compter uniquement les lignes", "lines"), choice("Changer de sujet", "change")], answer: "check", success: "Parfait, cette méthode évite les oublis.", hint: "La consigne peut contenir plusieurs actions." },
  ];
}

function buildMission(pack: PackDefinition, index: number): LearningMission {
  const skill = pack.skills[index % pack.skills.length];
  const type = TYPES[index % TYPES.length];
  const difficulty = (1 + (index % 5)) as MissionDifficulty;
  const scene = (pack.child === "alyssio" ? ce2Scenes : sixthScenes)[index % 8];
  const object = objects[(index * 3) % objects.length];
  const isMath = skill.category.includes("Math") || skill.category.includes("Problème") || skill.id.includes("fraction") || skill.id.includes("proportional");
  const isLanguage = skill.id.includes("word-classes") || skill.id.includes("conjugation") || skill.id.includes("vocabulary");
  const isMethod = skill.id.includes("instruction") || skill.id.includes("planning") || skill.id.includes("autonomy");
  const a = pack.child === "alyssio" ? 18 + (index % 24) : 24 + (index % 36);
  const b = pack.child === "alyssio" ? 4 + (index % 9) : 3 + (index % 12);
  const operation = skill.id.includes("subtraction") || skill.id.includes("problem") ? "sub" : index % 3 === 0 ? "mul" : "add";
  const steps = isMath ? numericSteps(a, b, operation) : isLanguage ? languageSteps(index, pack.child === "leony") : isMethod ? methodSteps(index) : readingSteps(index, scene, object, pack.child === "leony");
  const typeTitle: Record<LibraryContentType, string> = { story: "Chronique", problem: "Problème", exercise: "Entraînement", challenge: "Défi", game: "Jeu" };
  const story = isMath
    ? `Dans ${scene}, ${pack.companion} doit organiser ${a} fragments. Il en utilise ${b} pour réparer un mécanisme. Ta stratégie permettra d’ouvrir le passage suivant.`
    : `Dans ${scene}, ${pack.companion} découvre ${object} ${index % 2 === 0 ? "avant le lever du soleil" : "après la pluie"}. Un court message accompagne la découverte et doit être compris avec précision.`;

  return {
    id: `library-${pack.child}-${String(index + 1).padStart(3, "0")}`,
    slug: `grande-bibliotheque-${pack.child}-${String(index + 1).padStart(3, "0")}`,
    child: pack.child, tone: pack.tone, firstName: pack.firstName, grade: pack.grade,
    title: `${typeTitle[type]} ${index + 1} · ${skill.label}`,
    category: skill.category, skill: skill.label, skillId: skill.id,
    duration: `${6 + (index % 7)} minutes`, durationLabel: `${6 + (index % 7)} min`, xp: 20 + difficulty * 5,
    companion: pack.companion, companionRole: pack.companionRole, story, steps, difficulty,
    objective: skill.objective, prerequisites: [], tags: [type, skill.category.toLocaleLowerCase("fr"), "grande-bibliothèque"],
    sequence: 100 + index, adventureStageId: pack.stageIds[index % pack.stageIds.length], questNumber: index + 1,
    contentType: type, worldId: pack.worldId, chapterId: pack.stageIds[index % pack.stageIds.length], source: "generated-template",
    curriculum: [pack.grade.replace("Mission ", ""), skill.category, skill.label], interests: [index % 2 === 0 ? "aventure" : "exploration"], estimatedMinutes: 6 + (index % 7), version: 1,
  };
}

/** Bibliothèque étendue : 360 missions éditorialisées, sans appel à l’IA. */
export const massiveLibraryMissions: LearningMission[] = packs.flatMap((pack) =>
  Array.from({ length: 180 }, (_, index) => buildMission(pack, index)),
);
