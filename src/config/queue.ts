import amqp from 'amqplib';

const queueName = 'car_queue';

export const sendToQueue = async (message: any) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  console.log(`Message sent to queue: ${JSON.stringify(message)}`);
  setTimeout(() => {
    connection.close();
  }, 500);
};

export const consumeFromQueue = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });

  console.log('Waiting for messages...');

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      console.log(`Received message: ${JSON.stringify(message)}`);

      // Aqui você pode enviar um webhook ou salvar o log no banco de dados
      // Exemplo de envio de webhook:
      // await axios.post('https://webhook.site/your-webhook-url', message);

      channel.ack(msg);
    }
  });
};