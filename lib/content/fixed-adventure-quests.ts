import type { LearningMission } from "@/lib/content/missions";

/** Quêtes fixes écrites pour le premier chapitre. Aucun appel à Nova/OpenAI. */
export const fixedAdventureQuests: LearningMission[] = [
  {
    "id": "ce2-forest-map",
    "slug": "carte-feuilles",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "La carte des feuilles",
    "category": "Lecture & compréhension",
    "skill": "Compréhension",
    "skillId": "ce2-reading-explicit",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Léo",
    "companionRole": "Compagnon de quête",
    "story": "Léo découvre quatre feuilles portant les mots « pont », « mousse », « nord » et « ruisseau ». Une note d’Oscar indique : « Suis la feuille qui montre une direction, puis cherche près de l’eau. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel mot indique une direction ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "nord",
            "value": "choice-1-1"
          },
          {
            "label": "mousse",
            "value": "choice-1-2"
          },
          {
            "label": "pont",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Le mot « nord » indique une direction.",
        "hint": "Cherche un point cardinal."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Où faut-il chercher ensuite ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Près de l’eau",
            "value": "choice-2-1"
          },
          {
            "label": "Dans un arbre",
            "value": "choice-2-2"
          },
          {
            "label": "Sous une pierre",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Exact, la note dit de chercher près de l’eau.",
        "hint": "Relis la fin de la note."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel élément du décor correspond à l’indice ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Le ruisseau",
            "value": "choice-3-1"
          },
          {
            "label": "Le pont",
            "value": "choice-3-2"
          },
          {
            "label": "La mousse",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, le ruisseau est bien un lieu avec de l’eau.",
        "hint": "Quel mot désigne un petit cours d’eau ?"
      }
    ],
    "difficulty": 1,
    "objective": "Repérer précisément une information écrite dans un récit.",
    "prerequisites": [
      "Lire un texte court"
    ],
    "tags": [
      "lecture & compréhension",
      "compréhension",
      "aventure"
    ],
    "sequence": 10,
    "adventureStageId": "sentier-feuilles",
    "questNumber": 1
  },
  {
    "id": "ce2-forest-letter",
    "slug": "lettre-oscar",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "La lettre froissée d’Oscar",
    "category": "Lecture & compréhension",
    "skill": "Compréhension",
    "skillId": "ce2-reading-inference",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Léo",
    "companionRole": "Compagnon de quête",
    "story": "Oscar laisse une lettre devant sa cabane : « Je suis parti avant le lever du soleil. J’ai emporté ma lanterne et mes bottes. Le sentier est encore couvert de flaques. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "À quel moment Oscar est-il parti ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Très tôt le matin",
            "value": "choice-1-1"
          },
          {
            "label": "À midi",
            "value": "choice-1-2"
          },
          {
            "label": "Le soir",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Oui, il est parti avant le lever du soleil.",
        "hint": "Quand le soleil n’est pas encore levé, quelle partie de la journée commence ?"
      },
      {
        "eyebrow": "Étape 2",
        "title": "Pourquoi a-t-il pris ses bottes ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Le sentier est mouillé",
            "value": "choice-2-1"
          },
          {
            "label": "Il veut courir",
            "value": "choice-2-2"
          },
          {
            "label": "Il fait très chaud",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Exact, les flaques rendent le sentier humide.",
        "hint": "Relie les bottes aux flaques."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Que peut-on déduire sur la météo récente ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Il a probablement plu",
            "value": "choice-3-1"
          },
          {
            "label": "Il a neigé",
            "value": "choice-3-2"
          },
          {
            "label": "Il y a eu une sécheresse",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bien vu : les flaques sont un indice de pluie récente.",
        "hint": "Qu’est-ce qui forme souvent des flaques ?"
      }
    ],
    "difficulty": 2,
    "objective": "Relier plusieurs indices pour produire une inférence simple.",
    "prerequisites": [
      "Repérer une information explicite"
    ],
    "tags": [
      "lecture & compréhension",
      "compréhension",
      "aventure"
    ],
    "sequence": 11,
    "adventureStageId": "sentier-feuilles",
    "questNumber": 2
  },
  {
    "id": "ce2-river-message",
    "slug": "message-galets",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Le message des galets",
    "category": "Lecture & compréhension",
    "skill": "Compréhension",
    "skillId": "ce2-reading-message",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Oscar",
    "companionRole": "Compagnon de quête",
    "story": "Sur la rive, trois galets portent les mots « écouter », « observer » et « partager ». La rivière murmure : « Celui qui avance seul voit moins loin que ceux qui s’entraident. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quels mots sont écrits sur les galets ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Écouter, observer, partager",
            "value": "choice-1-1"
          },
          {
            "label": "Courir, sauter, gagner",
            "value": "choice-1-2"
          },
          {
            "label": "Dormir, manger, rire",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, tu as repéré les trois mots du texte.",
        "hint": "Relis la première phrase."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Que conseille la rivière ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "De s’entraider",
            "value": "choice-2-1"
          },
          {
            "label": "D’aller plus vite",
            "value": "choice-2-2"
          },
          {
            "label": "De garder les indices",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, la rivière valorise l’entraide.",
        "hint": "Pense à « ceux qui s’entraident »."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quelle est l’idée principale ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "On progresse mieux ensemble",
            "value": "choice-3-1"
          },
          {
            "label": "Il faut éviter la rivière",
            "value": "choice-3-2"
          },
          {
            "label": "Les galets sont magiques",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, tu as compris le message global.",
        "hint": "Choisis l’idée qui résume toute la phrase."
      }
    ],
    "difficulty": 3,
    "objective": "Comprendre l’idée principale et le message d’un récit.",
    "prerequisites": [
      "Comprendre les événements d’un récit"
    ],
    "tags": [
      "lecture & compréhension",
      "compréhension",
      "aventure"
    ],
    "sequence": 12,
    "adventureStageId": "riviere-chantante",
    "questNumber": 3
  },
  {
    "id": "ce2-river-sums",
    "slug": "passerelle-nombres",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "La passerelle des nombres",
    "category": "Calcul mental",
    "skill": "Calcul mental",
    "skillId": "ce2-number-complements",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Oscar",
    "companionRole": "Compagnon de quête",
    "story": "Pour faire apparaître une passerelle, Alyssio doit compléter trois pierres afin que chaque paire fasse 10.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel nombre complète 7 pour faire 10 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "3",
            "value": "choice-1-1"
          },
          {
            "label": "2",
            "value": "choice-1-2"
          },
          {
            "label": "4",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact : 7 + 3 = 10.",
        "hint": "Compte de 7 jusqu’à 10."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quel nombre complète 6 pour faire 10 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "4",
            "value": "choice-2-1"
          },
          {
            "label": "5",
            "value": "choice-2-2"
          },
          {
            "label": "3",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bravo : 6 + 4 = 10.",
        "hint": "Combien manque-t-il après 6 ?"
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel nombre complète 9 pour faire 10 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "1",
            "value": "choice-3-1"
          },
          {
            "label": "2",
            "value": "choice-3-2"
          },
          {
            "label": "0",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Passage ouvert : 9 + 1 = 10.",
        "hint": "Il ne manque qu’une unité."
      }
    ],
    "difficulty": 1,
    "objective": "Automatiser les compléments à 10.",
    "prerequisites": [],
    "tags": [
      "calcul mental",
      "calcul mental",
      "aventure"
    ],
    "sequence": 13,
    "adventureStageId": "riviere-chantante",
    "questNumber": 4
  },
  {
    "id": "ce2-firefly-calc",
    "slug": "lucioles-calcul",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Les lucioles pressées",
    "category": "Calcul mental",
    "skill": "Calcul mental",
    "skillId": "ce2-mental-calculation",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Luna",
    "companionRole": "Compagnon de quête",
    "story": "Les lucioles s’allument seulement lorsque les calculs sont trouvés rapidement. Luna te confie trois codes.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Combien font 38 + 7 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "45",
            "value": "choice-1-1"
          },
          {
            "label": "44",
            "value": "choice-1-2"
          },
          {
            "label": "46",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Oui : 38 + 2 + 5 = 45.",
        "hint": "Va d’abord jusqu’à 40."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Combien font 52 − 8 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "44",
            "value": "choice-2-1"
          },
          {
            "label": "46",
            "value": "choice-2-2"
          },
          {
            "label": "42",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Exact : 52 − 2 − 6 = 44.",
        "hint": "Descends d’abord jusqu’à 50."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Combien font 5 × 6 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "30",
            "value": "choice-3-1"
          },
          {
            "label": "25",
            "value": "choice-3-2"
          },
          {
            "label": "35",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo : cinq groupes de six font 30.",
        "hint": "Compte 6, 12, 18, 24, 30."
      }
    ],
    "difficulty": 2,
    "objective": "Choisir une stratégie de calcul mental efficace.",
    "prerequisites": [
      "Connaître les compléments à 10"
    ],
    "tags": [
      "calcul mental",
      "calcul mental",
      "aventure"
    ],
    "sequence": 14,
    "adventureStageId": "clairiere-lucioles",
    "questNumber": 5
  },
  {
    "id": "ce2-bridge-sub",
    "slug": "pont-branches",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Le pont de branches",
    "category": "Mathématiques",
    "skill": "Soustractions",
    "skillId": "ce2-subtraction-strategies",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Luna",
    "companionRole": "Compagnon de quête",
    "story": "Le pont comporte 64 branches. Le vent en emporte 27. Luna doit savoir combien restent solides avant de traverser.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle opération correspond à la situation ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "64 − 27",
            "value": "choice-1-1"
          },
          {
            "label": "64 + 27",
            "value": "choice-1-2"
          },
          {
            "label": "27 − 64",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, des branches sont retirées.",
        "hint": "La quantité diminue."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Combien font 64 − 20 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "44",
            "value": "choice-2-1"
          },
          {
            "label": "54",
            "value": "choice-2-2"
          },
          {
            "label": "34",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, retire d’abord les deux dizaines.",
        "hint": "Commence par les dizaines."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Combien restent de branches après avoir encore retiré 7 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "37",
            "value": "choice-3-1"
          },
          {
            "label": "47",
            "value": "choice-3-2"
          },
          {
            "label": "36",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo : 64 − 27 = 37.",
        "hint": "44 − 7 = ?"
      }
    ],
    "difficulty": 3,
    "objective": "Décomposer une soustraction et vérifier son résultat.",
    "prerequisites": [
      "Soustraire des dizaines"
    ],
    "tags": [
      "mathématiques",
      "soustractions",
      "aventure"
    ],
    "sequence": 15,
    "adventureStageId": "clairiere-lucioles",
    "questNumber": 6
  },
  {
    "id": "ce2-chest-problem",
    "slug": "coffre-noisettes",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Le coffre de noisettes",
    "category": "Problème guidé",
    "skill": "Problèmes",
    "skillId": "ce2-problem-subtraction",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Nova",
    "companionRole": "Guide de l’aventure",
    "story": "Léo avait rangé 45 noisettes dans un coffre. Il en donne 18 aux animaux du sentier. Combien lui en reste-t-il ?",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Que cherche-t-on ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Le nombre de noisettes restantes",
            "value": "choice-1-1"
          },
          {
            "label": "Le nombre d’animaux",
            "value": "choice-1-2"
          },
          {
            "label": "Le poids du coffre",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, la question porte sur ce qui reste.",
        "hint": "Lis la dernière question."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quelle opération faut-il poser ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "45 − 18",
            "value": "choice-2-1"
          },
          {
            "label": "45 + 18",
            "value": "choice-2-2"
          },
          {
            "label": "18 × 45",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, Léo donne une partie de ses noisettes.",
        "hint": "Donner fait diminuer la quantité."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel est le résultat ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "27",
            "value": "choice-3-1"
          },
          {
            "label": "37",
            "value": "choice-3-2"
          },
          {
            "label": "23",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Mission réussie : 45 − 18 = 27.",
        "hint": "45 − 20 = 25, puis ajoute 2."
      }
    ],
    "difficulty": 1,
    "objective": "Identifier une situation de retrait et résoudre le problème.",
    "prerequisites": [
      "Comprendre le sens de la soustraction"
    ],
    "tags": [
      "problème guidé",
      "problèmes",
      "aventure"
    ],
    "sequence": 16,
    "adventureStageId": "grand-chene",
    "questNumber": 7
  },
  {
    "id": "ce2-grammar-animals",
    "slug": "mots-animaux",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Le conseil des animaux",
    "category": "Grammaire",
    "skill": "Nature des mots",
    "skillId": "ce2-word-classes",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Léo",
    "companionRole": "Compagnon de quête",
    "story": "Phrase à observer : « La jeune renarde cherche une plume brillante. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel mot est le verbe ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "cherche",
            "value": "choice-1-1"
          },
          {
            "label": "jeune",
            "value": "choice-1-2"
          },
          {
            "label": "plume",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, « cherche » indique l’action.",
        "hint": "Que fait la renarde ?"
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quel mot est un nom commun ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "plume",
            "value": "choice-2-1"
          },
          {
            "label": "brillante",
            "value": "choice-2-2"
          },
          {
            "label": "une",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bravo, « plume » désigne une chose.",
        "hint": "Quel mot peut être précédé de « une » ?"
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel mot est un adjectif ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "brillante",
            "value": "choice-3-1"
          },
          {
            "label": "cherche",
            "value": "choice-3-2"
          },
          {
            "label": "la",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Oui, il précise comment est la plume.",
        "hint": "Comment est la plume ?"
      }
    ],
    "difficulty": 2,
    "objective": "Reconnaître le nom, le verbe et l’adjectif.",
    "prerequisites": [
      "Lire une phrase simple"
    ],
    "tags": [
      "grammaire",
      "nature des mots",
      "aventure"
    ],
    "sequence": 17,
    "adventureStageId": "sentier-feuilles",
    "questNumber": 8
  },
  {
    "id": "ce2-conjugation-path",
    "slug": "verbes-sentier",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Les verbes du sentier",
    "category": "Conjugaison",
    "skill": "Présent des verbes",
    "skillId": "ce2-present-conjugation",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Oscar",
    "companionRole": "Compagnon de quête",
    "story": "Pour suivre le bon chemin, il faut compléter les phrases au présent.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Léo … vers la rivière.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "marche",
            "value": "choice-1-1"
          },
          {
            "label": "marches",
            "value": "choice-1-2"
          },
          {
            "label": "marchent",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact : avec « Léo », on écrit « marche ».",
        "hint": "Remplace Léo par « il »."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Nous … les traces dorées.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "observons",
            "value": "choice-2-1"
          },
          {
            "label": "observe",
            "value": "choice-2-2"
          },
          {
            "label": "observez",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bravo : avec « nous », la terminaison est -ons.",
        "hint": "Pense à la terminaison de « nous »."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Les lucioles … dans la nuit.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "brillent",
            "value": "choice-3-1"
          },
          {
            "label": "brille",
            "value": "choice-3-2"
          },
          {
            "label": "brilles",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Oui : avec un sujet pluriel, on écrit « brillent ».",
        "hint": "Le sujet est au pluriel."
      }
    ],
    "difficulty": 3,
    "objective": "Accorder des verbes du premier groupe au présent.",
    "prerequisites": [
      "Identifier le sujet et le verbe"
    ],
    "tags": [
      "conjugaison",
      "présent des verbes",
      "aventure"
    ],
    "sequence": 18,
    "adventureStageId": "riviere-chantante",
    "questNumber": 9
  },
  {
    "id": "ce2-vocab-forest",
    "slug": "familles-foret",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Les familles de la forêt",
    "category": "Vocabulaire",
    "skill": "Relations entre les mots",
    "skillId": "ce2-vocabulary-relations",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Nova",
    "companionRole": "Guide de l’aventure",
    "story": "Le Grand Chêne ouvre sa porte seulement si les mots de la même famille sont réunis.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel mot est de la famille de « forêt » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "forestier",
            "value": "choice-1-1"
          },
          {
            "label": "fourchette",
            "value": "choice-1-2"
          },
          {
            "label": "orage",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, « forestier » appartient à la même famille.",
        "hint": "Cherche le mot qui reprend « forest- »."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quel est un synonyme de « rapide » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "vite",
            "value": "choice-2-1"
          },
          {
            "label": "lourd",
            "value": "choice-2-2"
          },
          {
            "label": "sombre",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bravo, « vite » exprime la même idée.",
        "hint": "Quel mot signifie qu’on ne perd pas de temps ?"
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel mot est contraire de « silencieux » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "bruyant",
            "value": "choice-3-1"
          },
          {
            "label": "calme",
            "value": "choice-3-2"
          },
          {
            "label": "léger",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Oui, « bruyant » est l’opposé de « silencieux ».",
        "hint": "Cherche le mot qui fait penser au bruit."
      }
    ],
    "difficulty": 1,
    "objective": "Identifier synonymes, contraires et familles de mots.",
    "prerequisites": [
      "Comprendre des mots courants"
    ],
    "tags": [
      "vocabulaire",
      "relations entre les mots",
      "aventure"
    ],
    "sequence": 19,
    "adventureStageId": "grand-chene",
    "questNumber": 10
  },
  {
    "id": "ce2-forest-signs",
    "slug": "panneaux-mousse",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Les panneaux de mousse",
    "category": "Lecture & compréhension",
    "skill": "Compréhension",
    "skillId": "ce2-reading-explicit",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Léo",
    "companionRole": "Compagnon de quête",
    "story": "Trois panneaux indiquent : « Cabane à 200 mètres », « Rivière à gauche » et « Clairière interdite après la nuit ». Léo cherche le chemin le plus court vers l’eau.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel panneau parle de l’eau ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Rivière à gauche",
            "value": "choice-1-1"
          },
          {
            "label": "Cabane à 200 mètres",
            "value": "choice-1-2"
          },
          {
            "label": "Clairière interdite",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, la rivière est un lieu d’eau.",
        "hint": "Repère le mot « rivière »."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Dans quelle direction faut-il aller ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "À gauche",
            "value": "choice-2-1"
          },
          {
            "label": "À droite",
            "value": "choice-2-2"
          },
          {
            "label": "Tout droit",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, le panneau précise « à gauche ».",
        "hint": "Relis l’indication complète."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quand la clairière est-elle interdite ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Après la nuit",
            "value": "choice-3-1"
          },
          {
            "label": "Le matin",
            "value": "choice-3-2"
          },
          {
            "label": "À midi",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, l’information est écrite directement.",
        "hint": "Cherche le complément de temps."
      }
    ],
    "difficulty": 2,
    "objective": "Repérer précisément une information écrite dans un récit.",
    "prerequisites": [
      "Lire un texte court"
    ],
    "tags": [
      "lecture & compréhension",
      "compréhension",
      "aventure"
    ],
    "sequence": 20,
    "adventureStageId": "sentier-feuilles",
    "questNumber": 11
  },
  {
    "id": "ce2-owl-clue",
    "slug": "plume-humide",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "La plume humide",
    "category": "Lecture & compréhension",
    "skill": "Compréhension",
    "skillId": "ce2-reading-inference",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Oscar",
    "companionRole": "Compagnon de quête",
    "story": "Près de la rivière, Alyssio trouve une plume d’Oscar encore humide et une petite trace de boue qui mène vers un rocher.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "À qui appartient probablement la plume ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "À Oscar",
            "value": "choice-1-1"
          },
          {
            "label": "À Luna",
            "value": "choice-1-2"
          },
          {
            "label": "À Léo",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, le texte précise qu’il s’agit d’une plume d’Oscar.",
        "hint": "Relis le début."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Pourquoi la plume est-elle humide ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Elle a touché l’eau",
            "value": "choice-2-1"
          },
          {
            "label": "Elle a brûlé",
            "value": "choice-2-2"
          },
          {
            "label": "Elle était dans un livre",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bien vu, la rivière est juste à côté.",
        "hint": "Quel élément du décor peut mouiller la plume ?"
      },
      {
        "eyebrow": "Étape 3",
        "title": "Où faut-il chercher ensuite ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Près du rocher",
            "value": "choice-3-1"
          },
          {
            "label": "Dans la cabane",
            "value": "choice-3-2"
          },
          {
            "label": "Sous le Grand Chêne",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Oui, la trace de boue y mène.",
        "hint": "Suis la direction de la trace."
      }
    ],
    "difficulty": 3,
    "objective": "Relier plusieurs indices pour produire une inférence simple.",
    "prerequisites": [
      "Repérer une information explicite"
    ],
    "tags": [
      "lecture & compréhension",
      "compréhension",
      "aventure"
    ],
    "sequence": 21,
    "adventureStageId": "riviere-chantante",
    "questNumber": 12
  },
  {
    "id": "ce2-tree-promise",
    "slug": "promesse-chene",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "La promesse du Grand Chêne",
    "category": "Lecture & compréhension",
    "skill": "Compréhension",
    "skillId": "ce2-reading-message",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Nova",
    "companionRole": "Guide de l’aventure",
    "story": "Le Grand Chêne dit : « Chaque erreur est une racine nouvelle. Elle t’aide à tenir plus fort lorsque tu essaies encore. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "De quoi parle le Grand Chêne ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Des erreurs qui aident à apprendre",
            "value": "choice-1-1"
          },
          {
            "label": "Des racines dangereuses",
            "value": "choice-1-2"
          },
          {
            "label": "D’un arbre malade",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, le message parle de persévérance.",
        "hint": "Que deviennent les erreurs dans la comparaison ?"
      },
      {
        "eyebrow": "Étape 2",
        "title": "Que faut-il faire après une erreur ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Essayer encore",
            "value": "choice-2-1"
          },
          {
            "label": "Tout arrêter",
            "value": "choice-2-2"
          },
          {
            "label": "Cacher sa réponse",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, il faut persévérer.",
        "hint": "Relis la fin du message."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quelle valeur est mise en avant ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "La persévérance",
            "value": "choice-3-1"
          },
          {
            "label": "La vitesse",
            "value": "choice-3-2"
          },
          {
            "label": "La compétition",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, tu as compris l’idée principale.",
        "hint": "Quel mot décrit le fait de recommencer ?"
      }
    ],
    "difficulty": 1,
    "objective": "Comprendre l’idée principale et le message d’un récit.",
    "prerequisites": [
      "Comprendre les événements d’un récit"
    ],
    "tags": [
      "lecture & compréhension",
      "compréhension",
      "aventure"
    ],
    "sequence": 22,
    "adventureStageId": "grand-chene",
    "questNumber": 13
  },
  {
    "id": "ce2-crystal-ten",
    "slug": "cristaux-dix",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Les cristaux de dix",
    "category": "Calcul mental",
    "skill": "Calcul mental",
    "skillId": "ce2-number-complements",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Oscar",
    "companionRole": "Compagnon de quête",
    "story": "Chaque cristal doit recevoir deux nombres dont la somme vaut 10.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "5 + … = 10",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "5",
            "value": "choice-1-1"
          },
          {
            "label": "4",
            "value": "choice-1-2"
          },
          {
            "label": "6",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact : 5 + 5 = 10.",
        "hint": "La moitié de 10 est 5."
      },
      {
        "eyebrow": "Étape 2",
        "title": "2 + … = 10",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "8",
            "value": "choice-2-1"
          },
          {
            "label": "7",
            "value": "choice-2-2"
          },
          {
            "label": "9",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bravo : 2 + 8 = 10.",
        "hint": "Compte de 2 à 10."
      },
      {
        "eyebrow": "Étape 3",
        "title": "8 + … = 10",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "2",
            "value": "choice-3-1"
          },
          {
            "label": "3",
            "value": "choice-3-2"
          },
          {
            "label": "1",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Oui : 8 + 2 = 10.",
        "hint": "Il manque deux unités."
      }
    ],
    "difficulty": 2,
    "objective": "Automatiser les compléments à 10.",
    "prerequisites": [],
    "tags": [
      "calcul mental",
      "calcul mental",
      "aventure"
    ],
    "sequence": 23,
    "adventureStageId": "riviere-chantante",
    "questNumber": 14
  },
  {
    "id": "ce2-firefly-series",
    "slug": "suite-lucioles",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "La suite des lucioles",
    "category": "Calcul mental",
    "skill": "Calcul mental",
    "skillId": "ce2-mental-calculation",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Luna",
    "companionRole": "Compagnon de quête",
    "story": "Une rangée de lucioles clignote selon une suite de calculs rapides.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Combien font 19 + 6 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "25",
            "value": "choice-1-1"
          },
          {
            "label": "24",
            "value": "choice-1-2"
          },
          {
            "label": "26",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact : 19 + 1 + 5 = 25.",
        "hint": "Passe par 20."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Combien font 70 − 9 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "61",
            "value": "choice-2-1"
          },
          {
            "label": "59",
            "value": "choice-2-2"
          },
          {
            "label": "62",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui : 70 − 10 + 1 = 61.",
        "hint": "Retire 10 puis ajoute 1."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Combien font 4 × 7 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "28",
            "value": "choice-3-1"
          },
          {
            "label": "24",
            "value": "choice-3-2"
          },
          {
            "label": "32",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo : 4 groupes de 7 font 28.",
        "hint": "7 + 7 + 7 + 7."
      }
    ],
    "difficulty": 3,
    "objective": "Choisir une stratégie de calcul mental efficace.",
    "prerequisites": [
      "Connaître les compléments à 10"
    ],
    "tags": [
      "calcul mental",
      "calcul mental",
      "aventure"
    ],
    "sequence": 24,
    "adventureStageId": "clairiere-lucioles",
    "questNumber": 15
  },
  {
    "id": "ce2-rope-sub",
    "slug": "corde-pont",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "La corde du vieux pont",
    "category": "Mathématiques",
    "skill": "Soustractions",
    "skillId": "ce2-subtraction-strategies",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Luna",
    "companionRole": "Compagnon de quête",
    "story": "Une corde mesure 83 mètres. Luna utilise 36 mètres pour réparer le pont.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle opération faut-il calculer ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "83 − 36",
            "value": "choice-1-1"
          },
          {
            "label": "83 + 36",
            "value": "choice-1-2"
          },
          {
            "label": "36 − 83",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, une partie de la corde est utilisée.",
        "hint": "La longueur restante est plus petite."
      },
      {
        "eyebrow": "Étape 2",
        "title": "83 − 30 vaut…",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "53",
            "value": "choice-2-1"
          },
          {
            "label": "63",
            "value": "choice-2-2"
          },
          {
            "label": "43",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, retire trois dizaines.",
        "hint": "Commence par 83 − 3 dizaines."
      },
      {
        "eyebrow": "Étape 3",
        "title": "53 − 6 vaut…",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "47",
            "value": "choice-3-1"
          },
          {
            "label": "49",
            "value": "choice-3-2"
          },
          {
            "label": "46",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo : il reste 47 mètres.",
        "hint": "Recule de six à partir de 53."
      }
    ],
    "difficulty": 1,
    "objective": "Décomposer une soustraction et vérifier son résultat.",
    "prerequisites": [
      "Soustraire des dizaines"
    ],
    "tags": [
      "mathématiques",
      "soustractions",
      "aventure"
    ],
    "sequence": 25,
    "adventureStageId": "clairiere-lucioles",
    "questNumber": 16
  },
  {
    "id": "ce2-lantern-problem",
    "slug": "lanternes-eteintes",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Les lanternes éteintes",
    "category": "Problème guidé",
    "skill": "Problèmes",
    "skillId": "ce2-problem-subtraction",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Luna",
    "companionRole": "Compagnon de quête",
    "story": "La clairière compte 52 lanternes. Après une rafale, 19 s’éteignent. Combien restent allumées ?",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle quantité diminue ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Le nombre de lanternes allumées",
            "value": "choice-1-1"
          },
          {
            "label": "Le nombre de rafales",
            "value": "choice-1-2"
          },
          {
            "label": "Le nombre de personnages",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, certaines lanternes s’éteignent.",
        "hint": "Repère ce qui change."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quelle opération convient ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "52 − 19",
            "value": "choice-2-1"
          },
          {
            "label": "52 + 19",
            "value": "choice-2-2"
          },
          {
            "label": "19 × 2",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, il faut retirer les lanternes éteintes.",
        "hint": "Le nombre final est inférieur à 52."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Combien restent allumées ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "33",
            "value": "choice-3-1"
          },
          {
            "label": "43",
            "value": "choice-3-2"
          },
          {
            "label": "31",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Mission réussie : 52 − 19 = 33.",
        "hint": "52 − 20 = 32, puis ajoute 1."
      }
    ],
    "difficulty": 2,
    "objective": "Identifier une situation de retrait et résoudre le problème.",
    "prerequisites": [
      "Comprendre le sens de la soustraction"
    ],
    "tags": [
      "problème guidé",
      "problèmes",
      "aventure"
    ],
    "sequence": 26,
    "adventureStageId": "clairiere-lucioles",
    "questNumber": 17
  },
  {
    "id": "ce2-grammar-river",
    "slug": "phrase-riviere",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "La phrase de la rivière",
    "category": "Grammaire",
    "skill": "Nature des mots",
    "skillId": "ce2-word-classes",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Oscar",
    "companionRole": "Compagnon de quête",
    "story": "Phrase à observer : « Le courant rapide emporte les feuilles jaunes. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel mot est le verbe ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "emporte",
            "value": "choice-1-1"
          },
          {
            "label": "rapide",
            "value": "choice-1-2"
          },
          {
            "label": "courant",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, « emporte » indique l’action.",
        "hint": "Que fait le courant ?"
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quel mot est un nom ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "feuilles",
            "value": "choice-2-1"
          },
          {
            "label": "jaunes",
            "value": "choice-2-2"
          },
          {
            "label": "les",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bravo, « feuilles » désigne des choses.",
        "hint": "Quel mot peut être précédé de « les » ?"
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel mot est un adjectif ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "jaunes",
            "value": "choice-3-1"
          },
          {
            "label": "emporte",
            "value": "choice-3-2"
          },
          {
            "label": "le",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Oui, il décrit les feuilles.",
        "hint": "Comment sont les feuilles ?"
      }
    ],
    "difficulty": 3,
    "objective": "Reconnaître le nom, le verbe et l’adjectif.",
    "prerequisites": [
      "Lire une phrase simple"
    ],
    "tags": [
      "grammaire",
      "nature des mots",
      "aventure"
    ],
    "sequence": 27,
    "adventureStageId": "riviere-chantante",
    "questNumber": 18
  },
  {
    "id": "ce2-conjugation-lights",
    "slug": "verbes-lucioles",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Les verbes lumineux",
    "category": "Conjugaison",
    "skill": "Présent des verbes",
    "skillId": "ce2-present-conjugation",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Luna",
    "companionRole": "Compagnon de quête",
    "story": "Les lucioles éclairent les terminaisons correctes au présent.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Tu … la lanterne.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "portes",
            "value": "choice-1-1"
          },
          {
            "label": "porte",
            "value": "choice-1-2"
          },
          {
            "label": "portent",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact : avec « tu », le verbe se termine par -es.",
        "hint": "Sujet : tu."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Luna … le passage.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "cherche",
            "value": "choice-2-1"
          },
          {
            "label": "cherches",
            "value": "choice-2-2"
          },
          {
            "label": "cherchons",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bravo : avec « Luna », on écrit « cherche ».",
        "hint": "Remplace Luna par « elle »."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Vous … près du chêne.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "avancez",
            "value": "choice-3-1"
          },
          {
            "label": "avançons",
            "value": "choice-3-2"
          },
          {
            "label": "avance",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Oui : avec « vous », la terminaison est -ez.",
        "hint": "Pense à la terminaison de « vous »."
      }
    ],
    "difficulty": 1,
    "objective": "Accorder des verbes du premier groupe au présent.",
    "prerequisites": [
      "Identifier le sujet et le verbe"
    ],
    "tags": [
      "conjugaison",
      "présent des verbes",
      "aventure"
    ],
    "sequence": 28,
    "adventureStageId": "clairiere-lucioles",
    "questNumber": 19
  },
  {
    "id": "ce2-vocab-light",
    "slug": "mots-lumiere",
    "child": "alyssio",
    "tone": "ce2",
    "firstName": "Alyssio",
    "grade": "Mission CE2",
    "title": "Les mots de lumière",
    "category": "Vocabulaire",
    "skill": "Relations entre les mots",
    "skillId": "ce2-vocabulary-relations",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Nova",
    "companionRole": "Guide de l’aventure",
    "story": "Nova projette des mots lumineux sur le tronc du Grand Chêne.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel est un synonyme de « brillant » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "lumineux",
            "value": "choice-1-1"
          },
          {
            "label": "terne",
            "value": "choice-1-2"
          },
          {
            "label": "bruyant",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, les deux mots parlent de lumière.",
        "hint": "Cherche un mot qui éclaire."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quel mot est de la famille de « lumière » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "lumineux",
            "value": "choice-2-1"
          },
          {
            "label": "limace",
            "value": "choice-2-2"
          },
          {
            "label": "limer",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Bravo, il partage la même base.",
        "hint": "Repère « lumin- »."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel est le contraire de « ancien » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "nouveau",
            "value": "choice-3-1"
          },
          {
            "label": "vieux",
            "value": "choice-3-2"
          },
          {
            "label": "cassé",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Oui, « nouveau » est l’opposé d’« ancien ».",
        "hint": "Pense à quelque chose qui vient d’apparaître."
      }
    ],
    "difficulty": 2,
    "objective": "Identifier synonymes, contraires et familles de mots.",
    "prerequisites": [
      "Comprendre des mots courants"
    ],
    "tags": [
      "vocabulaire",
      "relations entre les mots",
      "aventure"
    ],
    "sequence": 29,
    "adventureStageId": "grand-chene",
    "questNumber": 20
  },
  {
    "id": "sixth-gate-verbs",
    "slug": "verbes-porte",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Les verbes de la Porte",
    "category": "Méthodologie",
    "skill": "Verbes de consigne",
    "skillId": "sixth-instruction-verbs",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Milo",
    "companionRole": "Compagnon de quête",
    "story": "La Porte des Idées affiche trois consignes. Milo doit comprendre précisément l’action demandée avant de toucher les symboles.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Dans « Compare les deux documents », que faut-il faire ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Chercher ressemblances et différences",
            "value": "choice-1-1"
          },
          {
            "label": "Recopier les documents",
            "value": "choice-1-2"
          },
          {
            "label": "Choisir le plus long",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, comparer consiste à relever des points communs et des écarts.",
        "hint": "Pense aux deux côtés d’une comparaison."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Dans « Justifie ta réponse », que faut-il ajouter ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Une raison ou une preuve",
            "value": "choice-2-1"
          },
          {
            "label": "Une décoration",
            "value": "choice-2-2"
          },
          {
            "label": "Une autre question",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, justifier signifie expliquer pourquoi.",
        "hint": "Il faut appuyer sa réponse."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Dans « Résume le texte », que faut-il produire ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "L’idée essentielle en peu de mots",
            "value": "choice-3-1"
          },
          {
            "label": "Une copie complète",
            "value": "choice-3-2"
          },
          {
            "label": "Une liste de mots difficiles",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, un résumé conserve l’essentiel.",
        "hint": "Que garde-t-on quand on raccourcit un texte ?"
      }
    ],
    "difficulty": 1,
    "objective": "Traduire les verbes de consigne en actions précises.",
    "prerequisites": [
      "Identifier un verbe"
    ],
    "tags": [
      "méthodologie",
      "verbes de consigne",
      "aventure"
    ],
    "sequence": 10,
    "adventureStageId": "porte-idees",
    "questNumber": 1
  },
  {
    "id": "sixth-gate-plan",
    "slug": "plan-ouverture",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Le plan d’ouverture",
    "category": "Organisation",
    "skill": "Planification",
    "skillId": "sixth-task-planning",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Milo",
    "companionRole": "Compagnon de quête",
    "story": "Milo dispose de 45 minutes pour relire un cours, faire trois exercices et préparer son sac. Il doit construire un ordre réaliste.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle tâche faut-il placer en premier ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Relire rapidement le cours",
            "value": "choice-1-1"
          },
          {
            "label": "Préparer le sac",
            "value": "choice-1-2"
          },
          {
            "label": "Faire une pause de 30 minutes",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Oui, la relecture prépare les exercices.",
        "hint": "Quelle tâche aide à réussir celles qui suivent ?"
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quel partage du temps est le plus réaliste ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "10 min de cours, 25 min d’exercices, 10 min de sac",
            "value": "choice-2-1"
          },
          {
            "label": "40 min de sac, 5 min d’exercices",
            "value": "choice-2-2"
          },
          {
            "label": "45 min de pause",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Exact, le temps est réparti selon l’importance des tâches.",
        "hint": "Les exercices demandent le plus de temps."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Que faire si un exercice bloque plus de 5 minutes ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Noter la difficulté et poursuivre",
            "value": "choice-3-1"
          },
          {
            "label": "Abandonner toute la séance",
            "value": "choice-3-2"
          },
          {
            "label": "Effacer le devoir",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bonne stratégie : on évite de perdre tout le temps disponible.",
        "hint": "Il faut rester efficace sans oublier le blocage."
      }
    ],
    "difficulty": 2,
    "objective": "Organiser plusieurs tâches dans un ordre réaliste.",
    "prerequisites": [
      "Comprendre une consigne"
    ],
    "tags": [
      "organisation",
      "planification",
      "aventure"
    ],
    "sequence": 11,
    "adventureStageId": "porte-idees",
    "questNumber": 2
  },
  {
    "id": "sixth-archive-info",
    "slug": "fiche-exploratrice",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "La fiche de l’exploratrice",
    "category": "Anglais",
    "skill": "Compréhension en anglais",
    "skillId": "sixth-english-personal-info",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Sia",
    "companionRole": "Compagnon de quête",
    "story": "A page reads: “My name is Emma. I am eleven years old. I live in Bristol and I love drawing maps.”",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "How old is Emma?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Eleven",
            "value": "choice-1-1"
          },
          {
            "label": "Twelve",
            "value": "choice-1-2"
          },
          {
            "label": "Ten",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Correct! Emma is eleven years old.",
        "hint": "Find the number in the text."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Where does she live?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "In Bristol",
            "value": "choice-2-1"
          },
          {
            "label": "In London",
            "value": "choice-2-2"
          },
          {
            "label": "In Paris",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Exactly, she lives in Bristol.",
        "hint": "Look after “I live in”."
      },
      {
        "eyebrow": "Étape 3",
        "title": "What does she love?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Drawing maps",
            "value": "choice-3-1"
          },
          {
            "label": "Playing football",
            "value": "choice-3-2"
          },
          {
            "label": "Reading comics",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Well done! She loves drawing maps.",
        "hint": "Read the last part of the sentence."
      }
    ],
    "difficulty": 3,
    "objective": "Comprendre les informations essentielles d’une présentation en anglais.",
    "prerequisites": [
      "Vocabulaire anglais élémentaire"
    ],
    "tags": [
      "anglais",
      "compréhension en anglais",
      "aventure"
    ],
    "sequence": 12,
    "adventureStageId": "archives-flottantes",
    "questNumber": 3
  },
  {
    "id": "sixth-archive-present",
    "slug": "routine-archiviste",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "La routine de l’archiviste",
    "category": "Anglais",
    "skill": "Présent simple",
    "skillId": "sixth-english-present-simple",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Sia",
    "companionRole": "Compagnon de quête",
    "story": "Every morning, Milo opens the archives, checks the old maps and writes a short report.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Complete: Milo … the archives.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "opens",
            "value": "choice-1-1"
          },
          {
            "label": "open",
            "value": "choice-1-2"
          },
          {
            "label": "opening",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Correct! With he, the verb takes -s.",
        "hint": "Milo can be replaced by “he”."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Complete: He … the old maps.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "checks",
            "value": "choice-2-1"
          },
          {
            "label": "check",
            "value": "choice-2-2"
          },
          {
            "label": "checking",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Exactly: he checks.",
        "hint": "Third person singular usually adds -s."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Which sentence is correct?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Milo writes a report.",
            "value": "choice-3-1"
          },
          {
            "label": "Milo write a report.",
            "value": "choice-3-2"
          },
          {
            "label": "Milo writing a report.",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Perfect! The present simple is correctly formed.",
        "hint": "Look for the verb ending with -s."
      }
    ],
    "difficulty": 1,
    "objective": "Employer le présent simple à la troisième personne.",
    "prerequisites": [
      "Reconnaître le sujet"
    ],
    "tags": [
      "anglais",
      "présent simple",
      "aventure"
    ],
    "sequence": 13,
    "adventureStageId": "archives-flottantes",
    "questNumber": 4
  },
  {
    "id": "sixth-bridge-fractions",
    "slug": "dalles-fractions",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Les dalles fractionnées",
    "category": "Mathématiques",
    "skill": "Fractions",
    "skillId": "sixth-fraction-meaning",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Nox",
    "companionRole": "Compagnon de quête",
    "story": "Le Pont des Énigmes possède des dalles partagées en parts égales. Nox doit choisir les fractions qui représentent les zones éclairées.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Une dalle est partagée en 4 parts, 3 sont éclairées. Quelle fraction ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "3/4",
            "value": "choice-1-1"
          },
          {
            "label": "1/4",
            "value": "choice-1-2"
          },
          {
            "label": "4/3",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, trois parts sur quatre sont éclairées.",
        "hint": "Le numérateur compte les parts éclairées."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quelle fraction est la plus grande ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "3/4",
            "value": "choice-2-1"
          },
          {
            "label": "2/4",
            "value": "choice-2-2"
          },
          {
            "label": "1/4",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, les dénominateurs sont identiques : compare les numérateurs.",
        "hint": "Plus le numérateur est grand, plus la fraction est grande."
      },
      {
        "eyebrow": "Étape 3",
        "title": "1/2 est équivalent à…",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "2/4",
            "value": "choice-3-1"
          },
          {
            "label": "1/4",
            "value": "choice-3-2"
          },
          {
            "label": "3/4",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, 1/2 et 2/4 représentent la même quantité.",
        "hint": "Multiplie le numérateur et le dénominateur par 2."
      }
    ],
    "difficulty": 2,
    "objective": "Interpréter, comparer et simplifier des fractions simples.",
    "prerequisites": [
      "Comprendre le partage d’une unité"
    ],
    "tags": [
      "mathématiques",
      "fractions",
      "aventure"
    ],
    "sequence": 14,
    "adventureStageId": "pont-enigmes",
    "questNumber": 5
  },
  {
    "id": "sixth-bridge-proportion",
    "slug": "rouages-proportion",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Les rouages proportionnels",
    "category": "Mathématiques",
    "skill": "Proportionnalité",
    "skillId": "sixth-proportional-reasoning",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Nox",
    "companionRole": "Compagnon de quête",
    "story": "Deux rouages consomment 6 cristaux. Nox veut prévoir la consommation pour davantage de rouages identiques.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Combien de cristaux faut-il pour 1 rouage ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "3",
            "value": "choice-1-1"
          },
          {
            "label": "2",
            "value": "choice-1-2"
          },
          {
            "label": "6",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, 6 ÷ 2 = 3.",
        "hint": "Cherche la valeur pour une unité."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Combien pour 4 rouages ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "12",
            "value": "choice-2-1"
          },
          {
            "label": "9",
            "value": "choice-2-2"
          },
          {
            "label": "24",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, 4 × 3 = 12.",
        "hint": "Utilise la valeur d’un rouage."
      },
      {
        "eyebrow": "Étape 3",
        "title": "La situation est-elle proportionnelle ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Oui, chaque rouage consomme 3 cristaux",
            "value": "choice-3-1"
          },
          {
            "label": "Non, les nombres changent",
            "value": "choice-3-2"
          },
          {
            "label": "Impossible à savoir",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, le coefficient reste constant.",
        "hint": "Vérifie si on multiplie toujours par le même nombre."
      }
    ],
    "difficulty": 3,
    "objective": "Utiliser le passage à l’unité dans une situation proportionnelle.",
    "prerequisites": [
      "Multiplier et diviser"
    ],
    "tags": [
      "mathématiques",
      "proportionnalité",
      "aventure"
    ],
    "sequence": 15,
    "adventureStageId": "pont-enigmes",
    "questNumber": 6
  },
  {
    "id": "sixth-tower-mainidea",
    "slug": "chronique-aube",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "La chronique de l’Aube",
    "category": "Français",
    "skill": "Idée essentielle",
    "skillId": "sixth-text-main-idea",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Nova",
    "companionRole": "Guide de l’aventure",
    "story": "« Pendant des années, la tour guidait les voyageurs grâce à son faisceau. Depuis que le prisme s’est brisé, les routes de la cité sont plongées dans l’ombre. Les habitants cherchent maintenant à le réparer. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel est le thème principal ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "La panne de la tour et sa réparation",
            "value": "choice-1-1"
          },
          {
            "label": "La construction des routes",
            "value": "choice-1-2"
          },
          {
            "label": "La vie des voyageurs",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, c’est le sujet central du passage.",
        "hint": "Qu’est-ce qui relie toutes les phrases ?"
      },
      {
        "eyebrow": "Étape 2",
        "title": "Pourquoi les routes sont-elles dans l’ombre ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Le prisme est brisé",
            "value": "choice-2-1"
          },
          {
            "label": "Les voyageurs sont partis",
            "value": "choice-2-2"
          },
          {
            "label": "La tour est trop petite",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, le texte donne cette cause.",
        "hint": "Cherche la phrase introduite par « depuis que »."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel résumé est le plus fidèle ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "La tour ne guide plus la cité car son prisme doit être réparé.",
            "value": "choice-3-1"
          },
          {
            "label": "Les habitants aiment voyager la nuit.",
            "value": "choice-3-2"
          },
          {
            "label": "Une nouvelle route vient d’être ouverte.",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, ce résumé conserve l’essentiel sans détails inutiles.",
        "hint": "Garde le problème et l’objectif."
      }
    ],
    "difficulty": 1,
    "objective": "Identifier et reformuler l’idée essentielle d’un texte.",
    "prerequisites": [
      "Comprendre un paragraphe"
    ],
    "tags": [
      "français",
      "idée essentielle",
      "aventure"
    ],
    "sequence": 16,
    "adventureStageId": "tour-aube",
    "questNumber": 7
  },
  {
    "id": "sixth-tower-grammar",
    "slug": "inscription-tour",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "L’inscription de la Tour",
    "category": "Français",
    "skill": "Classes grammaticales",
    "skillId": "sixth-word-classes",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Nova",
    "companionRole": "Guide de l’aventure",
    "story": "Phrase à analyser : « Les anciens gardiens protègent soigneusement le prisme lumineux. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle est la classe de « gardiens » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Nom",
            "value": "choice-1-1"
          },
          {
            "label": "Verbe",
            "value": "choice-1-2"
          },
          {
            "label": "Adverbe",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, « gardiens » est le noyau du groupe sujet.",
        "hint": "Ce mot désigne des personnes."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quelle est la classe de « soigneusement » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Adverbe",
            "value": "choice-2-1"
          },
          {
            "label": "Adjectif",
            "value": "choice-2-2"
          },
          {
            "label": "Déterminant",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, il précise la manière de protéger.",
        "hint": "Les mots en -ment sont souvent des adverbes."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Avec quel nom « lumineux » s’accorde-t-il ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "prisme",
            "value": "choice-3-1"
          },
          {
            "label": "gardiens",
            "value": "choice-3-2"
          },
          {
            "label": "anciens",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, l’adjectif complète « prisme ».",
        "hint": "Cherche le nom juste avant."
      }
    ],
    "difficulty": 2,
    "objective": "Identifier les classes grammaticales et les accords.",
    "prerequisites": [
      "Identifier un nom et un verbe"
    ],
    "tags": [
      "français",
      "classes grammaticales",
      "aventure"
    ],
    "sequence": 17,
    "adventureStageId": "tour-aube",
    "questNumber": 8
  },
  {
    "id": "sixth-bag-expedition",
    "slug": "sac-expedition",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Le sac de l’expédition",
    "category": "Organisation",
    "skill": "Autonomie",
    "skillId": "sixth-school-autonomy",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Milo",
    "companionRole": "Compagnon de quête",
    "story": "Demain, Léony doit participer à une sortie scientifique puis suivre anglais et mathématiques. Elle prépare son matériel sans surcharger son sac.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle source consulter d’abord ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "L’emploi du temps et les consignes",
            "value": "choice-1-1"
          },
          {
            "label": "Une ancienne photo",
            "value": "choice-1-2"
          },
          {
            "label": "Le menu du midi",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, ce sont les informations utiles pour prévoir le matériel.",
        "hint": "Cherche les documents qui annoncent les activités."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quel choix est le plus pertinent ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Prendre seulement le matériel demandé",
            "value": "choice-2-1"
          },
          {
            "label": "Emporter tous les cahiers",
            "value": "choice-2-2"
          },
          {
            "label": "Ne rien préparer",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, cela évite les oublis et le poids inutile.",
        "hint": "Il faut être complet sans surcharger."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quand faire la vérification finale ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "La veille au soir",
            "value": "choice-3-1"
          },
          {
            "label": "Après être partie",
            "value": "choice-3-2"
          },
          {
            "label": "Une semaine plus tard",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bonne habitude : cela laisse le temps de corriger un oubli.",
        "hint": "Évite la précipitation du matin."
      }
    ],
    "difficulty": 3,
    "objective": "Préparer et ranger son matériel de manière autonome.",
    "prerequisites": [
      "Lire un emploi du temps"
    ],
    "tags": [
      "organisation",
      "autonomie",
      "aventure"
    ],
    "sequence": 18,
    "adventureStageId": "porte-idees",
    "questNumber": 9
  },
  {
    "id": "sixth-method-priority",
    "slug": "priorites-cite",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Les priorités de la cité",
    "category": "Organisation",
    "skill": "Planification",
    "skillId": "sixth-task-planning",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Milo",
    "companionRole": "Compagnon de quête",
    "story": "Trois tâches attendent Léony : une évaluation demain, un exposé dans cinq jours et un livre à terminer dans deux semaines.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle tâche est prioritaire ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Réviser l’évaluation de demain",
            "value": "choice-1-1"
          },
          {
            "label": "Finir le livre",
            "value": "choice-1-2"
          },
          {
            "label": "Décorer l’exposé",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, l’échéance la plus proche est prioritaire.",
        "hint": "Compare les dates."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Que faire ensuite ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Avancer un peu l’exposé",
            "value": "choice-2-1"
          },
          {
            "label": "Ignorer les autres tâches",
            "value": "choice-2-2"
          },
          {
            "label": "Lire tout le livre d’un coup",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, on anticipe sans négliger l’urgence.",
        "hint": "La deuxième échéance arrive dans cinq jours."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quelle organisation est la plus efficace ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Répartir les tâches sur plusieurs jours",
            "value": "choice-3-1"
          },
          {
            "label": "Tout faire la veille",
            "value": "choice-3-2"
          },
          {
            "label": "Changer de plan chaque heure",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, la régularité réduit le stress.",
        "hint": "Pense à un planning réaliste."
      }
    ],
    "difficulty": 1,
    "objective": "Organiser plusieurs tâches dans un ordre réaliste.",
    "prerequisites": [
      "Comprendre une consigne"
    ],
    "tags": [
      "organisation",
      "planification",
      "aventure"
    ],
    "sequence": 19,
    "adventureStageId": "porte-idees",
    "questNumber": 10
  },
  {
    "id": "sixth-gate-actions",
    "slug": "consigne-labyrinthe",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "La consigne du labyrinthe",
    "category": "Méthodologie",
    "skill": "Verbes de consigne",
    "skillId": "sixth-instruction-verbs",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Milo",
    "companionRole": "Compagnon de quête",
    "story": "Une inscription demande : « Classe les indices, explique ton choix puis vérifie avec le plan. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle action vient en premier ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Classer les indices",
            "value": "choice-1-1"
          },
          {
            "label": "Vérifier le plan",
            "value": "choice-1-2"
          },
          {
            "label": "Écrire la conclusion",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, l’ordre de la consigne est explicite.",
        "hint": "Repère le premier verbe."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Que signifie « expliquer ton choix » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Donner les raisons de son classement",
            "value": "choice-2-1"
          },
          {
            "label": "Recopier la consigne",
            "value": "choice-2-2"
          },
          {
            "label": "Changer toutes les réponses",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, il faut rendre le raisonnement visible.",
        "hint": "Expliquer, c’est dire pourquoi."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quelle est la dernière étape ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Vérifier avec le plan",
            "value": "choice-3-1"
          },
          {
            "label": "Classer encore",
            "value": "choice-3-2"
          },
          {
            "label": "Supprimer les indices",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, la vérification termine la démarche.",
        "hint": "Repère le dernier verbe."
      }
    ],
    "difficulty": 2,
    "objective": "Traduire les verbes de consigne en actions précises.",
    "prerequisites": [
      "Identifier un verbe"
    ],
    "tags": [
      "méthodologie",
      "verbes de consigne",
      "aventure"
    ],
    "sequence": 20,
    "adventureStageId": "porte-idees",
    "questNumber": 11
  },
  {
    "id": "sixth-plan-project",
    "slug": "planning-prisme",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Le planning du prisme",
    "category": "Organisation",
    "skill": "Planification",
    "skillId": "sixth-task-planning",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Nova",
    "companionRole": "Guide de l’aventure",
    "story": "La réparation du prisme demande une recherche, un schéma et une présentation à préparer en quatre jours.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle tâche doit précéder le schéma ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "La recherche",
            "value": "choice-1-1"
          },
          {
            "label": "La présentation orale",
            "value": "choice-1-2"
          },
          {
            "label": "La décoration",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, il faut connaître les informations avant de les organiser.",
        "hint": "Quelle tâche fournit le contenu ?"
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quel planning est le plus équilibré ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Jour 1 recherche, jour 2 schéma, jour 3 répétition, jour 4 vérification",
            "value": "choice-2-1"
          },
          {
            "label": "Tout le jour 4",
            "value": "choice-2-2"
          },
          {
            "label": "Uniquement la décoration",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, chaque étape dispose d’un temps dédié.",
        "hint": "Répartis le travail selon son ordre logique."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Pourquoi garder un temps de vérification ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Pour corriger les oublis",
            "value": "choice-3-1"
          },
          {
            "label": "Pour rallonger inutilement",
            "value": "choice-3-2"
          },
          {
            "label": "Pour recommencer tout le projet",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Exact, une vérification finale sécurise le travail.",
        "hint": "Quel est le rôle d’un contrôle final ?"
      }
    ],
    "difficulty": 3,
    "objective": "Organiser plusieurs tâches dans un ordre réaliste.",
    "prerequisites": [
      "Comprendre une consigne"
    ],
    "tags": [
      "organisation",
      "planification",
      "aventure"
    ],
    "sequence": 21,
    "adventureStageId": "tour-aube",
    "questNumber": 12
  },
  {
    "id": "sixth-archive-profile",
    "slug": "profil-sia",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Le profil de Sia",
    "category": "Anglais",
    "skill": "Compréhension en anglais",
    "skillId": "sixth-english-personal-info",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Sia",
    "companionRole": "Compagnon de quête",
    "story": "A card says: “Sia is twelve. She comes from Dublin. Her favourite subjects are English and history.”",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "How old is Sia?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Twelve",
            "value": "choice-1-1"
          },
          {
            "label": "Eleven",
            "value": "choice-1-2"
          },
          {
            "label": "Thirteen",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Correct! Sia is twelve.",
        "hint": "Find the age in the first sentence."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Where does she come from?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Dublin",
            "value": "choice-2-1"
          },
          {
            "label": "Bristol",
            "value": "choice-2-2"
          },
          {
            "label": "Madrid",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Exactly, she comes from Dublin.",
        "hint": "Look after “comes from”."
      },
      {
        "eyebrow": "Étape 3",
        "title": "What are her favourite subjects?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "English and history",
            "value": "choice-3-1"
          },
          {
            "label": "Maths and science",
            "value": "choice-3-2"
          },
          {
            "label": "Art and music",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Well done! Both subjects are written in the text.",
        "hint": "Read the last sentence."
      }
    ],
    "difficulty": 1,
    "objective": "Comprendre les informations essentielles d’une présentation en anglais.",
    "prerequisites": [
      "Vocabulaire anglais élémentaire"
    ],
    "tags": [
      "anglais",
      "compréhension en anglais",
      "aventure"
    ],
    "sequence": 22,
    "adventureStageId": "archives-flottantes",
    "questNumber": 13
  },
  {
    "id": "sixth-archive-habits",
    "slug": "habitudes-sia",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Les habitudes de Sia",
    "category": "Anglais",
    "skill": "Présent simple",
    "skillId": "sixth-english-present-simple",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Sia",
    "companionRole": "Compagnon de quête",
    "story": "Sia studies old languages. She reads every evening and she visits the archives on Saturdays.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Complete: Sia … old languages.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "studies",
            "value": "choice-1-1"
          },
          {
            "label": "study",
            "value": "choice-1-2"
          },
          {
            "label": "studying",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Correct! “Study” becomes “studies” with she.",
        "hint": "With consonant + y, change y to ies."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Complete: She … every evening.",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "reads",
            "value": "choice-2-1"
          },
          {
            "label": "read",
            "value": "choice-2-2"
          },
          {
            "label": "reading",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Exactly, the verb takes -s.",
        "hint": "The subject is she."
      },
      {
        "eyebrow": "Étape 3",
        "title": "When does she visit the archives?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "On Saturdays",
            "value": "choice-3-1"
          },
          {
            "label": "Every morning",
            "value": "choice-3-2"
          },
          {
            "label": "On Mondays",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Perfect, the time expression is in the text.",
        "hint": "Read the final words."
      }
    ],
    "difficulty": 2,
    "objective": "Employer le présent simple à la troisième personne.",
    "prerequisites": [
      "Reconnaître le sujet"
    ],
    "tags": [
      "anglais",
      "présent simple",
      "aventure"
    ],
    "sequence": 23,
    "adventureStageId": "archives-flottantes",
    "questNumber": 14
  },
  {
    "id": "sixth-fraction-code",
    "slug": "code-fractions",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Le code des fractions",
    "category": "Mathématiques",
    "skill": "Fractions",
    "skillId": "sixth-fraction-meaning",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Nox",
    "companionRole": "Compagnon de quête",
    "story": "Le code comporte les fractions 1/3, 2/3 et 3/6. Nox doit les comparer.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle fraction est la plus grande entre 1/3 et 2/3 ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "2/3",
            "value": "choice-1-1"
          },
          {
            "label": "1/3",
            "value": "choice-1-2"
          },
          {
            "label": "Elles sont égales",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, les dénominateurs sont identiques.",
        "hint": "Compare les numérateurs."
      },
      {
        "eyebrow": "Étape 2",
        "title": "3/6 est égal à…",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "1/2",
            "value": "choice-2-1"
          },
          {
            "label": "1/3",
            "value": "choice-2-2"
          },
          {
            "label": "2/3",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, on simplifie 3/6 par 3.",
        "hint": "Divise le numérateur et le dénominateur par 3."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quelle fraction est la plus petite ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "1/3",
            "value": "choice-3-1"
          },
          {
            "label": "1/2",
            "value": "choice-3-2"
          },
          {
            "label": "2/3",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, 1/3 est inférieur à 1/2 et 2/3.",
        "hint": "Imagine chaque fraction sur la même unité."
      }
    ],
    "difficulty": 3,
    "objective": "Interpréter, comparer et simplifier des fractions simples.",
    "prerequisites": [
      "Comprendre le partage d’une unité"
    ],
    "tags": [
      "mathématiques",
      "fractions",
      "aventure"
    ],
    "sequence": 24,
    "adventureStageId": "pont-enigmes",
    "questNumber": 15
  },
  {
    "id": "sixth-proportion-maps",
    "slug": "cartes-echelle",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Les cartes à l’échelle",
    "category": "Mathématiques",
    "skill": "Proportionnalité",
    "skillId": "sixth-proportional-reasoning",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Nox",
    "companionRole": "Compagnon de quête",
    "story": "Sur une carte, 2 cm représentent 10 km. Sia doit calculer plusieurs distances.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Combien représente 1 cm ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "5 km",
            "value": "choice-1-1"
          },
          {
            "label": "10 km",
            "value": "choice-1-2"
          },
          {
            "label": "20 km",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, 10 ÷ 2 = 5.",
        "hint": "Cherche la valeur pour 1 cm."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Combien représentent 6 cm ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "30 km",
            "value": "choice-2-1"
          },
          {
            "label": "16 km",
            "value": "choice-2-2"
          },
          {
            "label": "60 km",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, 6 × 5 = 30.",
        "hint": "Utilise la valeur de 1 cm."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel est le coefficient de proportionnalité ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "5",
            "value": "choice-3-1"
          },
          {
            "label": "2",
            "value": "choice-3-2"
          },
          {
            "label": "10",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, on multiplie les centimètres par 5.",
        "hint": "Quel nombre transforme 2 en 10 ?"
      }
    ],
    "difficulty": 1,
    "objective": "Utiliser le passage à l’unité dans une situation proportionnelle.",
    "prerequisites": [
      "Multiplier et diviser"
    ],
    "tags": [
      "mathématiques",
      "proportionnalité",
      "aventure"
    ],
    "sequence": 25,
    "adventureStageId": "pont-enigmes",
    "questNumber": 16
  },
  {
    "id": "sixth-summary-council",
    "slug": "conseil-cite",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Le conseil de la cité",
    "category": "Français",
    "skill": "Idée essentielle",
    "skillId": "sixth-text-main-idea",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Nova",
    "companionRole": "Guide de l’aventure",
    "story": "« Les habitants souhaitent ouvrir les archives au public. Certains craignent que les documents fragiles soient abîmés. Le conseil propose donc des copies numériques accessibles à tous. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quel problème est posé ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Partager les archives sans abîmer les originaux",
            "value": "choice-1-1"
          },
          {
            "label": "Construire une nouvelle tour",
            "value": "choice-1-2"
          },
          {
            "label": "Fermer la cité",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, le texte oppose accès et protection.",
        "hint": "Repère les deux préoccupations."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quelle solution est proposée ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Des copies numériques",
            "value": "choice-2-1"
          },
          {
            "label": "La destruction des documents",
            "value": "choice-2-2"
          },
          {
            "label": "Une fermeture définitive",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, elles permettent l’accès tout en protégeant les originaux.",
        "hint": "Lis la dernière phrase."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quel résumé convient ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "La cité veut rendre les archives accessibles grâce à des copies numériques.",
            "value": "choice-3-1"
          },
          {
            "label": "Les habitants refusent toute consultation.",
            "value": "choice-3-2"
          },
          {
            "label": "Le conseil vend les documents.",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, ce résumé reprend problème et solution.",
        "hint": "Garde seulement l’idée essentielle."
      }
    ],
    "difficulty": 2,
    "objective": "Identifier et reformuler l’idée essentielle d’un texte.",
    "prerequisites": [
      "Comprendre un paragraphe"
    ],
    "tags": [
      "français",
      "idée essentielle",
      "aventure"
    ],
    "sequence": 26,
    "adventureStageId": "tour-aube",
    "questNumber": 17
  },
  {
    "id": "sixth-grammar-archives",
    "slug": "phrase-archives",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "La phrase des archives",
    "category": "Français",
    "skill": "Classes grammaticales",
    "skillId": "sixth-word-classes",
    "duration": "10 minutes",
    "durationLabel": "10 min",
    "xp": 30,
    "companion": "Sia",
    "companionRole": "Compagnon de quête",
    "story": "Phrase à analyser : « Ces mystérieuses pages flottent silencieusement au-dessus de la place. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle est la classe de « pages » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Nom",
            "value": "choice-1-1"
          },
          {
            "label": "Verbe",
            "value": "choice-1-2"
          },
          {
            "label": "Adverbe",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, « pages » est un nom commun.",
        "hint": "Ce mot désigne des objets."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Quelle est la classe de « mystérieuses » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Adjectif",
            "value": "choice-2-1"
          },
          {
            "label": "Déterminant",
            "value": "choice-2-2"
          },
          {
            "label": "Verbe",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, il complète le nom « pages ».",
        "hint": "Comment sont les pages ?"
      },
      {
        "eyebrow": "Étape 3",
        "title": "Quelle est la classe de « silencieusement » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Adverbe",
            "value": "choice-3-1"
          },
          {
            "label": "Nom",
            "value": "choice-3-2"
          },
          {
            "label": "Pronom",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, il précise la manière de flotter.",
        "hint": "Repère la terminaison -ment."
      }
    ],
    "difficulty": 3,
    "objective": "Identifier les classes grammaticales et les accords.",
    "prerequisites": [
      "Identifier un nom et un verbe"
    ],
    "tags": [
      "français",
      "classes grammaticales",
      "aventure"
    ],
    "sequence": 27,
    "adventureStageId": "archives-flottantes",
    "questNumber": 18
  },
  {
    "id": "sixth-autonomy-locker",
    "slug": "casier-ordre",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Le casier bien organisé",
    "category": "Organisation",
    "skill": "Autonomie",
    "skillId": "sixth-school-autonomy",
    "duration": "8 minutes",
    "durationLabel": "8 min",
    "xp": 20,
    "companion": "Milo",
    "companionRole": "Compagnon de quête",
    "story": "Le casier de Léony contient des feuilles volantes, deux cahiers sans étiquette et du matériel inutile.",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle première action est la plus utile ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Trier par matière",
            "value": "choice-1-1"
          },
          {
            "label": "Tout jeter",
            "value": "choice-1-2"
          },
          {
            "label": "Ajouter d’autres feuilles",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, le tri permet de retrouver rapidement le matériel.",
        "hint": "Commence par créer des catégories."
      },
      {
        "eyebrow": "Étape 2",
        "title": "Que faire des feuilles importantes ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Les ranger dans la bonne pochette",
            "value": "choice-2-1"
          },
          {
            "label": "Les laisser au fond",
            "value": "choice-2-2"
          },
          {
            "label": "Les mélanger",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, chaque document doit avoir une place.",
        "hint": "Cherche une solution durable."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Pourquoi étiqueter les cahiers ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Pour les identifier rapidement",
            "value": "choice-3-1"
          },
          {
            "label": "Pour les rendre plus lourds",
            "value": "choice-3-2"
          },
          {
            "label": "Pour éviter de les ouvrir",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, l’étiquette facilite l’autonomie.",
        "hint": "Quel est l’intérêt d’un nom visible ?"
      }
    ],
    "difficulty": 1,
    "objective": "Préparer et ranger son matériel de manière autonome.",
    "prerequisites": [
      "Lire un emploi du temps"
    ],
    "tags": [
      "organisation",
      "autonomie",
      "aventure"
    ],
    "sequence": 28,
    "adventureStageId": "porte-idees",
    "questNumber": 19
  },
  {
    "id": "sixth-method-check",
    "slug": "controle-reponse",
    "child": "leony",
    "tone": "sixth",
    "firstName": "Léony",
    "grade": "Mission 6e",
    "title": "Le contrôle des réponses",
    "category": "Méthodologie",
    "skill": "Verbes de consigne",
    "skillId": "sixth-instruction-verbs",
    "duration": "9 minutes",
    "durationLabel": "9 min",
    "xp": 25,
    "companion": "Nox",
    "companionRole": "Compagnon de quête",
    "story": "Nox demande : « Calcule, encadre le résultat puis explique comment tu l’as vérifié. »",
    "steps": [
      {
        "eyebrow": "Étape 1",
        "title": "Quelle action doit produire un nombre ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Calculer",
            "value": "choice-1-1"
          },
          {
            "label": "Encadrer",
            "value": "choice-1-2"
          },
          {
            "label": "Expliquer",
            "value": "choice-1-3"
          }
        ],
        "answer": "choice-1-1",
        "success": "Exact, calculer donne le résultat.",
        "hint": "Quel verbe demande une opération ?"
      },
      {
        "eyebrow": "Étape 2",
        "title": "Que signifie « encadrer le résultat » ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "Le placer entre deux valeurs",
            "value": "choice-2-1"
          },
          {
            "label": "Dessiner un cadre décoratif",
            "value": "choice-2-2"
          },
          {
            "label": "Le supprimer",
            "value": "choice-2-3"
          }
        ],
        "answer": "choice-2-1",
        "success": "Oui, en mathématiques encadrer situe un nombre.",
        "hint": "Pense à une borne inférieure et supérieure."
      },
      {
        "eyebrow": "Étape 3",
        "title": "Que faut-il expliquer à la fin ?",
        "instruction": "Choisis la réponse la plus juste.",
        "choices": [
          {
            "label": "La méthode de vérification",
            "value": "choice-3-1"
          },
          {
            "label": "La couleur du stylo",
            "value": "choice-3-2"
          },
          {
            "label": "Le titre de l’exercice",
            "value": "choice-3-3"
          }
        ],
        "answer": "choice-3-1",
        "success": "Bravo, la consigne demande de rendre le contrôle explicite.",
        "hint": "Relis les derniers mots."
      }
    ],
    "difficulty": 2,
    "objective": "Traduire les verbes de consigne en actions précises.",
    "prerequisites": [
      "Identifier un verbe"
    ],
    "tags": [
      "méthodologie",
      "verbes de consigne",
      "aventure"
    ],
    "sequence": 29,
    "adventureStageId": "pont-enigmes",
    "questNumber": 20
  }
];
