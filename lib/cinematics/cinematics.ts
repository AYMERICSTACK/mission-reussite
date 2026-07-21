import type { NarrativeChapter, NarrativeDialogue } from "@/lib/narrative/types";

export type CinematicTheme = "forest" | "valley" | "echoes" | "sky" | "emerald" | "eclipse" | "boss";

export type CinematicScene = {
  id: string;
  title: string;
  subtitle: string;
  symbol: string;
  theme: CinematicTheme;
  dialogues: NarrativeDialogue[];
};

const WORLD_OPENINGS: Record<number, Omit<CinematicScene, "id">> = {
  1: { title: "La Porte des Mondes", subtitle: "Le début d’une grande aventure", symbol: "✨", theme: "forest", dialogues: [
    { speaker: "Narrateur", text: "Une lumière inconnue traverse le ciel et vient se poser devant toi.", mood: "calm" },
    { speaker: "Oscar", text: "Enfin ! Je t’attendais. Les mondes du savoir ont besoin d’un nouveau héros.", mood: "happy" },
    { speaker: "Nova", text: "Chaque défi réussi rallumera une étoile. Ensemble, nous pouvons rouvrir la Porte des Mondes.", mood: "determined" },
  ] },
  6: { title: "La Vallée des Explorateurs", subtitle: "Au-delà de la forêt", symbol: "🏞️", theme: "valley", dialogues: [
    { speaker: "Narrateur", text: "Le sentier descend vers une vallée immense, parcourue de rivières lumineuses.", mood: "calm" },
    { speaker: "Lyra", text: "Ici, les chemins changent lorsque l’on hésite. Observe bien et fais confiance à ce que tu as appris.", mood: "determined" },
  ] },
  11: { title: "Le Royaume des Échos", subtitle: "Les montagnes se réveillent", symbol: "⛰️", theme: "echoes", dialogues: [
    { speaker: "Narrateur", text: "Chaque mot prononcé se répète entre les sommets, comme si la montagne voulait te répondre.", mood: "calm" },
    { speaker: "Orion", text: "Les Échos gardent la mémoire de tous les héros. Fais entendre ta propre voix.", mood: "determined" },
  ] },
  16: { title: "La Citadelle des Nuages", subtitle: "Plus haut que l’orage", symbol: "☁️", theme: "sky", dialogues: [
    { speaker: "Nova", text: "La citadelle flotte au-dessus de nous. Il faudra être précis pour traverser ses ponts de lumière.", mood: "worried" },
    { speaker: "Oscar", text: "Tu as déjà franchi tant d’obstacles. L’orage ne t’arrêtera pas.", mood: "happy" },
  ] },
  21: { title: "Les Terres d’Émeraude", subtitle: "Le cœur mécanique du royaume", symbol: "💚", theme: "emerald", dialogues: [
    { speaker: "Kael", text: "Quelque chose a réveillé les anciennes machines. Leurs engrenages bloquent la route vers la tour.", mood: "worried" },
    { speaker: "Nova", text: "Nous trouverons leur logique. Chaque problème possède une solution.", mood: "determined" },
  ] },
  26: { title: "La Tour de l’Éclipse", subtitle: "Le dernier monde de la Saison 1", symbol: "🌑", theme: "eclipse", dialogues: [
    { speaker: "Narrateur", text: "La lumière disparaît peu à peu tandis que la Tour de l’Éclipse se dresse devant l’équipe.", mood: "worried" },
    { speaker: "Oscar", text: "Tout ce que tu as appris t’a conduit jusqu’ici. Nous avançons ensemble.", mood: "determined" },
    { speaker: "Nova", text: "La peur n’efface pas le courage. Elle nous rappelle seulement pourquoi nous devons continuer.", mood: "determined" },
  ] },
};

export function getChapterCinematic(chapter: NarrativeChapter): CinematicScene | undefined {
  if (chapter.isBoss) {
    return {
      id: `boss-intro:${chapter.slug}`,
      title: chapter.number === 30 ? "L’ultime affrontement" : "Le gardien se réveille",
      subtitle: chapter.title,
      symbol: chapter.symbol,
      theme: "boss",
      dialogues: chapter.opening.slice(0, 3),
    };
  }
  const opening = WORLD_OPENINGS[chapter.number];
  return opening ? { id: `world-intro:${chapter.number}`, ...opening } : undefined;
}
