import { getToken } from '../helpers/get-token.js'
import { getUserByToken } from '../helpers/get-user-by-token.js'

export const verifyAcessAdmin = async (req, reply) => {
    try {
        const token = getToken(req)
        const user = await getUserByToken(token, req, reply)

        console.log(token, user)

        if(user && user.acesso === 'admin') {
            return
        }

        reply.code(401).send({ status: 401, message: 'Acesso negado, área restrita para administradores', error: true })

    } catch(e) {
        reply.code(401).send({ status: 500, message: e, error: true })
    }
}