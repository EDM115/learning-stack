import { FastifyRequest, FastifyReply } from "fastify"

const nutrition = [
  {
    id: 1,
    day: "Lundi 10/02/2025",
    meal: "Petit-déjeuner",
    calories: 300,
    proteins: 20,
    carbs: 50,
    fats: 10
  },
  {
    id: 2,
    day: "Lundi 10/02/2025",
    meal: "Déjeuner",
    calories: 600,
    proteins: 30,
    carbs: 70,
    fats: 20
  },
  {
    id: 3,
    day: "Lundi 10/02/2025",
    meal: "Dîner",
    calories: 500,
    proteins: 25,
    carbs: 60,
    fats: 15
  }
]

export async function getNutritions(request: FastifyRequest, reply: FastifyReply) {
  reply.send(nutrition)
}

export async function getNutrition(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: number }
  const item = nutrition.find((item) => item.id === id)

  if (!item) {
    reply.status(404).send({ message: "Ce repas n'a pas été trouvé" })

    return
  }

  reply.send(item)
}
