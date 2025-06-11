export const createUserToken = async(user, req, reply) => {
    try {
        const token = await reply.jwtSign({
            id: user.id,
            name: user.nome,
            email: user.email,
            photo: user.foto,
            acesso: user.acesso
        })

        return token
    } catch(e) {
        reply.status(500).send({ status: 500, message: e, error: true })
    }
}