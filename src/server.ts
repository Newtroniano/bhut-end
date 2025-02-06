import express from 'express';
import connectDB from './config/db';

//import { carRoutes } from './routes/carRoutes';
//import { logRoutes } from './routes/logRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//app.use('/api/car', carRoutes);
//app.use('/api/logs', logRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();