import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString, max: 20 })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default prisma
