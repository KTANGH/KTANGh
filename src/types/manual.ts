export type InstructionStep = {
  step: number
  text: string
  subSteps?: string[]
}

export type Trial = {
  id: number
  title: string
  imagePath: string | null
  instructions: {
    intro?: string
    steps: InstructionStep[]
    warnings?: string[]
  }
}

export type Manual = {
  title: string
  version: string
  globalTimeLimit: number  // secondes — compte à rebours unique pour toute la partie
  trials: Trial[]
}
