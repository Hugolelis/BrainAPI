// modules
import jwt from 'jsonwebtoken' 

// repository
import { UserRepository } from '../repositories/UserRepository.js'

// helper
export const getUserByToken = async(token, req , res) => {
    if(!token) {
        return res.status(401).json({ status: 401, error: true, msg: 'Acesso negado!'})
    }

    // get user
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

    const userId = decoded.id

    const user = await UserRepository.getUserById(userId)
    
    return user
}