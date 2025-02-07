"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const CarService_1 = require("../services/CarService");
class CarController {
    constructor() {
        this.carService = new CarService_1.CarService();
    }
    getCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield this.carService.getCars();
            res.json(cars);
        });
    }
    createCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield this.carService.createCar(req.body);
            res.status(201).json(car);
        });
    }
}
exports.CarController = CarController;
