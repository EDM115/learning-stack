import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import Fastify from "fastify"

import { goalsRoute } from "./routes/goals.ts"
import { nutritionRoute } from "./routes/nutrition.ts"
import { sessionsRoute } from "./routes/sessions.ts"

import pkg from "./package.json" assert { type: "json" }

const fastify = Fastify({ logger: true })
const PORT = process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT, 10) : 3030

fastify.setErrorHandler((error, request, reply) => {
  reply.status(500).send({ error: "Internal Server Error" })
})

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({ error: "Not Found" })
})

fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: "TrackFit API",
      description: "Documentation d'API pour TrackFit",
      version: pkg.version
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

fastify.register(goalsRoute)
fastify.register(nutritionRoute)
fastify.register(sessionsRoute)

const start = async () => {
  try {
    await fastify.listen({ port: PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
