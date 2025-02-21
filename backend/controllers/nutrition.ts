import { FastifyRequest, FastifyReply } from "fastify"
import prisma from "../prisma/instance.js"

export async function getNutritions(request: FastifyRequest, reply: FastifyReply) {
  try {
    const nutrition = await prisma.meal.findMany()

    reply.send(nutrition)
  } catch (error) {
    reply
      .status(500)
      .send({ message: "Erreur lors de la récupération des repas.", error })
  }
}

export async function getNutrition(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  try {
    const nutrition = await prisma.meal.findUnique({
      where: { id }
    })

    if (!nutrition) {
      return reply.status(404).send({ message: "Ce repas n'a pas été trouvé" })
    }

    reply.send(nutrition)
  } catch (error) {
    reply
      .status(500)
      .send({ message: "Erreur lors de la récupération du repas.", error })
  }
}
