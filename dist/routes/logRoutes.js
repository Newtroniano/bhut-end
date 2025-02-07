"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoutes = void 0;
const express_1 = __importDefault(require("express"));
const logController_1 = require("../controllers/logController");
const router = express_1.default.Router();
exports.logRoutes = router;
const logController = new logController_1.LogController();
router.get('/', logController.getLogs);
