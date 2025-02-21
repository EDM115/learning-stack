import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { register, login, getMe } from "../controllers/auth.js"
import { authenticate } from "../middleware/auth.js"

const User = {
  type: "object",
  properties: {
    id: { type: "string" },
    email: { type: "string" },
    name: { type: "string" }
  }
}

const AuthResponse = {
  type: "object",
  properties: {
    user: User,
    token: { type: "string" }
  }
}

const loginRegisterOpts = {
  schema: {
    body: {
      type: "object",
      required: [ "email", "password" ],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
        name: { type: "string" }
      }
    },
    response: {
      200: AuthResponse
    }
  }
}

const getMeOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          user: User
        }
      }
    }
  },
  handler: getMe
}

export async function authRoute(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.post("/auth/register", { ...loginRegisterOpts, handler: register })
  fastify.post("/auth/login", { ...loginRegisterOpts, handler: login })
  fastify.get("/auth/me", { ...getMeOpts, preHandler: authenticate })
}
