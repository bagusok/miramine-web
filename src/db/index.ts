import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "./types";

const createDialect = () => {
  return new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }),
  });
};

// Menggunakan global variable agar instance tetap ada
let kyselyInstance: Kysely<DB> | undefined;

export const db = kyselyInstance ?? new Kysely<DB>({ dialect: createDialect() });

if (!kyselyInstance) {
  kyselyInstance = db;
}

// Untuk development, gunakan globalThis agar hot reload tidak membuat koneksi baru
if (process.env.NODE_ENV !== "production") {
  (globalThis).kysely = db;
}
