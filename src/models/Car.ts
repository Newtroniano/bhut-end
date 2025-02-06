import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  ano: { type: Number, required: true },
  cor: { type: String, required: true },
});

export const Car = mongoose.model('Car', CarSchema);