// src/controllers/carController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import amqp from 'amqplib';

export const createCar = async (req: Request, res: Response) => {
    try {
        const carData = req.body;
        const response = await axios.post('http://api-test.bhut.com.br:3000/api/v1/carro', carData);

        // Enviar mensagem para a fila
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'car_queue';
        await channel.assertQueue(queue, { durable: false });

        const message = {
            car_id: response.data._id,
            created_at: new Date().toISOString()
        };

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log("Message sent to queue:", message);

        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create car' });
    }
};