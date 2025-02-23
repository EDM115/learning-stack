import { FastifyRequest, FastifyReply } from "fastify"

export async function authenticate(request: FastifyRequest, reply: FastifyReply, next: (err?: Error)=> void) {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      return reply.unauthorized("Token d'authentification manquant")
    }

    try {
      const decoded = await request.jwtVerify()

      request.user = decoded
      next()
    } catch (error) {
      reply.unauthorized(`Token d'authentification invalide : ${error}`)
    }
  } catch (error) {
    reply.internalServerError(`Erreur d'authentification, ${error}`)
  }
}
