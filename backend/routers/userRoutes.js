// modules
import { Router } from "express";

// controllers
import { UserController } from "../controllers/userController.js";

// middlewares
import { verifyToken } from "../middlewares/verify-token.js";

// consts
export const router = Router()

// routes GET
router.get('/getAll', UserController.getAll)

// routes POST
router.post('/register', UserController.register)
router.post('/login', UserController.login)

// routes DELETE
router.delete('/delete', verifyToken, UserController.delete)

// routes PUT 
router.put('/update', verifyToken, UserController.update)    