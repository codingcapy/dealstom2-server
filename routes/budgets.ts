

import express from "express";
import { createBudget, getBudget } from "../controller";

const budgets = express.Router();

budgets.route('/').post(createBudget);
budgets.route('/:userId').get(getBudget);

export default budgets;