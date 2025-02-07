import axios from 'axios';
import { Car } from '../models/Car';
import { Log } from '../models/Log';
import { sendToQueue } from '../config/queue';

export class CarService {
  private apiUrl = 'http://api-test.bhut.com.br:3000/api/v1/carro';
  //private token: string | null = null; 


  async getCars(token: string) {
    if (!token) {
      throw new Error("Token não fornecido.");
    }

    // Log para verificar o token que está sendo enviado
    console.log('Token enviado para a API:', token);

    const response = await axios.get(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,  // Passa o token aqui
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

    return response.data;
  }
}
