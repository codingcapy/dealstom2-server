"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addresses = exports.budgets = exports.users = exports.db = exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_core_1 = require("drizzle-orm/pg-core");
const Pool = pg_1.default.Pool;
const connectionString = "postgresql://postgres:FZAQbUAhWeQSwGwPQdmZVysSyemXkBjP@roundhouse.proxy.rlwy.net:59944/railway";
exports.pool = new Pool({
    connectionString
});
exports.db = (0, node_postgres_1.drizzle)(exports.pool);
exports.users = (0, pg_core_1.pgTable)('users', {
    user_id: (0, pg_core_1.serial)('user_id').primaryKey(),
    password: (0, pg_core_1.varchar)('password', { length: 80 }),
    email: (0, pg_core_1.varchar)('email', { length: 255 }),
    created_at: (0, pg_core_1.varchar)('created_at'),
    active: (0, pg_core_1.boolean)('active').default(true)
});
exports.budgets = (0, pg_core_1.pgTable)('budgets', {
    budget_id: (0, pg_core_1.serial)('budget_id').primaryKey(),
    user_id: (0, pg_core_1.varchar)('user_id', { length: 80 }),
    value: (0, pg_core_1.varchar)('value', { length: 255 }),
    created_at: (0, pg_core_1.varchar)('created_at')
});
exports.addresses = (0, pg_core_1.pgTable)('addresses', {
    address_id: (0, pg_core_1.serial)('address_id').primaryKey(),
    user_id: (0, pg_core_1.varchar)('user_id', { length: 80 }),
    street: (0, pg_core_1.varchar)('street', { length: 80 }),
    city: (0, pg_core_1.varchar)('city', { length: 80 }),
    province: (0, pg_core_1.varchar)('province', { length: 255 }),
    postalcode: (0, pg_core_1.varchar)('postalcode')
});
