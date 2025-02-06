import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  car_id: { type: String, required: true },
  data_hora_criacao: { type: Date, required: true },
  data_hora_processamento: { type: Date, required: true },
});

export const Log = mongoose.model('Log', LogSchema);