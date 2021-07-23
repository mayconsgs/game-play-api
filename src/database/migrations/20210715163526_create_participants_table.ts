import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("participants", (table) => {
    table.uuid("eventId").notNullable();
    table.string("idUser").notNullable();
    table
      .foreign("eventId")
      .references("id")
      .inTable("event")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("participants");
}
