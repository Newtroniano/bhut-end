import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  marca: { type: String, required: true },
  preco: { type: Number, required: true },
  anoFabricacao: { type: String, required: true },
});

export const Car = mongoose.model('Car', CarSchema);