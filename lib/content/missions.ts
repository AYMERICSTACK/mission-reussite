import type { ChildKey } from "@/lib/progress/types";
import { fixedAdventureQuests } from "@/lib/content/fixed-adventure-quests";
import { massiveLibraryMissions } from "@/lib/content/massive-library";
import type { LibraryContentType, LibrarySource } from "@/lib/content/library-types";

export type MissionTone = "ce2" | "sixth";
export type MissionDifficulty = 1 | 2 | 3 | 4 | 5;
export type MissionStep = {
  eyebrow: string;
  title: string;
  instruction: string;
  choices: Array<{ label: string; value: string }>;
  answer: string;
  success: string;
  hint: string;
};

export type LearningMission = {
  id: string;
  slug: string;
  child: ChildKey;
  tone: MissionTone;
  firstName: string;
  grade: string;
  title: string;
  category: string;
  skill: string;
  skillId: string;
  duration: string;
  durationLabel: string;
  xp: number;
  companion: string;
  companionRole: string;
  story: string;
  steps: MissionStep[];
  difficulty: MissionDifficulty;
  objective: string;
  prerequisites: string[];
  tags: string[];
  sequence: number;
  adventureStageId: string;
  questNumber: number;
  contentType?: LibraryContentType;
  worldId?: string;
  chapterId?: string;
  source?: LibrarySource;
  curriculum?: string[];
  interests?: string[];
  estimatedMinutes?: number;
  version?: number;
};

const choice = (label: string, value: string) => ({ label, value });

const missionSeeds: Array<Omit<LearningMission,
  "skillId" | "difficulty" | "objective" | "prerequisites" | "tags" | "sequence" | "adventureStageId" | "questNumber"
>> = [
  {
    id: "ce2-reading-treasure", slug: "mystere-tresor", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "Le mystère du trésor", category: "Lecture & compréhension", skill: "Compréhension", duration: "8 minutes", durationLabel: "8 min", xp: 25,
    companion: "Nova", companionRole: "Compagnon explorateur",
    story: "Lina découvre une vieille carte dans le grenier de son grand-père. Une croix rouge indique un endroit près du grand chêne. Elle prend une pelle, rejoint le jardin et trouve une petite boîte contenant trois pièces anciennes et un message : « Le vrai trésor est celui que l’on partage. »",
    steps: [
      { eyebrow: "Je comprends l’histoire", title: "Que découvre Lina dans le grenier ?", instruction: "Relis la première phrase.", choices: [choice("Une vieille carte", "map"), choice("Une boîte de pièces", "box"), choice("Une pelle", "shovel")], answer: "map", success: "Exact ! Tu as repéré l’information écrite dans le texte.", hint: "Cherche ce que Lina trouve avant d’aller dans le jardin." },
      { eyebrow: "Je repère les indices", title: "Où la croix rouge lui demande-t-elle d’aller ?", instruction: "Cherche le lieu indiqué sur la carte.", choices: [choice("Près du grand chêne", "tree"), choice("Dans le grenier", "attic"), choice("Derrière la maison", "house")], answer: "tree", success: "Bravo ! Tu as utilisé un indice précis.", hint: "Le lieu est nommé juste après « indique un endroit »." },
      { eyebrow: "Je comprends le sens", title: "Que veut dire le message final ?", instruction: "Choisis l’idée la plus juste.", choices: [choice("Un trésor vaut plus quand on le partage", "share"), choice("Il faut toujours cacher ses objets", "hide"), choice("Les pièces sont sans valeur", "worthless")], answer: "share", success: "Très bien ! Tu as compris une idée implicite.", hint: "Pense au mot « partage »." },
    ],
  },
  {
    id: "ce2-guided-problem-market", slug: "marche-explorateurs", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "Le marché des explorateurs", category: "Problème guidé", skill: "Problèmes", duration: "10 minutes", durationLabel: "10 min", xp: 35,
    companion: "Nova", companionRole: "Guide des problèmes", story: "Alyssio possède 18 jetons. Il achète une boussole qui coûte 7 jetons. Combien de jetons lui reste-t-il ?",
    steps: [
      { eyebrow: "Je reformule", title: "Que se passe-t-il ?", instruction: "Raconte le problème avec tes mots.", choices: [choice("Il a 18 jetons et en dépense 7", "spends"), choice("Il gagne 7 jetons", "wins"), choice("Il partage 18 jetons", "shares")], answer: "spends", success: "Exact ! La quantité diminue après l’achat.", hint: "Le mot « coûte » indique qu’il donne des jetons." },
      { eyebrow: "Je choisis l’opération", title: "Quelle opération faut-il utiliser ?", instruction: "La quantité augmente-t-elle ou diminue-t-elle ?", choices: [choice("18 + 7", "add"), choice("18 − 7", "subtract"), choice("18 × 7", "multiply")], answer: "subtract", success: "Oui ! Il faut soustraire.", hint: "Après un achat, il reste moins de jetons." },
      { eyebrow: "Je calcule", title: "Combien reste-t-il de jetons ?", instruction: "Calcule 18 − 7.", choices: [choice("25 jetons", "25"), choice("11 jetons", "11"), choice("9 jetons", "9")], answer: "11", success: "Mission réussie ! 18 − 7 = 11.", hint: "Retire 2 pour arriver à 16, puis encore 5." },
    ],
  },
  {
    id: "ce2-mental-additions", slug: "calcul-eclair", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "Défi calcul éclair", category: "Calcul mental", skill: "Calcul mental", duration: "5 minutes", durationLabel: "5 min", xp: 20,
    companion: "Nova", companionRole: "Coach calcul", story: "Le vaisseau de Nova a besoin de trois codes pour décoller. Calcule sans poser les opérations.",
    steps: [
      { eyebrow: "Code 1", title: "Combien font 27 + 8 ?", instruction: "Va d’abord jusqu’à la dizaine suivante.", choices: [choice("33", "33"), choice("35", "35"), choice("36", "36")], answer: "35", success: "Bravo ! 27 + 3 + 5 = 35.", hint: "Ajoute 3 pour arriver à 30, puis 5." },
      { eyebrow: "Code 2", title: "Combien font 46 − 9 ?", instruction: "Retire 10 puis ajoute 1.", choices: [choice("37", "37"), choice("36", "36"), choice("35", "35")], answer: "37", success: "Exact ! 46 − 10 + 1 = 37.", hint: "46 − 10 = 36, puis corrige d’une unité." },
      { eyebrow: "Code 3", title: "Combien font 6 × 4 ?", instruction: "Pense à 4 groupes de 6.", choices: [choice("20", "20"), choice("24", "24"), choice("28", "28")], answer: "24", success: "Décollage réussi ! 6 × 4 = 24.", hint: "6 + 6 + 6 + 6." },
    ],
  },
  {
    id: "ce2-grammar-secret-sentence", slug: "phrase-secrete", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "La phrase secrète", category: "Grammaire", skill: "Nature des mots", duration: "7 minutes", durationLabel: "7 min", xp: 25,
    companion: "Nova", companionRole: "Détective des mots", story: "Phrase à observer : « Le petit astronaute observe une planète brillante. »",
    steps: [
      { eyebrow: "Je trouve le verbe", title: "Quel mot indique l’action ?", instruction: "Demande-toi ce que fait l’astronaute.", choices: [choice("petit", "small"), choice("observe", "observe"), choice("planète", "planet")], answer: "observe", success: "Exact ! « observe » est le verbe.", hint: "Que fait le petit astronaute ?" },
      { eyebrow: "Je trouve le nom", title: "Quel mot désigne une chose ?", instruction: "Repère un nom commun.", choices: [choice("brillante", "bright"), choice("une", "one"), choice("planète", "planet")], answer: "planet", success: "Bravo ! « planète » est un nom commun.", hint: "Ce mot désigne ce que regarde l’astronaute." },
      { eyebrow: "Je trouve l’adjectif", title: "Quel mot précise comment est la planète ?", instruction: "Cherche le mot qui donne une information sur le nom.", choices: [choice("brillante", "bright"), choice("observe", "observe"), choice("le", "the")], answer: "bright", success: "Très bien ! « brillante » complète le nom planète.", hint: "Comment est la planète ?" },
    ],
  },
  {
    id: "ce2-reading-river", slug: "secret-riviere", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "Le secret de la rivière", category: "Lecture & compréhension", skill: "Compréhension", duration: "9 minutes", durationLabel: "9 min", xp: 30,
    companion: "Nova", companionRole: "Compagnon explorateur", story: "Chaque matin, Noé voit des branches bloquer le petit pont. Un jour, il suit les traces dans la boue et découvre un castor qui construit sa maison. Noé décide de déplacer quelques branches sans détruire l’abri de l’animal.",
    steps: [
      { eyebrow: "Je repère", title: "Qu’est-ce qui bloque le pont ?", instruction: "Cherche l’élément répété au début.", choices: [choice("Des pierres", "stones"), choice("Des branches", "branches"), choice("De la neige", "snow")], answer: "branches", success: "Exact ! Ce sont des branches.", hint: "Relis la première phrase." },
      { eyebrow: "Je déduis", title: "Pourquoi y a-t-il des branches ?", instruction: "Relie les indices entre eux.", choices: [choice("Un castor construit sa maison", "beaver"), choice("Noé les apporte", "noe"), choice("Le vent détruit le pont", "wind")], answer: "beaver", success: "Bravo ! Tu as relié les traces et le castor.", hint: "Quel animal découvre Noé ?" },
      { eyebrow: "Je comprends l’intention", title: "Pourquoi Noé déplace-t-il seulement quelques branches ?", instruction: "Observe ce qu’il veut protéger.", choices: [choice("Pour préserver l’abri du castor", "protect"), choice("Parce qu’il est fatigué", "tired"), choice("Pour cacher le pont", "hide")], answer: "protect", success: "Très bien ! Noé cherche une solution respectueuse.", hint: "Il ne veut pas détruire la maison de l’animal." },
    ],
  },
  {
    id: "sixth-method-instructions", slug: "decoder-consigne", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "Décoder une consigne", category: "Méthodologie", skill: "Méthodologie", duration: "8 minutes", durationLabel: "8 min", xp: 25,
    companion: "Orion", companionRole: "Coach méthode", story: "Consigne : « Après avoir lu le document, relève deux causes de la pollution de l’eau et explique chacune d’elles en une phrase. »",
    steps: [
      { eyebrow: "Je repère les verbes", title: "Quelles actions sont demandées ?", instruction: "Identifie les verbes de consigne.", choices: [choice("Lire, relever et expliquer", "three"), choice("Lire et recopier", "copy"), choice("Observer et dessiner", "draw")], answer: "three", success: "Exact ! Les verbes donnent le plan de travail.", hint: "Repère les verbes au début et au milieu." },
      { eyebrow: "Je compte", title: "Combien de causes faut-il relever ?", instruction: "Le nombre demandé est essentiel.", choices: [choice("Une", "one"), choice("Deux", "two"), choice("Toutes", "all")], answer: "two", success: "Très bien ! Il faut deux causes.", hint: "Le nombre est écrit avant « causes »." },
      { eyebrow: "J’organise", title: "Quelle réponse respecte la consigne ?", instruction: "Vérifie le nombre et les explications.", choices: [choice("Deux causes avec une explication chacune", "structured"), choice("Une phrase générale", "general"), choice("Cinq mots sans explication", "list")], answer: "structured", success: "Parfait ! Tu as construit un plan clair.", hint: "Il faut deux éléments et une explication pour chacun." },
    ],
  },
  {
    id: "sixth-math-fractions", slug: "defi-fractions", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "Défi fractions", category: "Mathématiques", skill: "Fractions", duration: "12 minutes", durationLabel: "12 min", xp: 35,
    companion: "Orion", companionRole: "Coach maths", story: "Une station spatiale possède 12 modules. Trois modules sont réservés aux expériences scientifiques.",
    steps: [
      { eyebrow: "Je représente", title: "Quelle fraction des modules est réservée ?", instruction: "Le numérateur indique les modules réservés.", choices: [choice("3/12", "3-12"), choice("12/3", "12-3"), choice("9/12", "9-12")], answer: "3-12", success: "Exact ! 3 modules sur 12 donnent 3/12.", hint: "Place la partie au-dessus et le total en dessous." },
      { eyebrow: "Je simplifie", title: "Quelle fraction est égale à 3/12 ?", instruction: "Divise le haut et le bas par le même nombre.", choices: [choice("1/4", "1-4"), choice("1/3", "1-3"), choice("3/4", "3-4")], answer: "1-4", success: "Bravo ! 3/12 = 1/4.", hint: "Divise 3 et 12 par 3." },
      { eyebrow: "Je compare", title: "Quelle fraction est la plus grande ?", instruction: "Imagine deux parts d’un même gâteau.", choices: [choice("1/4", "quarter"), choice("1/2", "half"), choice("Elles sont égales", "equal")], answer: "half", success: "Très bien ! Une moitié est plus grande qu’un quart.", hint: "Deux quarts forment une moitié." },
    ],
  },
  {
    id: "sixth-english-starter", slug: "english-starter", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "English starter", category: "Anglais", skill: "Anglais", duration: "8 minutes", durationLabel: "8 min", xp: 25,
    companion: "Orion", companionRole: "English coach", story: "Hi! My name is Emma. I am eleven years old. I live in London and I have one brother. I love basketball.",
    steps: [
      { eyebrow: "I understand", title: "How old is Emma?", instruction: "Find the age in the text.", choices: [choice("Ten", "10"), choice("Eleven", "11"), choice("Twelve", "12")], answer: "11", success: "Correct! Emma is eleven years old.", hint: "Look after the words « I am »." },
      { eyebrow: "I locate", title: "Where does Emma live?", instruction: "Find the city.", choices: [choice("Paris", "paris"), choice("London", "london"), choice("Dublin", "dublin")], answer: "london", success: "Great! She lives in London.", hint: "Look after « I live in »." },
      { eyebrow: "I infer", title: "What sport does Emma like?", instruction: "Find the activity after « I love ».", choices: [choice("Football", "football"), choice("Basketball", "basketball"), choice("Tennis", "tennis")], answer: "basketball", success: "Well done! Emma loves basketball.", hint: "Read the final sentence." },
    ],
  },
  {
    id: "sixth-organization-week", slug: "organiser-semaine", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "Organiser sa semaine", category: "Organisation", skill: "Organisation", duration: "7 minutes", durationLabel: "7 min", xp: 25,
    companion: "Orion", companionRole: "Coach autonomie", story: "Léony a un contrôle de maths jeudi, un texte à lire pour mercredi et un sac de sport à préparer pour mardi.",
    steps: [
      { eyebrow: "Je priorise", title: "Quelle tâche arrive en premier ?", instruction: "Classe les échéances par jour.", choices: [choice("Préparer le sac de sport", "sport"), choice("Lire le texte", "read"), choice("Réviser les maths", "math")], answer: "sport", success: "Exact ! Mardi arrive avant mercredi et jeudi.", hint: "Cherche le jour le plus proche." },
      { eyebrow: "J’anticipe", title: "Quand commencer les révisions de maths ?", instruction: "Choisis une organisation sans dernière minute.", choices: [choice("Mercredi soir seulement", "late"), choice("Dès lundi avec de courtes séances", "early"), choice("Jeudi après le contrôle", "after")], answer: "early", success: "Très bien ! Plusieurs séances courtes sont plus efficaces.", hint: "Évite de tout faire la veille." },
      { eyebrow: "Je construis une routine", title: "Quel planning est le plus réaliste ?", instruction: "Garde des tâches courtes et précises.", choices: [choice("Tout faire lundi pendant 3 heures", "all"), choice("20 minutes par jour avec une tâche précise", "short"), choice("Attendre qu’un adulte rappelle chaque tâche", "wait")], answer: "short", success: "Parfait ! Une routine courte favorise l’autonomie.", hint: "Le meilleur planning est régulier et réalisable." },
    ],
  },
  {
    id: "sixth-french-summary", slug: "resume-essentiel", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "Résumer l’essentiel", category: "Français", skill: "Synthèse", duration: "10 minutes", durationLabel: "10 min", xp: 30,
    companion: "Orion", companionRole: "Coach français", story: "Les abeilles transportent le pollen d’une fleur à une autre. Cette pollinisation permet à de nombreuses plantes de produire des fruits et des graines. Leur disparition aurait donc de graves conséquences sur les écosystèmes et notre alimentation.",
    steps: [
      { eyebrow: "Je trouve le thème", title: "De quoi parle principalement le texte ?", instruction: "Cherche le sujet présent dans toutes les phrases.", choices: [choice("Des abeilles et de leur rôle", "bees"), choice("De la fabrication du miel", "honey"), choice("Des graines uniquement", "seeds")], answer: "bees", success: "Exact ! Le texte explique le rôle des abeilles.", hint: "Quel être vivant est cité dès le début ?" },
      { eyebrow: "Je garde l’essentiel", title: "Quelle information est indispensable ?", instruction: "Choisis l’idée qui explique pourquoi elles sont importantes.", choices: [choice("Elles permettent la pollinisation", "pollination"), choice("Elles ont des ailes", "wings"), choice("Elles vivent dehors", "outside")], answer: "pollination", success: "Bravo ! C’est l’idée centrale du texte.", hint: "Cette action permet aux plantes de produire fruits et graines." },
      { eyebrow: "Je résume", title: "Quel résumé est le plus fidèle ?", instruction: "Il doit être court et conserver l’idée principale.", choices: [choice("Les abeilles sont essentielles à la reproduction des plantes et à notre alimentation.", "good"), choice("Les abeilles volent de fleur en fleur.", "partial"), choice("Les fruits contiennent des graines.", "off")], answer: "good", success: "Très bien ! Ton résumé conserve le thème et l’enjeu.", hint: "Le bon résumé relie abeilles, plantes et alimentation." },
    ],
  },
  {
    id: "ce2-vocabulary-space", slug: "mots-espace", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "Les mots de l’espace", category: "Vocabulaire", skill: "Vocabulaire", duration: "6 minutes", durationLabel: "6 min", xp: 20,
    companion: "Nova", companionRole: "Guide des mots", story: "Nova prépare son carnet d’exploration. Pour décrire une planète, elle doit choisir des mots précis et comprendre les mots de la même famille.",
    steps: [
      { eyebrow: "Je comprends", title: "Quel mot signifie presque la même chose que « immense » ?", instruction: "Choisis le synonyme.", choices: [choice("Minuscule", "small"), choice("Gigantesque", "giant"), choice("Rapide", "fast")], answer: "giant", success: "Exact ! « Gigantesque » est un synonyme d’immense.", hint: "Cherche le mot qui parle d’une très grande taille." },
      { eyebrow: "Je classe", title: "Quel mot appartient à la famille de « lumière » ?", instruction: "Observe le début du mot.", choices: [choice("Lumineux", "light"), choice("Lointain", "far"), choice("Lunaire", "moon")], answer: "light", success: "Bravo ! Lumière et lumineux appartiennent à la même famille.", hint: "Les deux mots commencent presque de la même façon." },
      { eyebrow: "Je choisis précisément", title: "Quel adjectif décrit le mieux une étoile qui éclaire fortement ?", instruction: "Choisis le mot le plus précis.", choices: [choice("Brillante", "bright"), choice("Silencieuse", "silent"), choice("Ronde", "round")], answer: "bright", success: "Très bien ! « Brillante » précise son intensité lumineuse.", hint: "Pense à ce que fait la lumière." },
    ],
  },
  {
    id: "ce2-subtraction-bridge", slug: "pont-soustractions", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "Le pont des soustractions", category: "Mathématiques", skill: "Soustraction", duration: "8 minutes", durationLabel: "8 min", xp: 30,
    companion: "Nova", companionRole: "Coach calcul", story: "Pour franchir le pont, Alyssio doit résoudre trois soustractions en utilisant des stratégies simples : retirer une dizaine, décomposer et vérifier.",
    steps: [
      { eyebrow: "Je retire une dizaine", title: "Combien font 54 − 10 ?", instruction: "Seul le chiffre des dizaines change.", choices: [choice("44", "44"), choice("53", "53"), choice("64", "64")], answer: "44", success: "Exact ! 54 − 10 = 44.", hint: "Retire une dizaine complète." },
      { eyebrow: "Je décompose", title: "Combien font 43 − 8 ?", instruction: "Retire 3 puis encore 5.", choices: [choice("35", "35"), choice("36", "36"), choice("31", "31")], answer: "35", success: "Bravo ! 43 − 3 = 40, puis 40 − 5 = 35.", hint: "Commence par aller jusqu’à 40." },
      { eyebrow: "Je vérifie", title: "Quelle addition vérifie que 62 − 27 = 35 ?", instruction: "Additionne le résultat et le nombre retiré.", choices: [choice("35 + 27 = 62", "check"), choice("62 + 27 = 89", "wrong1"), choice("35 + 62 = 97", "wrong2")], answer: "check", success: "Pont franchi ! L’addition inverse confirme le résultat.", hint: "Le résultat plus ce qu’on a retiré doit redonner le départ." },
    ],
  },
  {
    id: "ce2-conjugation-present", slug: "verbes-present", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "Les verbes en action", category: "Français", skill: "Conjugaison", duration: "7 minutes", durationLabel: "7 min", xp: 25,
    companion: "Nova", companionRole: "Coach français", story: "Dans le journal de bord, chaque phrase raconte une action au présent. À toi de choisir la bonne forme du verbe.",
    steps: [
      { eyebrow: "Je repère le sujet", title: "Dans « Nous explorons la grotte », quel est le sujet ?", instruction: "Cherche qui fait l’action.", choices: [choice("Nous", "we"), choice("explorons", "verb"), choice("la grotte", "cave")], answer: "we", success: "Exact ! « Nous » est le sujet.", hint: "Qui explore ?" },
      { eyebrow: "Je conjugue", title: "Complète : « Tu … la carte. »", instruction: "Conjugue le verbe regarder au présent.", choices: [choice("regardes", "look"), choice("regarde", "looks"), choice("regardons", "lookwe")], answer: "look", success: "Bravo ! Avec tu, on écrit « regardes ».", hint: "Avec tu, les verbes en -er finissent souvent par -es." },
      { eyebrow: "J’accorde", title: "Complète : « Les explorateurs … rapidement. »", instruction: "Conjugue avancer au présent.", choices: [choice("avance", "one"), choice("avancent", "many"), choice("avançons", "we")], answer: "many", success: "Très bien ! Le sujet est au pluriel : « avancent ».", hint: "Les explorateurs = ils." },
    ],
  },
  {
    id: "ce2-reading-volcano", slug: "volcan-endormi", child: "alyssio", tone: "ce2", firstName: "Alyssio", grade: "Mission CE2",
    title: "Le volcan endormi", category: "Lecture & compréhension", skill: "Inférences", duration: "9 minutes", durationLabel: "9 min", xp: 30,
    companion: "Nova", companionRole: "Compagnon explorateur", story: "Milo monte sur un ancien volcan. Le sol est froid, les oiseaux nichent près du cratère et de petites fleurs poussent entre les pierres. Le guide explique que le volcan n’est plus entré en éruption depuis des milliers d’années.",
    steps: [
      { eyebrow: "Je repère", title: "Où nichent les oiseaux ?", instruction: "Retrouve le lieu dans le texte.", choices: [choice("Près du cratère", "crater"), choice("Dans la ville", "city"), choice("Sous la mer", "sea")], answer: "crater", success: "Exact ! L’information est écrite dans le texte.", hint: "Relis la deuxième phrase." },
      { eyebrow: "Je déduis", title: "Quel indice montre que le volcan est calme ?", instruction: "Choisis l’indice le plus utile.", choices: [choice("Des fleurs poussent et des oiseaux nichent", "life"), choice("Milo porte des chaussures", "shoes"), choice("Le volcan est haut", "high")], answer: "life", success: "Bravo ! La vie installée près du cratère indique qu’il est calme.", hint: "Cherche ce qui pourrait difficilement vivre près d’une éruption." },
      { eyebrow: "Je comprends", title: "Pourquoi l’appelle-t-on « endormi » ?", instruction: "Interprète cette expression.", choices: [choice("Il n’est pas actif actuellement", "inactive"), choice("Il dort vraiment", "sleep"), choice("Il disparaît la nuit", "night")], answer: "inactive", success: "Très bien ! « Endormi » signifie ici qu’il n’est pas actif.", hint: "C’est une façon imagée de parler du volcan." },
    ],
  },
  {
    id: "sixth-math-proportions", slug: "proportions-recette", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "La recette proportionnelle", category: "Mathématiques", skill: "Proportionnalité", duration: "10 minutes", durationLabel: "10 min", xp: 35,
    companion: "Orion", companionRole: "Coach mathématiques", story: "Une recette pour 4 personnes utilise 200 g de farine. Léony veut adapter les quantités sans perdre les proportions.",
    steps: [
      { eyebrow: "Je comprends", title: "Quelle quantité faut-il pour 2 personnes ?", instruction: "La quantité de personnes est divisée par deux.", choices: [choice("100 g", "100"), choice("202 g", "202"), choice("400 g", "400")], answer: "100", success: "Exact ! On divise aussi la farine par deux.", hint: "La moitié de 200 g." },
      { eyebrow: "J’adapte", title: "Quelle quantité faut-il pour 8 personnes ?", instruction: "Le nombre de personnes double.", choices: [choice("300 g", "300"), choice("400 g", "400"), choice("800 g", "800")], answer: "400", success: "Bravo ! Quand les personnes doublent, la quantité double.", hint: "Calcule 200 × 2." },
      { eyebrow: "Je vérifie", title: "Quel tableau est proportionnel ?", instruction: "Le même coefficient doit s’appliquer partout.", choices: [choice("4 pers. → 200 g ; 6 pers. → 300 g", "yes"), choice("4 pers. → 200 g ; 6 pers. → 250 g", "no1"), choice("4 pers. → 200 g ; 8 pers. → 300 g", "no2")], answer: "yes", success: "Très bien ! 50 g par personne dans les deux cas.", hint: "Calcule la quantité pour une personne." },
    ],
  },
  {
    id: "sixth-english-daily-routine", slug: "daily-routine", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "My daily routine", category: "Anglais", skill: "Présent simple", duration: "8 minutes", durationLabel: "8 min", xp: 25,
    companion: "Orion", companionRole: "English coach", story: "Every morning, Emma gets up at seven, eats breakfast and walks to school. After school, she does her homework before dinner.",
    steps: [
      { eyebrow: "I understand", title: "What time does Emma get up?", instruction: "Find the time in the text.", choices: [choice("At six", "six"), choice("At seven", "seven"), choice("At eight", "eight")], answer: "seven", success: "Correct! Emma gets up at seven.", hint: "Read the first sentence." },
      { eyebrow: "I identify", title: "How does Emma go to school?", instruction: "Choose the correct action.", choices: [choice("She walks", "walks"), choice("She drives", "drives"), choice("She swims", "swims")], answer: "walks", success: "Well done! She walks to school.", hint: "The verb is just before « to school ».", },
      { eyebrow: "I use grammar", title: "Complete: « She … her homework. »", instruction: "Use the present simple.", choices: [choice("do", "do"), choice("does", "does"), choice("doing", "doing")], answer: "does", success: "Excellent! With she, we use « does ».", hint: "He, she, it often add -s or use does." },
    ],
  },
  {
    id: "sixth-french-grammar", slug: "classes-grammaticales", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "Enquête grammaticale", category: "Français", skill: "Classes grammaticales", duration: "9 minutes", durationLabel: "9 min", xp: 30,
    companion: "Orion", companionRole: "Coach français", story: "Phrase à analyser : « Cette jeune scientifique observe attentivement les étoiles lointaines. »",
    steps: [
      { eyebrow: "Je repère", title: "Quelle est la classe grammaticale de « scientifique » ?", instruction: "Observe son rôle dans la phrase.", choices: [choice("Nom", "noun"), choice("Verbe", "verb"), choice("Adverbe", "adverb")], answer: "noun", success: "Exact ! Ici, « scientifique » est le nom noyau du groupe sujet.", hint: "C’est la personne qui réalise l’action." },
      { eyebrow: "Je précise", title: "Quelle est la classe grammaticale de « attentivement » ?", instruction: "Ce mot précise la manière d’observer.", choices: [choice("Adjectif", "adjective"), choice("Adverbe", "adverb"), choice("Déterminant", "determiner")], answer: "adverb", success: "Bravo ! Il modifie le verbe « observe ».", hint: "Les mots en -ment sont souvent des adverbes." },
      { eyebrow: "J’accorde", title: "Pourquoi « lointaines » est-il au féminin pluriel ?", instruction: "Cherche le nom qu’il complète.", choices: [choice("Il s’accorde avec « étoiles »", "stars"), choice("Il s’accorde avec « scientifique »", "scientist"), choice("Il ne s’accorde pas", "none")], answer: "stars", success: "Très bien ! L’adjectif s’accorde avec le nom « étoiles ».", hint: "Quel nom est juste avant ?" },
    ],
  },
  {
    id: "sixth-organisation-backpack", slug: "sac-college", child: "leony", tone: "sixth", firstName: "Léony", grade: "Mission 6e",
    title: "Préparer son sac", category: "Organisation", skill: "Autonomie", duration: "6 minutes", durationLabel: "6 min", xp: 20,
    companion: "Orion", companionRole: "Coach organisation", story: "Demain, Léony a français, mathématiques, EPS et anglais. Son emploi du temps et son cahier de textes doivent l’aider à préparer un sac complet sans l’alourdir inutilement.",
    steps: [
      { eyebrow: "Je consulte", title: "Quel document faut-il regarder en premier ?", instruction: "Cherche ce qui indique les cours du lendemain.", choices: [choice("L’emploi du temps", "schedule"), choice("Le menu de la cantine", "menu"), choice("Une ancienne évaluation", "test")], answer: "schedule", success: "Exact ! L’emploi du temps indique les matières prévues.", hint: "Il organise les cours de chaque journée." },
      { eyebrow: "Je vérifie", title: "Pourquoi consulter aussi le cahier de textes ?", instruction: "Pense aux travaux particuliers.", choices: [choice("Pour voir les devoirs et le matériel demandé", "homework"), choice("Pour connaître la météo", "weather"), choice("Pour compter les élèves", "students")], answer: "homework", success: "Bravo ! Certains cours demandent un matériel spécifique.", hint: "Il contient les devoirs et les consignes des professeurs." },
      { eyebrow: "J’anticipe", title: "Quand préparer son sac ?", instruction: "Choisis l’habitude la plus fiable.", choices: [choice("La veille au soir", "evening"), choice("Au moment de partir", "late"), choice("Une semaine avant sans vérifier", "week")], answer: "evening", success: "Parfait ! La veille permet de vérifier sans stress.", hint: "Évite la précipitation du matin." },
    ],
  },

];


const missionMetadata: Record<string, Pick<LearningMission, "skillId" | "difficulty" | "objective" | "prerequisites" | "tags" | "sequence" | "adventureStageId" | "questNumber">> = {
  "ce2-reading-treasure": { skillId: "ce2-reading-message", difficulty: 2, objective: "Repérer des informations explicites et comprendre le message d’un récit.", prerequisites: ["Lire un texte court"], tags: ["lecture", "récit", "implicite"], sequence: 1, adventureStageId: "sentier-feuilles", questNumber: 1 },
  "ce2-guided-problem-market": { skillId: "ce2-problem-subtraction", difficulty: 2, objective: "Identifier la question d’un problème et choisir une soustraction.", prerequisites: ["Soustraire des nombres inférieurs à 20"], tags: ["maths", "problème", "soustraction"], sequence: 2, adventureStageId: "sentier-feuilles", questNumber: 2 },
  "ce2-mental-additions": { skillId: "ce2-mental-calculation", difficulty: 2, objective: "Mobiliser des stratégies rapides d’addition, soustraction et multiplication.", prerequisites: ["Connaître les compléments à 10"], tags: ["maths", "calcul mental"], sequence: 3, adventureStageId: "sentier-feuilles", questNumber: 3 },
  "ce2-grammar-secret-sentence": { skillId: "ce2-word-classes", difficulty: 2, objective: "Reconnaître le verbe, le nom et l’adjectif dans une phrase.", prerequisites: ["Lire une phrase simple"], tags: ["français", "grammaire"], sequence: 4, adventureStageId: "riviere-chantante", questNumber: 4 },
  "ce2-reading-river": { skillId: "ce2-reading-inference", difficulty: 3, objective: "Relier plusieurs indices pour comprendre l’intention d’un personnage.", prerequisites: ["Repérer une information explicite"], tags: ["lecture", "inférence"], sequence: 5, adventureStageId: "riviere-chantante", questNumber: 5 },
  "ce2-vocabulary-space": { skillId: "ce2-vocabulary-relations", difficulty: 2, objective: "Enrichir le vocabulaire avec les synonymes et les familles de mots.", prerequisites: ["Lire des mots courants"], tags: ["français", "vocabulaire"], sequence: 6, adventureStageId: "riviere-chantante", questNumber: 6 },
  "ce2-subtraction-bridge": { skillId: "ce2-subtraction-strategies", difficulty: 3, objective: "Utiliser différentes stratégies pour calculer et vérifier une soustraction.", prerequisites: ["Soustraire une dizaine"], tags: ["maths", "soustraction"], sequence: 7, adventureStageId: "clairiere-lucioles", questNumber: 7 },
  "ce2-conjugation-present": { skillId: "ce2-present-conjugation", difficulty: 2, objective: "Accorder un verbe du premier groupe avec son sujet au présent.", prerequisites: ["Identifier le sujet et le verbe"], tags: ["français", "conjugaison"], sequence: 8, adventureStageId: "clairiere-lucioles", questNumber: 8 },
  "ce2-reading-volcano": { skillId: "ce2-reading-inference", difficulty: 3, objective: "Produire une inférence simple à partir de plusieurs indices du texte.", prerequisites: ["Comprendre un récit court"], tags: ["lecture", "inférence", "sciences"], sequence: 9, adventureStageId: "clairiere-lucioles", questNumber: 9 },
  "sixth-method-instructions": { skillId: "sixth-instruction-verbs", difficulty: 2, objective: "Décomposer une consigne complexe en actions successives.", prerequisites: ["Identifier un verbe"], tags: ["méthode", "consigne"], sequence: 1, adventureStageId: "porte-idees", questNumber: 1 },
  "sixth-math-fractions": { skillId: "sixth-fraction-meaning", difficulty: 3, objective: "Comparer et interpréter des fractions simples.", prerequisites: ["Comprendre le partage d’une unité"], tags: ["maths", "fractions"], sequence: 2, adventureStageId: "porte-idees", questNumber: 2 },
  "sixth-english-starter": { skillId: "sixth-english-personal-info", difficulty: 2, objective: "Comprendre des informations personnelles simples en anglais.", prerequisites: ["Vocabulaire anglais élémentaire"], tags: ["anglais", "compréhension"], sequence: 3, adventureStageId: "porte-idees", questNumber: 3 },
  "sixth-organization-week": { skillId: "sixth-task-planning", difficulty: 2, objective: "Planifier des tâches scolaires courtes et réalistes.", prerequisites: [], tags: ["organisation", "autonomie"], sequence: 4, adventureStageId: "archives-flottantes", questNumber: 4 },
  "sixth-french-summary": { skillId: "sixth-text-main-idea", difficulty: 3, objective: "Identifier le thème et reformuler l’idée essentielle d’un texte.", prerequisites: ["Comprendre un paragraphe"], tags: ["français", "synthèse"], sequence: 5, adventureStageId: "archives-flottantes", questNumber: 5 },
  "sixth-math-proportions": { skillId: "sixth-proportional-reasoning", difficulty: 3, objective: "Reconnaître et compléter une situation de proportionnalité simple.", prerequisites: ["Multiplier et diviser par 2"], tags: ["maths", "proportionnalité"], sequence: 6, adventureStageId: "archives-flottantes", questNumber: 6 },
  "sixth-english-daily-routine": { skillId: "sixth-english-present-simple", difficulty: 2, objective: "Comprendre une routine et utiliser le présent simple à la troisième personne.", prerequisites: ["Pronoms personnels anglais"], tags: ["anglais", "présent simple"], sequence: 7, adventureStageId: "pont-enigmes", questNumber: 7 },
  "sixth-french-grammar": { skillId: "sixth-word-classes", difficulty: 3, objective: "Identifier plusieurs classes grammaticales et justifier un accord.", prerequisites: ["Identifier un nom et un verbe"], tags: ["français", "grammaire"], sequence: 8, adventureStageId: "pont-enigmes", questNumber: 8 },
  "sixth-organisation-backpack": { skillId: "sixth-school-autonomy", difficulty: 1, objective: "Mettre en place une routine autonome de préparation du matériel.", prerequisites: [], tags: ["organisation", "autonomie"], sequence: 9, adventureStageId: "pont-enigmes", questNumber: 9 },
};

export const learningMissions: LearningMission[] = [
  ...missionSeeds.map((mission) => ({
    ...mission,
    ...missionMetadata[mission.id]!,
  })),
  ...fixedAdventureQuests,
  ...massiveLibraryMissions,
];

function dateKeyInParis(date: Date) {
  return new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function hash(value: string) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function getDailyMissionsForChild(child: ChildKey, date = new Date(), count = 3) {
  const missions = getMissionsForChild(child);
  if (missions.length <= count) return missions;

  const seed = hash(`${child}-${dateKeyInParis(date)}`);
  const ordered = [...missions].sort((a, b) => {
    const scoreA = hash(`${seed}-${a.id}`);
    const scoreB = hash(`${seed}-${b.id}`);
    return scoreA - scoreB;
  });

  const selected: LearningMission[] = [];
  const usedSkills = new Set<string>();

  for (const mission of ordered) {
    if (!usedSkills.has(mission.skill)) {
      selected.push(mission);
      usedSkills.add(mission.skill);
    }
    if (selected.length === count) return selected;
  }

  for (const mission of ordered) {
    if (!selected.some((item) => item.id === mission.id)) selected.push(mission);
    if (selected.length === count) break;
  }

  return selected;
}

export function getMissionCatalogStats(child: ChildKey) {
  const missions = getMissionsForChild(child);
  return {
    total: missions.length,
    skills: new Set(missions.map((mission) => mission.skillId)).size,
    totalXp: missions.reduce((sum, mission) => sum + mission.xp, 0),
    stages: new Set(missions.map((mission) => mission.adventureStageId)).size,
    contentTypes: new Set(missions.map((mission) => mission.contentType ?? "exercise")).size,
    libraryMissions: missions.filter((mission) => mission.source === "generated-template").length,
  };
}

export function getMission(child: ChildKey, slug: string) {
  return learningMissions.find((mission) => mission.child === child && mission.slug === slug);
}

export function getMissionsForChild(child: ChildKey) {
  return learningMissions.filter((mission) => mission.child === child);
}