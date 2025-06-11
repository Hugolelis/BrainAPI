import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

export const getUserByToken = async(token, req, reply) => {
    if(!token) return reply.code(401).send({ status: 401, message: 'Acesso negado', error: true })
    
    const decoded = await req.jwtVerify()

    const userID = decoded.id

    const user = await prisma.usuario.findUnique({ where: { id: userID }})

    return user
}