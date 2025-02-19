import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { getNutrition, getNutritions } from "../controllers/nutrition.ts"

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

const getNutritionsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Nutrition
      }
    }
  },
  handler: getNutritions
}

const getNutritionOpts = {
  schema: {
    params: {
      type: "object",
      required: [ "id" ],
      properties: {
        id: { type: "number" }
      }
    },
    response: {
      200: Nutrition
    }
  },
  handler: getNutrition
}

export async function nutritionRoute(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  fastify.get("/nutrition", getNutritionsOpts)
  fastify.get("/nutrition/:id", getNutritionOpts)
}
