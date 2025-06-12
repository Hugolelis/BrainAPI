import { UserController } from "../controllers/UserController.js";

import { verifyToken } from "../middlewares/verify-token.js";
import { verifyUserAcess } from "../middlewares/verify-user-acess.js";

export async function userRoutes(fastify, options) {
    fastify.patch('/update', { preHandler: [verifyToken, verifyUserAcess] }, UserController.update)

    fastify.patch('/delete', { preHandler: [verifyToken, verifyUserAcess] }, UserController.delete)
}