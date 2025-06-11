import bcrypt from 'bcrypt'

import { createUserToken } from '../helpers/create-user-token.js';

// prisma client
import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

export class AuthController {
    static async register(req, reply) {
        const { nome, email, senha, confirmaSenha } = req.body || { }

        const errorList = []

        if(!nome || !email || !senha || !confirmaSenha) errorList.push('Preencha todos os campos')

        if(senha.length < 6) errorList.push('A senha deve conter no mínimo 6 caracteres')

        if(senha != confirmaSenha) errorList.push('As senhas não coincidem')
        
        const userExist = await prisma.usuario.findUnique({ where: { email: email } })
        if(userExist) errorList.push('O email ja está cadastrado')

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)

        const newUser = {
            nome,
            email,
            senha: passwordHash,
            acesso: 'user'
        }

        const safeUser = {
            nome,
            email,
            foto: null,
            acesso: 'user'
        }

        try {
            if(errorList.length > 0) {
                return reply.code(400).send({ status: 400, message: errorList, error: true })
            } 

            const user = await prisma.usuario.create({ data: newUser })
            const token = await createUserToken(user, req, reply)

            return reply.code(201).send({ status: 201, message: 'Registro feito com sucesso!', error: false, data: safeUser, token })
        } catch(e) {
            reply.code(500).send({ status: 500, message: e, error: true})
        }
    }

    static async login(req, reply) {
        const { email, senha } = req.body || { }

        const errorList = []

        let nome = null

        if(!email || !senha) errorList.push('Preencha todos os campos')

        const user = await prisma.usuario.findUnique({ where: { email: email } })

        if(!user) { 
            errorList.push('O email não está cadastrado')
        } else {
            const checkPassword = await bcrypt.compare(senha, user.senha)
            if(!checkPassword) errorList.push('Senha ou email incorreto(s)')

            nome = user.nome
        }

        const safeUser = {
            nome,
            email,
            foto: null,
            acesso: 'user'
        }

        try {
            if(errorList.length > 0) {
                return reply.code(400).send({ status: 400, message: errorList, error: true })
            } 

            const token = await createUserToken(user, req, reply)
            return reply.code(201).send({ status: 201, message: 'Login feito com sucesso!', error: false, data: safeUser, token })
        } catch(e) {
            reply.code(500).send({ status: 500, message: e, error: true})
        } 
    }
}