

import express from "express";
import { createBudget, getBudget } from "../controller";

const addresses = express.Router();

addresses.route('/').post(createBudget);
addresses.route('/:userId').get(getBudget);

export default addresses;