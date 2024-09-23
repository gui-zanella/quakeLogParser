import { Router } from "express";
import  StatisticController  from "../controllers/statistics.controller";

const router = Router();

router.get('/statistics', StatisticController.perGame);

export default router;