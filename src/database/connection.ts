import knex from "knex";

const database = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    filename: "./src/database/db.sqlite",
  },
  migrations: {
    directory: "./src/database/migrations",
  },
  seeds: {
    directory: "./src/database/seeds",
  },
  useNullAsDefault: process.env.NODE_ENV != "test",
});

export default database;
