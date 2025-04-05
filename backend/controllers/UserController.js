// modules
import bcrypt from 'bcrypt'

// helpers
import { createUserToken } from '../helpers/create-user-token.js'
import { getUserByToken } from '../helpers/get-user-by-token.js'
import { getToken } from '../helpers/get-token.js'

// repository
import { UserRepository } from '../repositories/UserRepository.js'

// controller
export class UserController {
    static async getAll(req, res) {
        try {
            const users = await UserRepository.getAllUsers()
            res.status(200).json({ status: 200, error: false, msg: users })
        } catch(err) {
            res.status(400).json({ status: 400, error: true, msg: err})
        }
    }

    static async register(req, res) {
        const { name, email, password, confirmPassword } = req.body || {}

        // verify datas
        if(!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ status: 400, error: true, msg: 'Preencha todos os campos!' })
        }

        // verify password
        if(password != confirmPassword) {
            return res.status(400).json({ status: 400, error: true, msg: 'As senhas não coincidem!' })
        }

        // verify email
        const userExist = await UserRepository.getUserByEmail(email)

        if(userExist) {
            return res.status(400).json({ status: 400, error: true, msg: 'Esse email ja está cadastrado!' })
        }

        // create hash
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const newUser = {
            name,
            email,
            password: passwordHash,
            acess: 'user'
        }

        try {
            // register user
            await UserRepository.registerUser(newUser)
            res.status(200).json({ status: 200, error: false, msg: 'Usuário cadastrado com sucesso!', data: newUser })

        } catch(err) {
            res.status(400).json({ status: 400, error: true, msg: err })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body || {}

        // verify datas
        if(!email || !password) {
            return res.status(400).json({ status: 400, error: true, msg: 'Preencha todos os campos!' })
        }

        // veirfy user exist
        const user = await UserRepository.getUserByEmail(email)

        if(!user) {
            return res.status(404).json({ status: 404, error: true, msg: 'Esse usuário não existe!' })
        }

        // verify password 
        const comparePassword = await bcrypt.compare(password, user.password);
        console.log(password, user.password)

        if(!comparePassword) {
            return res.status(400).json({ status: 400, error: true, msg: 'A senha está incorreta!' });
        }
        

        try {
            // get user data
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                acess: user.acess
            }

            // create token
            const token = await createUserToken(userData)

            // res
            res.status(200).json({ status: 200, error: false, msg: 'Login realizado com sucesso', data: userData, token: token})

        } catch(err) {
            res.status(400).json({ status: 400, error: true, msg: err })
        }
    }

    static async update(req, res) {
        const { name, email, password, newPassword, confirmPassword } = req.body || {}

        // get user
        const token = await getToken(req)
        const user = await getUserByToken(token)

        // verify datas
        if(!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ status: 400, error: true, msg: 'Preencha todos os campos!' })
        }

        // verify password
        if(password != confirmPassword) {
            return res.status(400).json({ status: 400, error: true, msg: 'As senhas não coincidem!' })
        }

        if(password == newPassword) {
            return res.status(400).json({ status: 400, error: true, msg: 'A senha atual é igual a nova senha!'})
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword) {
            return res.status(400).json({ status: 400, error: true, msg: 'A senha está incorreta!'})
        }

        // verify email
        if(user.email !== email) {
            return res.status(400).json({ status: 400, error: true, msg: 'Solicitação negada!' })
        }

        // create user
        const newUserData = {
            name,
            email,
            password,
            acess: user.acess
        }

        // add new password if exist
        if(newPassword) {
            // create hash
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(newPassword, salt)

            console.log('entrei')
            newUserData.password = passwordHash

        } else {
            newUserData.password = user.password

            console.log('entreii')
        }

        try {
            // update user
            await UserRepository.updateUser(newUserData, email)
        
            res.status(200).json({ status: 200, error: false, msg: 'Usuário editado com sucesso!', data: newUserData })

        } catch(err) {
            res.status(400).json({ status: 400, error: true, msg: 'Usuário não encontrado!' })
        }
        
    }

    static async delete(req, res) {
        try {
            // get user
            const token = await getToken(req)
            const user = await getUserByToken(token)

            // delete user
            await UserRepository.deleteUser(user.id)

            res.status(200).json({ status: 200, error: false, msg: 'Usuário deletado com sucesso!', data: user })

        } catch(err) {
            res.status(400).json({ status: 400, error: true, msg: 'Usuário não encontrado!' })
        }
    }
}