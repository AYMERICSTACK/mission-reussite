export type VillageNpc = {
  id: string;
  name: string;
  role: string;
  symbol: string;
  location: string;
  greeting: string;
  description: string;
};

export type VillagePlace = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  href: "map" | "avatar" | "collection" | "dashboard" | "quests";
  label: string;
};

export const villageNpcs: VillageNpc[] = [
  { id: "oscar", name: "Oscar", role: "Guide du village", symbol: "🦊", location: "Place de la Fontaine", greeting: "Bienvenue au village ! Ici, chaque chemin mène vers une nouvelle victoire.", description: "Oscar accueille les aventuriers et leur montre les lieux importants." },
  { id: "nova", name: "Nova", role: "Gardienne du savoir", symbol: "✨", location: "Observatoire", greeting: "Ta curiosité est ta plus grande force. Continue à poser des questions.", description: "Nova veille sur les connaissances récoltées pendant les missions." },
  { id: "lyra", name: "Lyra", role: "Messagère des mondes", symbol: "🏹", location: "Porte des Mondes", greeting: "La carte bouge avec toi. Plus tu avances, plus ses secrets apparaissent.", description: "Lyra connaît les routes, les passages cachés et les terres lointaines." },
  { id: "kael", name: "Kael", role: "Forgeron des héros", symbol: "⚒️", location: "Atelier du Héros", greeting: "Un héros ne se reconnaît pas seulement à son équipement, mais il peut quand même avoir du style !", description: "Kael entretient les tenues, accessoires et objets découverts dans les coffres." },
  { id: "orion", name: "Orion", role: "Archiviste", symbol: "📜", location: "Maison des Trésors", greeting: "Chaque badge raconte une aventure. Ta collection est déjà le début d'une légende.", description: "Orion conserve les trophées, badges et souvenirs de la campagne." },
];

export const villagePlaces: VillagePlace[] = [
  { id: "portal", name: "Porte des Mondes", symbol: "🗺️", description: "Rejoins la grande carte et choisis le prochain chapitre de ton aventure.", href: "map", label: "Explorer la carte" },
  { id: "forge", name: "Atelier du Héros", symbol: "🧰", description: "Ouvre tes coffres et équipe ton avatar avant de repartir en mission.", href: "avatar", label: "Personnaliser mon héros" },
  { id: "museum", name: "Maison des Trésors", symbol: "🏆", description: "Retrouve les badges et récompenses gagnés au fil de tes exploits.", href: "collection", label: "Voir ma collection" },
  { id: "board", name: "Tableau des Quêtes", symbol: "📌", description: "Accepte les missions proposées par les habitants et récupère des récompenses exclusives.", href: "quests", label: "Voir les quêtes secondaires" },
];
