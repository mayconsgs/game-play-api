import faker from "faker";
import supertest from "supertest";
import { v4 as uuid } from "uuid";
import app from "../../src/app";

const request = supertest(app);

describe("POST /events", () => {
  const testEventId = "c8fbfaf9-4971-4a35-a21e-b9d87780e342";

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
      .post("/events")
      .send(event)
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty("eventId");
      })
      .end(done);
  });

  it("Deveria criar um evento com um multiplos participante e retornar seu id", (done) => {
    const participants: string[] = [];

    for (let i = 0; i < 5; i++) {
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
      .post("/events")
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

    request.post("/events").send(event).expect(422).end(done);
  });

  describe("/:eventId/add", () => {
    it("Deveria adicionar um participante a um evento", (done) => {
      const idUser = faker.git.commitSha();

      request
        .post(`/events/${testEventId}/add`)
        .send({ idUser })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty("idUser");
        })
        .end(done);
    });

    it("Deveria falhar na adição de participante", (done) => {
      const idUser = faker.git.commitSha();

      request
        .post(`/events/${uuid()}/add`)
        .send({ idUser })
        .expect(409)
        .end(done);
    });

    it("Deveria falhar na validação de schemas", (done) => {
      const idUser = Math.floor(Math.random() * 10000);

      request
        .post(`/events/${testEventId}/add`)
        .send({ idUser })
        .expect(422)
        .end(done);
    });

    it("Deveria dar que a rota de adição de participante não foi encontrada", (done) => {
      const idUser = Math.floor(Math.random() * 10000);

      request
        .post(`/events/asdasdasdasdasdasd/add`)
        .send({ idUser })
        .expect(404)
        .end(done);
    });
  });

  afterAll(() => {});
});
