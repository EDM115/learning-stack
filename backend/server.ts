import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import Fastify from "fastify"

import { goalsRoute } from "./routes/goals.ts"
import { nutritionRoute } from "./routes/nutrition.ts"
import { sessionsRoute } from "./routes/sessions.ts"

const fastify = Fastify({ logger: true })
const PORT = 3030

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
      version: "0.1.1"
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
