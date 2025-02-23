import { FastifyRequest, FastifyReply } from "fastify"
import { fastify } from "../server.js"

export async function getSessions(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const sessions = await fastify.prisma.session.findMany({
      select: {
        id: true,
        date: true,
        duration: true,
        calories: true,
        weight: true,
        goals: {
          select: {
            id: true
          }
        }
      }
    })

    const formattedSessions = sessions.map((session) => ({
      ...session,
      goals: session.goals.map((goal) => goal.id)
    }))

    reply.send(formattedSessions)
  } catch (error) {
    reply.internalServerError(`Erreur lors de la récupération des séances : ${error}`)
  }
}

export async function getSession(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  try {
    const session = await fastify.prisma.session.findUnique({
      where: { id },
      select: {
        id: true,
        date: true,
        duration: true,
        calories: true,
        weight: true,
        goals: {
          select: {
            id: true
          }
        }
      }
    })

    if (!session) {
      return reply.notFound("Cette séance n'a pas été trouvée")
    }


    const formattedSession = {
      ...session,
      goals: session.goals.map((goal) => goal.id)
    }

    reply.send(formattedSession)
  } catch (error) {
    reply.internalServerError(`Erreur lors de la récupération de la séance : ${error}`)
  }
}

