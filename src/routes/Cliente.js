import { Router } from "express";
import { store,index,show,destroy,update,search } from "../controllers/Cliente.js";
import { validaSchema } from "../middlewares/Validate-middleware.js";
import {ClienteSchema} from "../schemas/ClienteSchema.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.get('/search',authRequired,search)
router.get('/',authRequired,index);
router.post('/',authRequired,validaSchema(ClienteSchema),store);
router.put('/:_id',authRequired,validaSchema(ClienteSchema),update);
router.get('/:_id',authRequired,show);
router.delete('/:_id',authRequired,destroy);

export default router;