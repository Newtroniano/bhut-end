"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeFromQueue = exports.sendToQueue = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const queueName = 'car_queue';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const rabbitMQUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
const sendToQueue = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect('amqp://localhost:5672');
        const channel = yield connection.createChannel();
        yield channel.assertQueue(queueName, { durable: false });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        console.log(`Message sent to queue: ${JSON.stringify(message)}`);
        setTimeout(() => {
            connection.close();
        }, 500);
    }
    catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }
});
exports.sendToQueue = sendToQueue;
const consumeFromQueue = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672');
    const channel = yield connection.createChannel();
    yield channel.assertQueue(queueName, { durable: false });
    console.log('Waiting for messages...');
    channel.consume(queueName, (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            console.log(`Received message: ${JSON.stringify(message)}`);
            // Aqui você pode enviar um webhook ou salvar o log no banco de dados
            // Exemplo de envio de webhook:
            // await axios.post('https://webhook.site/your-webhook-url', message);
            channel.ack(msg);
        }
    }));
});
exports.consumeFromQueue = consumeFromQueue;
