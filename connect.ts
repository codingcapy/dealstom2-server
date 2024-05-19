






import pg from "pg"
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text, varchar, date, boolean, timestamp, integer } from "drizzle-orm/pg-core";

const Pool = pg.Pool

const connectionString = "postgresql://postgres:FZAQbUAhWeQSwGwPQdmZVysSyemXkBjP@roundhouse.proxy.rlwy.net:59944/railway"

export const pool = new Pool(
    {
        connectionString
    }
);

export const db = drizzle(pool);

export const users = pgTable('users', {
    user_id: serial('user_id').primaryKey(),
    password: varchar('password', { length: 80 }),
    email: varchar('email', { length: 255 }),
    created_at: varchar('created_at'),
    active: boolean('active').default(true)
})

export const budgets = pgTable('budgets', {
    budget_id: serial('budget_id').primaryKey(),
    user_id: varchar('user_id', { length: 80 }),
    value: varchar('value', { length: 255 }),
    created_at: varchar('created_at')
})

export const addresses = pgTable('addresses', {
    address_id: serial('address_id').primaryKey(),
    user_id: varchar('user_id', { length: 80 }),
    street: varchar('street', { length: 80 }),
    city: varchar('city', { length: 80 }),
    province: varchar('province', { length: 255 }),
    postalcode: varchar('postalcode')
})