import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { getSession, getSessions } from "../controllers/sessions.js"

const Session = {
  type: "object",
  properties: {
    id: { type: "string" },
    date: { type: "string" },
    duration: { type: "string" },
    calories: { type: "number" },
    weight: { type: "number" },
    goals: { type: "array", items: { type: "string" } }
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

const getSessionOpts = {
  schema: {
    params: {
      type: "object",
      required: [ "id" ],
      properties: {
        id: { type: "string" }
      }
    },
    response: {
      200: Session
    }
  },
  handler: getSession
}

export async function sessionsRoute(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  fastify.get("/sessions", getSessionsOpts)
  fastify.get("/sessions/:id", getSessionOpts)
}
