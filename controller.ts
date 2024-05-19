import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool, db, users, budgets, addresses } from "./connect";
import { eq, and } from "drizzle-orm";

const saltRounds = 6

export interface IDecodedUser {
    userId: number
};

export async function validateUser(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    try {
        const queryResult = await db.select().from(users).where(eq(users.email, email));
        const user = queryResult[0];
        if (!user) return res.json({ result: { user: null, token: null } });
        bcrypt.compare(password, user.password || "", function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }
            if (result) {
                const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "14 days" });
                return res.json({ result: { user, token } });
            } else {
                return res.json({ result: { user: null, token: null } });
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

export async function decryptToken(req: Request, res: Response) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403).send("Header does not exist");
            return "";
        }
        const token = authHeader.split(" ")[1];
        const decodedUser = jwt.verify(token, "default_secret");
        //@ts-ignore
        const response = await db.select().from(users).where(eq(users.user_id, decodedUser.id));
        const user = response[0]
        res.json({ result: { user, token } });
    }
    catch (err) {
        res.status(401).json({ err });
    }
}

export async function createUser(req: Request, res: Response) {
    const { password, email } = req.body
    if (password.length > 80) {
        return res.json({ success: false, message: "password max char limit is 80" });
    }
    if (email.length > 255) {
        return res.json({ success: false, message: "email max char limit is 255" });
    }
    try {
        const usernameQuery = await db.select().from(users).where(eq(users.email, email))
        if (usernameQuery.length > 0) {
            return res.json({ success: false, message: "Username already exists" });
        };
        const emailQuery = await db.select().from(users).where(eq(users.email, email))
        if (emailQuery.length > 0) {
            return res.json({ success: false, message: "An account associated with this email already exists" });
        };
        const encrypted = await bcrypt.hash(password, saltRounds);
        const now = new Date();
        const timestamp = now.toISOString();
        await db.insert(users).values({ password: encrypted.toString(), email, created_at: timestamp });
        res.status(201).send({ success: true, message: "Sign up successful!" })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: "Error creating user" })
    }
};

export async function getUser(req: Request, res: Response) {
    try {
        const userId = req.params.userId
        //@ts-ignore
        const user = await db.select().from(users).where(eq(users.user_id, userId));
        res.status(200).json(user[0]);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error getting user" })
    }
}

export async function createBudget(req: Request, res: Response) {
    const { userId, value } = req.body
    try {
        await db.insert(budgets).values({ user_id:userId, value });
        res.status(201).send({ success: true, message: "Budget created successfully!" })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: "Error creating budget" })
    }
};

export async function getBudget(req: Request, res: Response) {
    try {
        const userId = parseInt(req.params.userId)
        const user = await db.select().from(users).where(eq(users.user_id, userId));
        //@ts-ignore
        const budget = await db.select().from(budgets).where(eq(budgets.user_id, user[0].user_id));
        res.status(200).json(budget[0]);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error getting budget" })
    }
}

export async function createAddress(req: Request, res: Response) {
    const { userId, street, city, province, postalcode } = req.body
    try {
        await db.insert(addresses).values({ user_id:userId, street, city, province, postalcode });
        res.status(201).send({ success: true, message: "Address created successfully!" })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: "Error creating address" })
    }
};