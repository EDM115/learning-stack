import { randomBytes } from "crypto"

import fastifyCors from "@fastify/cors"
import fastifyJWT from "@fastify/jwt"
import fastifyMiddie from "@fastify/middie"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import Fastify from "fastify"

import { goalsRoute } from "./routes/goals.js"
import { nutritionRoute } from "./routes/nutrition.js"
import { sessionsRoute } from "./routes/sessions.js"
import { authRoute } from "./routes/auth.js"

const pkg = await import("./package.json", { with: { type: "json" } })

const fastify = Fastify({ logger: true })
const PORT = process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT, 10) : 3030

export const JWT_SECRET = process.env.JWT_SECRET || randomBytes(64).toString("hex")

fastify.setErrorHandler((_error, _request, reply) => {
  reply.status(500).send({ error: "Internal Server Error" })
})

fastify.setNotFoundHandler((_request, reply) => {
  reply.status(404).send({ error: "Not Found" })
})

await fastify.register(fastifyMiddie)

fastify.register(fastifyCors, {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
})

fastify.register(fastifyJWT, {
  secret: JWT_SECRET
})

fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: "TrackFit API",
      description: "Documentation d'API pour TrackFit",
      version: pkg.default.version
    }
  }
})

fastify.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false
  }
})

fastify.register(authRoute)
fastify.register(goalsRoute)
fastify.register(nutritionRoute)
fastify.register(sessionsRoute)

fastify.get("/", async (_request, reply) => {
  reply.redirect("/docs")
})

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
