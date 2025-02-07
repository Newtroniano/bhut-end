import express from 'express';
import { CarController } from '../controllers/carController';

const router = express.Router();
const carController = new CarController();

router.get('/', carController.getCars);
router.post('/', carController.createCar);


export { router as carRoutes };