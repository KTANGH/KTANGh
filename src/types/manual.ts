export type InstructionStep = {
  step: number
  text: string
  subSteps?: string[]
}

export type Trial = {
  id: number
  title: string
  imagePath: string | null  // null until image is provided
  instructions: {
    intro?: string
    steps: InstructionStep[]
    warnings?: string[]
    timeLimit?: number  // seconds
  }
}

export type Manual = {
  title: string
  version: string
  trials: Trial[]
}
