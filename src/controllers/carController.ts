import { Request, Response } from 'express';
import { CarService } from '../services/CarService';

export class CarController {
  private carService: CarService;

  constructor() {
    this.carService = new CarService();
  }

  
  async getCars(req: Request, res: Response) {
    try {
      const cars = await this.carService.getCars(); 
      res.json(cars);
    } catch (error: any) {
      console.error("Erro ao buscar carros:", error.message);
      res.status(500).json({ error: "Erro interno ao buscar carros" });
    }
  }

  async createCar(req: Request, res: Response) {
    const car = await this.carService.createCar(req.body);
    res.status(201).json(car);
  }
}