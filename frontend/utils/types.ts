export type User = {
  id: string
  name: string | null
  email: string
  password: string
  goals?: Goal[]
  meals?: Meal[]
  sessions?: Session[]
}

export type Goal = {
  id: string
  title: string
  completed: boolean
  duration: number
  calories: number
  weight: number
  user?: User | null
  userId: string | null
  session?: Session[]
}

export type Meal = {
  id: string
  name: string
  day: Date
  calories: number
  protein: number
  carbs: number
  fat: number
  user?: User | null
  userId: string | null
}

export type Session = {
  id: string
  date: Date
  duration: number
  calories: number
  weight: number
  user?: User | null
  userId: string | null
  goals?: Goal[] | string[]
}
