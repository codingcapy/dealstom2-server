

import express from "express";
import { createUser, getUser } from "../controller";

const users = express.Router();

users.route('/').post(createUser);
users.route('/:userId').get(getUser)

export default users;