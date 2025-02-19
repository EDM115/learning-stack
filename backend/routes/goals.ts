import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { getGoals } from "../controllers/goals.ts"

const Goal = {
  type: "object",
  properties: {
    id: { type: "number" },
    goal: { type: "string" },
    duration: { type: "string" },
    calories: { type: "number" },
    weight: { type: "number" }
  }
}

const getGoalOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Goal
      }
    }
  },
  handler: getGoals
}

export async function goalsRoute(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  fastify.get("/goals", getGoalOpts)
}
