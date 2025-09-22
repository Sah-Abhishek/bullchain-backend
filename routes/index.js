import { Router } from "express";
import authRoutes from "./auth/auth.js"
import newsRoutes from "./news/news.js"

const router = Router();

router.use('/auth', authRoutes);
router.use('/news', newsRoutes);

export default router;
