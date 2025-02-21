export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string;
  goals?: Goal[];
  meals?: Meal[];
  sessions?: Session[];
}

export interface Goal {
  id: string;
  title: string;
  completed: boolean;
  duration: number;
  calories: number;
  weight: number;
  user?: User | null;
  userId: string | null;
  session?: Session[];
}

export interface Meal {
  id: string;
  name: string;
  day: Date;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  user?: User | null;
  userId: string | null;
}

export interface Session {
  id: string;
  date: Date;
  duration: number;
  calories: number;
  weight: number;
  user?: User | null;
  userId: string | null;
  goals?: Goal[];
}
