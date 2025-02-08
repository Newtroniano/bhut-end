import { consumeFromQueue } from '../config/queue';
import amqp from 'amqplib';
import { Log } from '../models/Log';
import axios from 'axios';

const queueName = 'car_queue';

export class CarConsumer {
  async start() {

    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });

    console.log('Waiting for messages...')

      channel.consume(queueName, async (msg) => {
        if (msg !== null) {
          const message = JSON.parse(msg.content.toString()); 
          //console.log('Received message:', message);

          try {
            
            await this.sendWebhook(message);

          
            await this.saveLog(message);

            //console.log('Message processed successfully');
          } catch (error) {
            //console.error('Error processing message:', error);
          } finally {
            channel.ack(msg); 
          }
        }
      });


    await consumeFromQueue();
  }

  private async sendWebhook(message: any) {
    try {
      const webhookUrl ="https://webhook.site/227c778a-b6a7-454e-94f0-48acf5745574"; 

      if (!webhookUrl) {
        throw new Error('WEBHOOK_URL não está definida no arquivo .env');
      }
      await axios.post(webhookUrl, {
        car_id: message.car_id,
        message: 'Novo carro cadastrado',
      });
      //console.log('Webhook enviado com sucesso');
    } catch (error) {
      //console.error('Erro ao enviar webhook:', error);
    }
  }

  private async saveLog(message: any) {
    try {
      const log = new Log({
        car_id: message.car_id, 
        data_hora_criacao: message.data_hora_criacao, 
        data_hora_processamento: new Date(), 
      });
      await log.save();
      console.log('Log salvo no MongoDB:', log);
    } catch (error) {
      console.error('Erro ao salvar log:', error);
    }
  }
}