import type { Manual } from "@/types/manual"

export const manual: Manual = {
  title: "Keep Talking and Nobody Explodes — Manuel de l'Expert",
  version: "1.0",
  trials: [
    {
      id: 1,
      title: "Coupe-fils",
      imagePath: null,
      instructions: {
        intro:
          "Le joueur fait face à un panneau comportant entre 3 et 6 fils colorés (blanc, rouge, vert, jaune, bleu). " +
          "Demandez-lui de décrire les fils de gauche à droite. " +
          "Appliquez les règles dans l'ordre indiqué — la première règle vérifiée détermine le fil à couper. " +
          "Arrêtez-vous dès qu'une règle s'applique.",
        steps: [
          {
            step: 1,
            text: "Demandez le nombre total de fils présents sur le panneau",
          },
          {
            step: 2,
            text: "Demandez les couleurs des fils de gauche à droite",
          },
          {
            step: 3,
            text: "Appliquez les règles ci-dessous dans l'ordre (arrêtez à la première vérifiée) :",
            subSteps: [
              "Règle 1 — Aucun fil rouge → coupez le premier fil (le plus à gauche)",
              "Règle 2 — Nombre de fils pair ET au moins 2 fils bleus → coupez le premier fil bleu",
              "Règle 3 — Nombre de fils impair ET exactement 1 fil jaune ET au moins 1 fil vert → coupez le fil vert",
              "Règle 4 — Exactement 3 fils rouges ET au moins 1 fil blanc → coupez le fil blanc",
              "Règle 5 — Le dernier fil (le plus à droite) est blanc → coupez le dernier fil",
              "Règle 6 — Plus d'un fil rouge → coupez le dernier fil rouge",
              "Règle 7 — (aucune règle précédente ne s'applique) → coupez le dernier fil",
            ],
          },
        ],
        warnings: [
          "Vérifiez chaque condition entièrement avant de passer à la règle suivante",
          "Ne coupez qu'un seul fil — une erreur déclenche la bombe immédiatement",
        ],
        timeLimit: 60,
      },
    },
    {
      id: 2,
      title: "Épreuve 2",
      imagePath: null,
      instructions: {
        intro: "À renseigner",
        steps: [],
        warnings: [],
      },
    },
    {
      id: 3,
      title: "Épreuve 3",
      imagePath: null,
      instructions: {
        intro: "À renseigner",
        steps: [],
        warnings: [],
      },
    },
    {
      id: 4,
      title: "Épreuve 4",
      imagePath: null,
      instructions: {
        intro: "À renseigner",
        steps: [],
        warnings: [],
      },
    },
    {
      id: 5,
      title: "Épreuve 5",
      imagePath: null,
      instructions: {
        intro: "À renseigner",
        steps: [],
        warnings: [],
      },
    },
  ],
}
