export const verifyAcessAdmin = async (req, reply) => {
    try {
        const token = getToken(req)
        const user = await getUserByToken(token, req, reply)

        if(user && user.acesso === 'admin') {
            return
        }

        reply.code(401).send({ status: 401, message: 'Acesso negado, área restrita para administradores', error: true })

    } catch(e) {
        reply.code(401).send({ status: 500, message: e, error: true })
    }
}