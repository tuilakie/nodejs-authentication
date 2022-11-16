import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()  // <-- This is the Prisma Client instance

export default db;
