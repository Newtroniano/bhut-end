import express from 'express';
//import { carRoutes } from './routes/carRoutes';
//import { logRoutes } from './routes/logRoutes';

const app = express();

app.use(express.json());

//app.use('/api/car', carRoutes);
//app.use('/api/logs', logRoutes);

export default app;