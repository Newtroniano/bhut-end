"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const CarConsumer_1 = require("./consumers/CarConsumer");
const carRoutes_1 = require("./routes/carRoutes");
const logRoutes_1 = require("./routes/logRoutes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api/car', carRoutes_1.carRoutes);
app.use('/api/logs', logRoutes_1.logRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const carConsumer = new CarConsumer_1.CarConsumer();
carConsumer.start();
(0, db_1.default)();
