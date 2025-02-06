// src/index.ts
import mongoose from 'mongoose';
import express from 'express';
import { getCars, createCar } from './consumers/carConsumer';
import { getLogs } from './controllers/logController';
import { startCarConsumer } from './consumers/carConsumer';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/bhut', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(express.json());

app.get('/api/car', getCars);
app.post('/api/car', createCar);
app.get('/api/logs', getLogs);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    startCarConsumer();
});