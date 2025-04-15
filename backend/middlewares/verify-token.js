// modules
import jwt from 'jsonwebtoken'

// helpers
import { getToken } from '../helpers/get-token.js'

// middlware
export const verifyToken = async(req, res, next) => {
    // veirfy if header exist
    if(!req.headers.authorization) {
        return res.status(401).json({ status: 401, error: true, msg: 'Acesso negado!'})
    }

    // get token
    const token = await getToken(req)

    if(!token) {
        return res.status(401).json({ status: 401, error: true, msg: 'Acesso negado!'})
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)

        req.user = verified
        next()

    } catch(err) {
        res.status(400).json({ status: 400, error: true, msg: 'Token inválido!'})
    }
}