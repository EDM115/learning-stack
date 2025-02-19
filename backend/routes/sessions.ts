import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { getSessions } from "../controllers/sessions.ts"

const Session = {
  type: "object",
  properties: {
    id: { type: "number" },
    day: { type: "string" },
    time: { type: "string" },
    duration: { type: "string" },
    calories: { type: "number" },
    goals: { type: "array", items: { type: "number" } }
  }
}

const getSessionsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Session
      }
    }
  },
  handler: getSessions
}

export async function sessionsRoute(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  fastify.get("/sessions", getSessionsOpts)
}
