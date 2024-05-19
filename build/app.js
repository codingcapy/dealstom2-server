"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const user_1 = __importDefault(require("./routes/user"));
const budgets_1 = __importDefault(require("./routes/budgets"));
const addresses_1 = __importDefault(require("./routes/addresses"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3333;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => res.send("welcome"));
app.use("/api/users", users_1.default);
app.use("/api/user", user_1.default);
app.use("/api/budgets", budgets_1.default);
app.use("/api/addresses", addresses_1.default);
app.listen(port, () => console.log(`Server listening on port: ${port}`));