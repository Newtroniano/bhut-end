import { Log } from '../models/Log';

export class LogService {
  async getLogs() {
    const logs = await Log.find();
    return logs;
  }
}