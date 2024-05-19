"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const user = express_1.default.Router();
user.route('/login').post(controller_1.validateUser);
user.route('/validation').post(controller_1.decryptToken);
exports.default = user;
