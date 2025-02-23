import { FastifyRequest, FastifyReply } from "fastify"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { fastify, JWT_SECRET } from "../server.js"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { email, password, name } = request.body as { email: string; password: string; name?: string }

  try {
    const existingUser = await fastify.prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return reply.status(400).send({ message: "Un utilisateur existe déjà avec cet email" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await fastify.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })

    reply.send({ user, token })
  } catch (error) {
    reply.internalServerError(`Erreur lors de l'inscription : ${error}`)
  }
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as { email: string; password: string }

  try {
    const user = await fastify.prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return reply.unauthorized("Email ou mot de passe incorrect")
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return reply.unauthorized("Email ou mot de passe incorrect")
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name
    }

    reply.send({ user: userWithoutPassword, token })
  } catch (error) {
    reply.internalServerError(`Erreur lors de la connexion : ${error}`)
  }
}

export async function getMe(request: FastifyRequest, reply: FastifyReply) {
  const user: any = request.user
  const userId = user.userId

  try {
    const user = await fastify.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    })

    if (!user) {
      return reply.notFound("Utilisateur non trouvé")
    }

    reply.send({ user })
  } catch (error) {
    reply.internalServerError(`Erreur lors de la récupération du profil : ${error}`)
  }
}
