import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { getNutrition } from "../controllers/nutrition.ts"

const Nutrition = {
  type: "object",
  properties: {
    id: { type: "number" },
    day: { type: "string" },
    meal: { type: "string" },
    calories: { type: "number" },
    proteins: { type: "number" },
    carbs: { type: "number" },
    fats: { type: "number" }
  }
}

const getNutritionOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Nutrition
      }
    }
  },
  handler: getNutrition
}

export async function nutritionRoute(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  fastify.get("/nutrition", getNutritionOpts)
}
