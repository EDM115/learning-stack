import { FastifyRequest, FastifyReply } from "fastify"
import { fastify } from "../server.js"

export async function getNutritions(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const nutrition = await fastify.prisma.meal.findMany()

    reply.send(nutrition)
  } catch (error) {
    reply.internalServerError(`Erreur lors de la récupération des repas : ${error}`)
  }
}

export async function getNutrition(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  try {
    const nutrition = await fastify.prisma.meal.findUnique({
      where: { id }
    })

    if (!nutrition) {
      return reply.notFound("Ce repas n'a pas été trouvé")
    }

    reply.send(nutrition)
  } catch (error) {
    reply.internalServerError(`Erreur lors de la récupération du repas : ${error}`)
  }
}
