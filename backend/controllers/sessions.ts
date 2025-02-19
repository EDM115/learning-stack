import { FastifyRequest, FastifyReply } from "fastify"

const sessions = [
  {
    id: 1,
    day: "Lundi 10/02/2025",
    time: "18h30",
    duration: "1h",
    calories: 300,
    goals: [ 2 ]
  },
  {
    id: 2,
    day: "Mercredi 12/02/2025",
    time: "18h30",
    duration: "1h",
    calories: 500,
    goals: [ 3 ]
  },
  {
    id: 3,
    day: "Vendredi 14/02/2025",
    time: "18h30",
    duration: "1h",
    calories: 400,
    goals: [ 4 ]
  }
]

export async function getSessions(request: FastifyRequest, reply: FastifyReply) {
  reply.send(sessions)
}

export async function getSession(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: number }
  const session = sessions.find((session) => session.id === id)

  if (!session) {
    reply.status(404).send({ message: "Cette séance n'a pas été trouvée" })

    return
  }

  reply.send(session)
}
