import faker from "faker";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("event").delete();

  // Inserts seed entries
  await knex("event").insert([
    {
      id: "c8fbfaf9-4971-4a35-a21e-b9d87780e342",
      idGuild: faker.git.commitSha(),
      idOwner: faker.git.commitSha(),
      schedule: new Date(),
      category: "ranked",
      description: faker.lorem.words(10),
    },
  ]);
}
