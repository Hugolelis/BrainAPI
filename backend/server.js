// modules
import express from 'express'
import cors from 'cors'

// consts
const app = express()
const port = process.env.PORT
const host = process.env.HOST

// configs
app.use(cors({
    origin: "*"
}))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// routes
import { router as userRouter } from './routers/userRoutes.js'

app.use('/user', userRouter)

// conn
app.listen(port, host, () => {
    console.log(`Server listing in ${host}:${port}`)
})