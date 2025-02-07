import express from 'express';
import { CarController } from '../controllers/carController';

const router = express.Router();
const carController = new CarController();
import { authMiddleware } from '../Middlewares/authMiddleware';

router.get('/', authMiddleware, carController.getCars);
router.post('/', carController.createCar);


export { router as carRoutes };