import { consumeFromQueue } from '../config/queue';

export class CarConsumer {
  async start() {
    await consumeFromQueue();
  }
}