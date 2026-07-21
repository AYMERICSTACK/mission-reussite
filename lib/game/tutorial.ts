export const TUTORIAL_REWARD_ID = "companion-mini-nova";
export type TutorialEvent = "village-opened" | "oscar-talked" | "map-opened" | "mission-completed" | "item-equipped" | "chest-opened" | "collection-opened";
export const tutorialSteps = [
  { id: 0, title: "Bienvenue, jeune aventurier !", message: "Oscar et Nova vont te montrer les secrets de Mission Réussite.", action: "Commencer le tutoriel", symbol: "🦉" },
  { id: 1, title: "Ton quartier général", message: "Ici, tu retrouves ta mission, ton niveau, la carte, le village et tes succès.", action: "Visiter le village", symbol: "🏠" },
  { id: 2, title: "Parle à Oscar", message: "Dans le village, touche Oscar pour écouter son conseil.", action: "Choisir Oscar", symbol: "🦉" },
  { id: 3, title: "Découvre la grande carte", message: "Ouvre la carte pour voir les mondes, les chapitres et les boss.", action: "Ouvrir la carte", symbol: "🗺️" },
  { id: 4, title: "Accomplis une mission", message: "Choisis une mission disponible et termine-la à ton rythme.", action: "Faire une mission", symbol: "⚔️" },
  { id: 5, title: "Personnalise ton héros", message: "Va dans l’atelier et équipe un objet déjà débloqué.", action: "Ouvrir l’avatar", symbol: "🧥" },
  { id: 6, title: "Les coffres d’aventure", message: "Ouvre un coffre disponible. S’il n’y en a pas encore, tu peux continuer : le prochain arrivera après quelques missions.", action: "Voir les coffres", symbol: "🎁" },
  { id: 7, title: "Ta collection de succès", message: "Consulte les badges et trophées qui racontent tes exploits.", action: "Voir mes succès", symbol: "🏆" },
  { id: 8, title: "Tutoriel terminé !", message: "Tu sais maintenant partir seul à l’aventure. Mini Nova rejoint ton inventaire !", action: "Recevoir Mini Nova", symbol: "✨" },
] as const;
export const TUTORIAL_LAST_STEP = tutorialSteps.length - 1;
