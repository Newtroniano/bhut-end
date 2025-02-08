import { Request, Response } from 'express';
import { CarService } from '../services/CarService';

export class CarController {
  private carService: CarService;

  constructor() {
    this.carService = new CarService();
    this.getCars = this.getCars.bind(this);
    this.createCar = this.createCar.bind(this); 
  }

  
  async getCars(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const cars = await this.carService.getCars(token);       
      res.json(cars);
    } catch (error: any) {
      //console.error("Erro ao buscar carros:", error.message);
      res.status(500).json({ error: "Erro interno ao buscar carros" });
    }
  }

  async createCar(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const car = await this.carService.createCar(req.body, token);
      res.status(201).json(car);
    } catch (error:any) {
       res.status(500).json({ error: error.message });
    }
    
    
  }
}