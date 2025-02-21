import { Goal, Meal, Session } from "@/utils/types"
import axios from "axios"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3030"

export async function getGoals() {
  const goals = await axios
    .get(`${BACKEND_URL}/goals`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching goals :", error)
      return []
    })

  return goals as Goal[]
}

export async function getNutrition() {
  const nutrition = await axios
    .get(`${BACKEND_URL}/nutrition`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching nutrition :", error)
      return []
    })

  return nutrition as Meal[]
}

export async function getSessions() {
  const sessions = await axios
    .get(`${BACKEND_URL}/sessions`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching sessions :", error)
      return []
    })

  return sessions as Session[]
}
