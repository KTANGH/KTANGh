import type { Manual } from "@/types/manual"

export const manual: Manual = {
  title: "Keep Talking and Nobody Explodes — Manuel de l'Expert",
  version: "1.0",
  globalTimeLimit: 300,  // 5 minutes pour compléter tous les modules
  trials: [
    {
      id: 1,
      title: "Coupe-fils",
      imagePath: null,
      instructions: {
        intro:
          "Le joueur fait face à un panneau comportant entre 3 et 6 fils colorés (blanc, rouge, vert, jaune, bleu). " +
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
      },
    },
    {
      id: 2,
      title: "Molette de fréquence",
      imagePath: null,
      instructions: {
        intro: "Molette à régler sur une fréquence en Hz selon le code de série (visible en haut à gauche de l'écran du joueur). Appliquer la première règle vérifiée.",
        steps: [
          {
            step: 1,
            text: "Règles (dans l'ordre — s'arrêter à la première vérifiée) :",
            subSteps: [
              "Somme des chiffres du code > 14 → 440 Hz",
              "Dernier caractère du code = lettre → 330 Hz",
              "Une même lettre apparaît au moins 2 fois dans le code → 280 Hz",
              "Nombre de chiffres dans le code = impair → 220 Hz",
              "Premier caractère du code = chiffre → 180 Hz",
              "Le code contient au moins une voyelle (A, E, I, O, U, Y) → 150 Hz",
              "Sinon → 100 Hz",
            ],
          },
        ],
        warnings: [
          "Voyelles prises en compte : A, E, I, O, U, Y uniquement",
        ],
      },
    },
    {
      id: 3,
      title: "Décodage",
      imagePath: null,
      instructions: {
        intro:
          "Le joueur reçoit une suite de caractères encodée représentant un mot français existant (4 à 10 lettres). " +
          "Déterminez la méthode de décodage en vérifiant les conditions ci-dessous dans l'ordre, " +
          "puis dictez au joueur la méthode à appliquer lettre par lettre.",
        steps: [
          {
            step: 1,
            text: "Sélection de la méthode (première condition vérifiée) :",
            subSteps: [
              "Condition 1 — La réponse du module Molette était ≥ 300 Hz → Méthode B",
              "Condition 2 — Le dernier fil coupé dans le module Coupe-fils était rouge → Méthode C",
              "Condition 3 — Le numéro de série se termine par un chiffre impair → Méthode A",
              "Condition 4 — Le numéro de série contient au moins 2 voyelles (A, E, I, O, U, Y) → Méthode D",
              "Sinon → Méthode C",
            ],
          },
          {
            step: 2,
            text: "Méthode A — Décalage −3 : soustraire 3 à chaque lettre",
            subSteps: [
              "D→A  E→B  F→C  G→D  H→E  I→F  J→G  K→H  L→I  M→J  N→K  O→L  P→M",
              "Q→N  R→O  S→P  T→Q  U→R  V→S  W→T  X→U  Y→V  Z→W  A→X  B→Y  C→Z",
              "Exemple : FKDW → CHAT",
            ],
          },
          {
            step: 3,
            text: "Méthode B — Miroir : remplacer chaque lettre par son symétrique dans l'alphabet",
            subSteps: [
              "A↔Z  B↔Y  C↔X  D↔W  E↔V  F↔U  G↔T  H↔S  I↔R  J↔Q  K↔P  L↔O  M↔N",
              "Exemple : XSZG → CHAT",
            ],
          },
          {
            step: 4,
            text: "Méthode C — Inversion : lire le code de droite à gauche",
            subSteps: [
              "Exemple : TAHC → CHAT",
            ],
          },
          {
            step: 5,
            text: "Méthode D — Décalage +5 : ajouter 5 à chaque lettre",
            subSteps: [
              "A→F  B→G  C→H  D→I  E→J  F→K  G→L  H→M  I→N  J→O  K→P  L→Q  M→R",
              "N→S  O→T  P→U  Q→V  R→W  S→X  T→Y  U→Z  V→A  W→B  X→C  Y→D  Z→E",
              "Exemple : XCVO → CHAT",
            ],
          },
        ],
        warnings: [
          "Le résultat doit toujours être un mot français intelligible — si ce n'est pas le cas, vérifiez la condition sélectionnée",
          "Les modules Coupe-fils et Molette doivent être résolus avant ce module si leurs conditions sont invoquées",
        ],
      },
    },
    {
      id: 4,
      title: "Chronomètre",
      imagePath: null,
      instructions: {
        intro:
          "Le joueur voit un chronomètre dont l'aiguille tourne en boucle de 0 à 60 secondes. " +
          "Une diode colorée est visible à côté. " +
          "Déterminez la zone d'arrêt en vérifiant les conditions dans l'ordre, " +
          "puis indiquez-la au joueur avant qu'il stoppe l'aiguille.",
        steps: [
          {
            step: 1,
            text: "Relevez la couleur de la diode et le nombre de modules déjà résolus sur le panneau",
          },
          {
            step: 2,
            text: "Appliquez la première condition vérifiée :",
            subSteps: [
              "Diode rouge ET ≥ 2 modules résolus → arrêter entre 42 et 44 s",
              "Diode verte → arrêter entre 22 et 24 s",
              "Diode orange ET 0 module résolu → arrêter entre 5 et 7 s",
              "Diode orange → arrêter entre 32 et 34 s",
              "Nombre de modules résolus impair → arrêter entre 12 et 14 s",
              "Diode bleue → arrêter entre 52 et 54 s",
              "Diode blanche → arrêter entre 32 et 34 s",
              "Sinon → arrêter entre 12 et 14 s",
            ],
          },
        ],
        warnings: [
          "Un module ne compte comme résolu que si sa validation est confirmée — pas en cours de résolution",
          "Ce module peut être résolu en dernier pour maximiser le nombre de modules résolus connus",
        ],
      },
    },
    {
      id: 5,
      title: "Interrupteurs",
      imagePath: null,
      instructions: {
        intro:
          "Le joueur voit un panneau de 4 à 6 interrupteurs à positionner correctement (haut = ON, bas = OFF). " +
          "La configuration dépend des modules encore actifs (non résolus) et du nombre de caractères du numéro de série. " +
          "Appliquez la première condition vérifiée.",
        steps: [
          {
            step: 1,
            text: "Appliquez la première condition vérifiée :",
            subSteps: [
              "Condition 1 — Module Coupe-fils présent ET module Molette présent ET numéro de série > 6 caractères → activer les interrupteurs de position impaire (1er, 3e, 5e)",
              "Condition 2 — Module Décodage présent ET module Chronomètre absent → activer uniquement le 1er interrupteur",
              "Condition 3 — Nombre total de modules sur le plateau ≥ 4 ET numéro de série avec un nombre pair de caractères → activer les interrupteurs de position paire (2e, 4e, 6e)",
              "Condition 4 — Module Chronomètre présent ET module Coupe-fils absent → activer tous les interrupteurs sauf le dernier",
              "Condition 5 — Nombre total de modules sur le plateau ≤ 3 → activer uniquement le dernier interrupteur",
              "Sinon → activer le 1er et le dernier interrupteur uniquement",
            ],
          },
        ],
        warnings: [
          "Tout interrupteur non mentionné dans la configuration doit être en position basse (OFF)",
          "La présence d'un module se vérifie au début de la partie — elle ne change pas en cours de jeu",
        ],
      },
    },
  ],
}
