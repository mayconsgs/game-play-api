import { Knex } from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();

    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("users");
}
