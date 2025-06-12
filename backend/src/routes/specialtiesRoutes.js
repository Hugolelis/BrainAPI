import { SpecialtiesController } from "../controllers/SpecialtiesController.js";

import { verifyToken } from "../middlewares/verify-token.js";
import { verifyAcessAdmin } from "../middlewares/verify-acess-admin.js";

export async function specialtiesRoutes(fastify, options) {
    fastify.get('/view', { preHandler: [verifyToken, verifyAcessAdmin] }, SpecialtiesController.view)
    fastify.post('/register', { preHandler: [verifyToken, verifyAcessAdmin] }, SpecialtiesController.register)
    fastify.put('/update/:id', { preHandler: [verifyToken, verifyAcessAdmin] }, SpecialtiesController.update)
    fastify.delete('/delete/:id', { preHandler: [verifyToken, verifyAcessAdmin] }, SpecialtiesController.delete)
}