import { FastifyRequest, FastifyReply } from "fastify"
import { fastify } from "../server.js"

export async function getGoals(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const goals = await fastify.prisma.goal.findMany()

    reply.send(goals)
  } catch (error) {
    reply.internalServerError(`Erreur lors de la récupération des objectifs : ${error}`)
  }
}

export async function getGoal(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  try {
    const goal = await fastify.prisma.goal.findUnique({
      where: { id }
    })

    if (!goal) {
      return reply.notFound("Cet objectif n'a pas été trouvé")
    }

    reply.send(goal)
  } catch (error) {
    reply.internalServerError(`Erreur lors de la récupération de l'objectif : ${error}`)
  }
}
