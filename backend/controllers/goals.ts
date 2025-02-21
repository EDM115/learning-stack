import { FastifyRequest, FastifyReply } from "fastify"
import prisma from "../prisma/instance.js"

export async function getGoals(request: FastifyRequest, reply: FastifyReply) {
  try {
    const goals = await prisma.goal.findMany()

    reply.send(goals)
  } catch (error) {
    reply
      .status(500)
      .send({ message: "Erreur lors de la récupération des objectifs.", error })
  }
}

export async function getGoal(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  try {
    const goal = await prisma.goal.findUnique({
      where: { id }
    })

    if (!goal) {
      return reply.status(404).send({ message: "Cet objectif n'a pas été trouvé" })
    }

    reply.send(goal)
  } catch (error) {
    reply
      .status(500)
      .send({ message: "Erreur lors de la récupération de l'objectif.", error })
  }
}
