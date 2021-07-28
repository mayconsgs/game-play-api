import faker from "faker";
import { Knex } from "knex";
import { v4 as uuid } from "uuid";

interface ParticipantsProps {
  eventId: string;
  idUser: string;
}

export async function seed(knex: Knex): Promise<void> {
  const events = [
    {
      id: "c8fbfaf9-4971-4a35-a21e-b9d87780e342",
      idGuild: "e45eac5bef762947db7970a1855256e34ee89523",
      idOwner: faker.git.commitSha(),
      schedule: new Date(faker.date.future()),
      category: "ranked",
      description: faker.lorem.words(10),
    },
  ];

  const participants: ParticipantsProps[] = [];

  for (let i = 0; i < 3; i++) {
    events.push({
      id: uuid(),
      idGuild: faker.git.commitSha(),
      idOwner: faker.git.commitSha(),
      schedule: new Date(faker.date.future()),
      category: "ranked",
      description: faker.lorem.words(10),
    });
  }

  events.forEach(({ id: eventId }) => {
    participants.push({ eventId, idUser: "85693a2e52cf3da80c2d97fdae6d95ab" });

    for (let i = 0; i < Math.floor(Math.random() * 25); i++) {
      participants.push({ eventId, idUser: faker.git.commitSha() });
    }
  });

  await knex("event").insert(events);

  await knex("participants").insert(participants);
}
