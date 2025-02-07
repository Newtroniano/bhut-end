"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const express_1 = __importDefault(require("express"));
const carController_1 = require("../controllers/carController");
const router = express_1.default.Router();
exports.carRoutes = router;
const carController = new carController_1.CarController();
router.get('/', carController.getCars);
router.post('/', carController.createCar);
