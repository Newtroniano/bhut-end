import { Request, Response } from 'express';
import { LogService } from '../services/LogService';

export class LogController {
  private logService: LogService;

  constructor() {
    this.logService = new LogService();
    this.getLogs = this.getLogs.bind(this);
  }

  async getLogs(req: Request, res: Response) {
    const logs = await this.logService.getLogs();
    res.json(logs);
  }
}