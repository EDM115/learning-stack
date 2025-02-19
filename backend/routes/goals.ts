import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { getGoal, getGoals } from "../controllers/goals.ts"

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

const getGoalsOpts = {
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

const getGoalOpts = {
  schema: {
    params: {
      type: "object",
      required: [ "id" ],
      properties: {
        id: { type: "number" }
      }
    },
    response: {
      200: Goal
    }
  },
  handler: getGoal
}

export async function goalsRoute(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  fastify.get("/goals", getGoalsOpts)
  fastify.get("/goals/:id", getGoalOpts)
}
