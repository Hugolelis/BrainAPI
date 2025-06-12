// prisma client
import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

export class SpecialtiesController {
    static async view(req, reply) {
        try {
            const specialties = await prisma.especialidade.findMany({orderBy: { id: 'asc' }})

            return reply.code(201).send({ status: 201, message: 'Trazendo todas as especialidades.', error: false, data: specialties })

        } catch(e) {
            reply.code(401).send({ status: 500, message: e, error: true })
        }
    }

    static async register(req, reply) {
        const { nome } = req.body || { }

        const errorList = []

        if(!nome) {
            errorList.push('Preencha o campo.')
        } else {
            const specialtieExist = await prisma.especialidade.findUnique({ where: { nome: nome } }) || null
            if(specialtieExist) errorList.push('Especialidade ja cadastrada.')
        }

        try {
            if(errorList.length > 0) {
                return reply.code(400).send({ status: 400, message: errorList, error: true })
            } 

            const specialtie = await prisma.especialidade.create({ data: { nome } })
            return reply.code(201).send({ status: 201, message: 'Especialidade criada com sucesso.', error: false, data: specialtie })
        } catch(e) {
            reply.code(401).send({ status: 500, message: e, error: true })
        }
    }

    static async update(req, reply) {
        const { id } = req.params
        const { nome } = req.body || { }

        const errorList = []

        if(!nome) {
            errorList.push('Preencha o campo.')
        } else {
            const specialtieExist = await prisma.especialidade.findUnique({ where: { nome: nome } })
            if(specialtieExist) errorList.push('Especialidade ja cadastrada.')
        }

        try {
            if(errorList.length > 0) {
                return reply.code(400).send({ status: 400, message: errorList, error: true })
            } 
            
            const specialtie = await prisma.especialidade.update({ where: { id: Number(id) }, data: { nome: nome } })

            return reply.code(201).send({ status: 201, message: 'Especialidade editada com sucesso.', error: false, data: specialtie })

        } catch(e) {
            reply.code(401).send({ status: 500, message: e, error: true })
        }
    }

    static async delete(req, reply) {
        const { id } = req.params

        try {
            const specialtie = await prisma.especialidade.update({ where: { id: Number(id) } })

            return reply.code(201).send({ status: 201, message: 'Especialidade excluida com sucesso.', error: false })

        } catch(e) {
            reply.code(401).send({ status: 500, message: e, error: true })
        }
    }
}