import { Goal, Nutrition, Session } from "@/utils/types"
import axios from "axios"

export async function getGoals() {
  const goals = await axios
    .get("http://localhost:3030/goals")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching goals :", error)
      return []
    })

  return goals as Goal[]
}

export async function getNutrition() {
  const nutrition = await axios
    .get("http://localhost:3030/nutrition")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching nutrition :", error)
      return []
    })

  return nutrition as Nutrition[]
}

export async function getSessions() {
  const sessions = await axios
    .get("http://localhost:3030/sessions")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching sessions :", error)
      return []
    })

  return sessions as Session[]
}
