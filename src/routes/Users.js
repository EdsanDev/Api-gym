import { Router } from "express";
import { register,logout,login,verifyToken,perfile } from "../controllers/Users.js";
import { validaSchema } from "../middlewares/Validate-middleware.js";
import { registerSchema, loginSchema } from "../schemas/UserSchema.js";

const router = Router()

router.post('/register',validaSchema(registerSchema),register);
router.post('/login', validaSchema(loginSchema),login);
router.post('/logout',logout);
router.get('/perfile',perfile);
router.get("/verify",verifyToken)

export default router;