// src/controllers/logController.ts
import { Request, Response } from 'express';
import Log from '../models/Log';

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};