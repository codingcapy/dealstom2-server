"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const users = express_1.default.Router();
users.route('/').post(controller_1.createUser);
users.route('/:userId').get(controller_1.getUser);
exports.default = users;
