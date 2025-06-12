import { getToken } from '../helpers/get-token.js'

export const verifyToken = async(req, reply) => {
    if(!req.headers.authorization) return reply.code(401).send({ status: 401, message: 'Acesso negado', error: true })

    const token = getToken(req)
    if(!token) return reply.code(401).send({ status: 401, message: 'Acesso negado', error: true })

    try {
        const verified = await req.jwtVerify()
        req.user = verified
        
        return
    } catch(e) {
        reply.code(401).send({ status: 401, message: 'Token inválido', error: true })
    }
}