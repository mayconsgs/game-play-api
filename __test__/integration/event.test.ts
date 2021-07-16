import faker from "faker";
import supertest from "supertest";
import app from "../../src/app";

const request = supertest(app);

describe("POST /event", () => {
  it("Deveria criar um evento com um unico participante e retornar seu id", (done) => {
    const participants = [faker.git.commitSha()];

    const event = {
      idGuild: faker.git.commitSha(),
      idOwner: faker.git.commitSha(),
      schedule: faker.date.future(),
      category: "ranked",
      description: faker.lorem.text().substr(0, 99),
      participants,
    };

    request
      .post("/event")
      .send(event)
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty("eventId");
      })
      .end(done);
  });

  it("Deveria criar um evento com um multiplos participante e retornar seu id", (done) => {
    const participants: string[] = [];

    for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
      participants.push(faker.git.commitSha());
    }

    const event = {
      idGuild: faker.git.commitSha(),
      idOwner: faker.git.commitSha(),
      schedule: faker.date.future(),
      category: "ranked",
      description: faker.lorem.text().substr(0, 99),
      participants,
    };

    request
      .post("/event")
      .send(event)
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty("eventId");
      })
      .end(done);
  });

  it("Deveria falhar na validação de schemas", (done) => {
    const participants = [];

    const event = {
      idGuild: faker.git.commitSha(),
      idOwner: faker.git.commitSha(),
      schedule: faker.date.future(),
      category: "aaadas",
      description: faker.lorem.text().substr(0, 99),
      participants,
    };

    request.post("/event").send(event).expect(422).end(done);
  });

  // it("Deveria adicionar um participante a um evento", (done) => {
  //   const idUser = faker.git.commitSha();

  //   request.post(`/event/${1}/add`).send({ idUser }).expect(201).end(done);
  // });
});
