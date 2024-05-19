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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddress = exports.getBudget = exports.createBudget = exports.getUser = exports.createUser = exports.decryptToken = exports.validateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_1 = require("./connect");
const drizzle_orm_1 = require("drizzle-orm");
const saltRounds = 6;
;
function validateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        try {
            const queryResult = yield connect_1.db.select().from(connect_1.users).where((0, drizzle_orm_1.eq)(connect_1.users.email, email));
            const user = queryResult[0];
            if (!user)
                return res.json({ result: { user: null, token: null } });
            bcrypt_1.default.compare(password, user.password || "", function (err, result) {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Internal Server Error");
                }
                if (result) {
                    const token = jsonwebtoken_1.default.sign({ id: user.user_id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "14 days" });
                    return res.json({ result: { user, token } });
                }
                else {
                    return res.json({ result: { user: null, token: null } });
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    });
}
exports.validateUser = validateUser;
function decryptToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(403).send("Header does not exist");
                return "";
            }
            const token = authHeader.split(" ")[1];
            const decodedUser = jsonwebtoken_1.default.verify(token, "default_secret");
            //@ts-ignore
            const response = yield connect_1.db.select().from(connect_1.users).where((0, drizzle_orm_1.eq)(connect_1.users.user_id, decodedUser.id));
            const user = response[0];
            res.json({ result: { user, token } });
        }
        catch (err) {
            res.status(401).json({ err });
        }
    });
}
exports.decryptToken = decryptToken;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, email } = req.body;
        if (password.length > 80) {
            return res.json({ success: false, message: "password max char limit is 80" });
        }
        if (email.length > 255) {
            return res.json({ success: false, message: "email max char limit is 255" });
        }
        try {
            const usernameQuery = yield connect_1.db.select().from(connect_1.users).where((0, drizzle_orm_1.eq)(connect_1.users.email, email));
            if (usernameQuery.length > 0) {
                return res.json({ success: false, message: "Username already exists" });
            }
            ;
            const emailQuery = yield connect_1.db.select().from(connect_1.users).where((0, drizzle_orm_1.eq)(connect_1.users.email, email));
            if (emailQuery.length > 0) {
                return res.json({ success: false, message: "An account associated with this email already exists" });
            }
            ;
            const encrypted = yield bcrypt_1.default.hash(password, saltRounds);
            const now = new Date();
            const timestamp = now.toISOString();
            yield connect_1.db.insert(connect_1.users).values({ password: encrypted.toString(), email, created_at: timestamp });
            res.status(201).send({ success: true, message: "Sign up successful!" });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ success: false, message: "Error creating user" });
        }
    });
}
exports.createUser = createUser;
;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.userId;
            //@ts-ignore
            const user = yield connect_1.db.select().from(connect_1.users).where((0, drizzle_orm_1.eq)(connect_1.users.user_id, userId));
            res.status(200).json(user[0]);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Error getting user" });
        }
    });
}
exports.getUser = getUser;
function createBudget(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, value } = req.body;
        try {
            yield connect_1.db.insert(connect_1.budgets).values({ user_id: userId, value });
            res.status(201).send({ success: true, message: "Budget created successfully!" });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ success: false, message: "Error creating budget" });
        }
    });
}
exports.createBudget = createBudget;
;
function getBudget(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.userId);
            const user = yield connect_1.db.select().from(connect_1.users).where((0, drizzle_orm_1.eq)(connect_1.users.user_id, userId));
            //@ts-ignore
            const budget = yield connect_1.db.select().from(connect_1.budgets).where((0, drizzle_orm_1.eq)(connect_1.budgets.user_id, user[0].user_id));
            res.status(200).json(budget[0]);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "Error getting budget" });
        }
    });
}
exports.getBudget = getBudget;
function createAddress(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, street, city, province, postalcode } = req.body;
        try {
            yield connect_1.db.insert(connect_1.addresses).values({ user_id: userId, street, city, province, postalcode });
            res.status(201).send({ success: true, message: "Address created successfully!" });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ success: false, message: "Error creating address" });
        }
    });
}
exports.createAddress = createAddress;
;
