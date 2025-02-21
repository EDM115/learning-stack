import { FastifyRequest, FastifyReply } from "fastify"

export async function authenticate(request: FastifyRequest, reply: FastifyReply, next: (err?: Error)=> void) {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      reply.status(401).send({ message: "Token d'authentification manquant" })

      return
    }

    try {
      const decoded = await request.jwtVerify()

      request.user = decoded
      next()
    } catch (error) {
      reply.status(401).send({ message: "Token d'authentification invalide", error })
    }
  } catch (error) {
    reply.status(500).send({ message: "Erreur d'authentification", error })
  }
}
