import express from 'express';
import { LogController } from '../controllers/logController';

const router = express.Router();
const logController = new LogController();

router.get('/', logController.getLogs);

export { router as logRoutes };