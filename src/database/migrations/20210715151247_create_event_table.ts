import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("event", (table) => {
    table.uuid("id").primary();
    table.string("idGuild").notNullable();
    table.string("idOwner").notNullable();
    table.dateTime("schedule").notNullable();
    table.enum("category", ["ranked", "joke", "duel"]).notNullable();
    table.string("description", 100).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("event");
}
