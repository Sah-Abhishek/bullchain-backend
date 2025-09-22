import { Router } from "express";
import { register, checkUsername } from "../../controller/authController.js"

const router = Router();

router.post('/register', register);
router.post('/check-username', checkUsername);

export default router;

