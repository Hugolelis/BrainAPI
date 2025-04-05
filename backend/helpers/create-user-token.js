// modules
import jwt from 'jsonwebtoken'

// helper
export const createUserToken = async(user, req, res) => {
    try {
        const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE })
        
        return token
    } catch(err) {
        res.status(400).json({ status: 400, error: true, msg: 'Falha ao criar o token!' })
    }
}