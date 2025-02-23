import { randomBytes } from "crypto"

import fastifyCors from "@fastify/cors"
import fastifyJWT from "@fastify/jwt"
import fastifyMiddie from "@fastify/middie"
import fastifySensible from "@fastify/sensible"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import fastifyPrisma from "@joggr/fastify-prisma"
import Fastify from "fastify"

import prisma from "./prisma/instance.js"
import { goalsRoute } from "./routes/goals.js"
import { nutritionRoute } from "./routes/nutrition.js"
import { sessionsRoute } from "./routes/sessions.js"
import { authRoute } from "./routes/auth.js"

const pkg = await import("./package.json", { with: { type: "json" } })
const isDev = process.env.NODE_ENV !== "production"

export const fastify = Fastify({ logger: isDev })
const PORT = process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT, 10) : 3030

export const JWT_SECRET = process.env.JWT_SECRET || randomBytes(64).toString("hex")

await fastify.register(fastifySensible)

fastify.setErrorHandler((_error, _request, reply) => {
  reply.internalServerError("Erreur interne du serveur")
})

fastify.setNotFoundHandler((_request, reply) => {
  reply.notFound("URL non trouvée")
})

await fastify.register(fastifyMiddie)

await fastify.register(fastifyPrisma, { client: prisma })

await fastify.register(fastifyCors, {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
})

await fastify.register(fastifyJWT, {
  secret: JWT_SECRET
})

await fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: "TrackFit API",
      description: "Documentation d'API pour TrackFit",
      version: pkg.default.version
    }
  }
})

await fastify.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false
  }
})

await fastify.register(authRoute)
await fastify.register(goalsRoute)
await fastify.register(nutritionRoute)
await fastify.register(sessionsRoute)

fastify.get("/", async (_request, reply) => {
  reply.redirect("/docs")
})

async function start() {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

await start()
