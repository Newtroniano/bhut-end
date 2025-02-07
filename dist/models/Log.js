"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LogSchema = new mongoose_1.default.Schema({
    car_id: { type: String, required: true },
    data_hora_criacao: { type: Date, required: true },
    data_hora_processamento: { type: Date, required: true },
});
exports.Log = mongoose_1.default.model('Log', LogSchema);
