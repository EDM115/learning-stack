import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { getNutrition, getNutritions } from "../controllers/nutrition.js"

const Nutrition = {
  type: "object",
  properties: {
    id: { type: "string" },
    day: { type: "string" },
    name: { type: "string" },
    calories: { type: "number" },
    protein: { type: "number" },
    carbs: { type: "number" },
    fat: { type: "number" }
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
        id: { type: "string" }
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
