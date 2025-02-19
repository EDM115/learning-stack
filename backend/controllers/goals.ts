import { FastifyRequest, FastifyReply } from "fastify"

const goals = [
  {
    id: 1,
    goal: "Perdre du poids",
    duration: "3 mois",
    calories: 2000,
    weight: 70
  },
  {
    id: 2,
    goal: "Prise de masse",
    duration: "6 mois",
    calories: 2500,
    weight: 80
  },
  {
    id: 3,
    goal: "Séance cardio",
    duration: "1 mois",
    calories: 1500,
    weight: 75
  },
  {
    id: 4,
    goal: "Musculation",
    duration: "2 mois",
    calories: 1800,
    weight: 75
  }
]

export async function getGoals(request: FastifyRequest, reply: FastifyReply) {
  reply.send(goals)
}

export async function getGoal(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: number }
  const goal = goals.find((goal) => goal.id === id)

  if (!goal) {
    reply.status(404).send({ message: "Cet objectif n'a pas été trouvé" })

    return
  }

  reply.send(goal)
}
