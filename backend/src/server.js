import fastify from "fastify"
import cors from '@fastify/cors';
import fastifyJwt from "@fastify/jwt";
import fastifyStatic from '@fastify/static';

import { fileURLToPath } from 'url';
import path from 'path';

const app = fastify({ 
    logger: {
        transport: {
            target: 'pino-pretty'
        }
    }
})

const PORT = process.env.PORT
const HOST = process.env.HOST

// file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, 'public');
console.log('path', publicPath)

// configs 
await app.register(cors)

await app.register(fastifyStatic, { root: publicPath, prefix: '/public/' })

app.register(fastifyJwt, { secret: process.env.SECRET, sign: { expiresIn: '7d' } })

// routes
import { authRoutes } from "./routes/authRoutes.js";
app.register(authRoutes, { prefix: '/auth' })

import { userRoutes } from "./routes/userRoutes.js";
app.register(userRoutes, { prefix: '/user' })

import { specialtiesRoutes } from "./routes/specialtiesRoutes.js";
app.register(specialtiesRoutes, { prefix: '/specialties' })

import { feedbackRoutes } from "./routes/feedbackRoutes.js";
app.register(feedbackRoutes, { prefix: '/feedback' })

// conn
try {
    app.listen({host: HOST, port: PORT})
} catch(e) {
    app.log.error(e)
}
