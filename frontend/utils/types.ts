export type Goal = {
  id: number
  goal: string
  duration: string
  calories: number
  weight: number
}

export type Nutrition = {
  id: number
  day: string
  meal: string
  calories: number
  proteins: number
  carbs: number
  fats: number
}

export type Session = {
  id: number
  day: string
  time: string
  duration: string
  calories: number
  goals: number[] | (Goal | undefined)[]
}
