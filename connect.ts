import pg from "pg"
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text, varchar, date, boolean, timestamp, integer } from "drizzle-orm/pg-core";

const Pool = pg.Pool
export const pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        database: "dealstormdb",
        password: "test",
        port: 5432
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