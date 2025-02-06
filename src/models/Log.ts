import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
    car_id: { type: String, required: true },
    data_hora_criacao: { type: String, required: true },
    data_hora_processamento: { type: String, required: true }
});

export default mongoose.model('Log', LogSchema);