import { Request, Response } from 'express';
import { CarService } from '../services/CarService';

export class CarController {
  private carService: CarService;

  constructor() {
    this.carService = new CarService();
  }

  async getCars(req: Request, res: Response) {
    console.log("response")
    const cars = await this.carService.getCars();
    res.json(cars);
  }

  async createCar(req: Request, res: Response) {
    const car = await this.carService.createCar(req.body);
    res.status(201).json(car);
  }
}