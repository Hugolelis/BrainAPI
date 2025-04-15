import Users from "../database/users.js";

export class UserRepository {
    static async getAllUsers() {
        return Users
    }

    static async registerUser(user) {
        const newUser = {
            id: Users.length + 1,
            name: user.name,
            email: user.email,
            password: user.password,
            acess: user.acess
        }

        return Users.push(newUser)
    }

    static async getUserByEmail(email) {
        const user = Users.find(user => user.email.toLocaleLowerCase() === email.toLocaleLowerCase())

        return user
    }

    static async getUserById(id) {
        const user = Users.find(user => user.id === id)

        return user
    }

    static async updateUser(uUser, email) {
        const user = await this.getUserByEmail(email)

        user.name = uUser.name
        user.email = uUser.email
        user.password = uUser.password
        user.image = uUser.image
        user.acess = uUser.acess
    }

    static async deleteUser(id) {
        const index = Users.findIndex(user => user.id === id);  
        const userDelete = Users.splice(index, 1);

        return userDelete
    }
}