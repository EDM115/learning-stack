import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { getGoal, getGoals } from "../controllers/goals.js"

const Goal = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    completed: { type: "boolean" },
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
        id: { type: "string" }
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
