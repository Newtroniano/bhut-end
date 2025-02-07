"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CarSchema = new mongoose_1.default.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    ano: { type: Number, required: true },
    cor: { type: String, required: true },
});
exports.Car = mongoose_1.default.model('Car', CarSchema);
