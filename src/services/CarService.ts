import axios from 'axios';
import { Car } from '../models/Car';
import { Log } from '../models/Log';
import { sendToQueue } from '../config/queue';

export class CarService {
  private apiUrl = 'http://api-test.bhut.com.br:3000/api/v1/carro';

  async getCars() {
    console.log("response")
    const response = await axios.get(this.apiUrl);
    
    return response;
  }

  async createCar(carData: any) {
    const response = await axios.post(this.apiUrl, carData);
    const car = response.data;

    await sendToQueue({
      car_id: car._id,
      data_hora_criacao: new Date(),
    });

    return car;
  }
}