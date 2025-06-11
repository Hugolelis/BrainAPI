import { AuthController } from "../controllers/AuthController.js";

export async function authRoutes(fastify, options) {
    fastify.post('/register', AuthController.register)
    fastify.post('/login', AuthController.login)
}