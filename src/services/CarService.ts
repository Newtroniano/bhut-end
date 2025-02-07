import axios from 'axios';
import { Car } from '../models/Car';
import { Log } from '../models/Log';
import { sendToQueue } from '../config/queue';

export class CarService {
  private apiUrl = `${process.env.BASEURL}carro`;
  


  async getCars(token: string) {
    if (!token) {
      throw new Error("Token não fornecido.");
    }

    
    console.log('Token enviado para a API:', token);

    const response = await axios.get(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });

    console.log("Carros:", response.data);
    return response.data;
  }

  async createCar(carData: any, token:string) {
    if (!token) {
      throw new Error("Usuário não autenticado. Faça login primeiro.");
    }

    const response = await axios.post(this.apiUrl, carData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },


    });

    const car = response.data;
    await sendToQueue({
      car_id: car.id, 
      data_hora_criacao: new Date(), 
    });

    return car;

  }
}
