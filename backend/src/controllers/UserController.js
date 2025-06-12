import bcrypt from 'bcrypt'

import { createUserToken } from '../helpers/create-user-token.js';

// prisma client
import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

export class UserController {
    static async update(req, reply) {
        
    }

    static async delete(req, reply) {
        const { nome, email, senha } = req.body || { }

        const errorList = []

        if(!nome || !email || !senha) errorList.push('Preencha todos os campos.')

        const user = await prisma.usuario.findUnique({ where: { email: email } })

        if(!user) { 
            errorList.push('O email não está cadastrado.')
        } else {
            const checkPassword = await bcrypt.compare(senha, user.senha)
            if(!checkPassword) errorList.push('Senha ou email incorreto(s).')
        }

        try {
            if(errorList.length > 0) {
                return reply.code(400).send({ status: 400, message: errorList, error: true })
            } 

            await prisma.usuario.update({ where: { email: email }, data: { deletedAt: new Date() } })

            reply.code(201).send({ status: 201, message: 'Conta excluida com sucesso.', error: false })
        } catch(e) {
            reply.code(500).send({ status: 500, message: e, error: true})
        }
    }
} 