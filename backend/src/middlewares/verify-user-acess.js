import { getToken } from '../helpers/get-token.js'
import { getUserByToken } from '../helpers/get-user-by-token.js'

export const verifyUserAcess = async(req, reply) => {
    try {
        const token = getToken(req)

        if (!token) {
            return reply.code(401).send({ status: 401, message: 'Acesso negado', error: true })
        }

        const userEmail = req.body.email
        const userTokenData = await getUserByToken(token, req, reply)

        if (!userTokenData || userTokenData.email !== userEmail) {
            return reply.code(401).send({ status: 401, message: 'Permissão negada', error: true })
        }
        
    } catch(e) {
        reply.code(401).send({ status: 500, message: e, error: true })
    }
}