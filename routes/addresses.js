"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const addresses = express_1.default.Router();
addresses.route('/').post(controller_1.createBudget);
addresses.route('/:userId').get(controller_1.getBudget);
exports.default = addresses;
