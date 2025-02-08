import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const queueName = 'car_queue';
const rabbitMQUrl = process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'; 

export const sendToQueue = async (message: any) => {
  try {
    const connection = await amqp.connect(rabbitMQUrl); 
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to queue: ${JSON.stringify(message)}`);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
  }
};

export const consumeFromQueue = async () => {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });

    console.log('Waiting for messages...');

    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Received message: ${JSON.stringify(message)}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Failed to consume messages:', error);
  }
};
