import faker from "faker";
import supertest from "supertest";
import app from "../../src/app";

describe("GET /events", () => {
  const request = supertest(app);
  const idUser = "85693a2e52cf3da80c2d97fdae6d95ab";
  const eventId = "c8fbfaf9-4971-4a35-a21e-b9d87780e342";
  const idGuild = "e45eac5bef762947db7970a1855256e34ee89523";

  it("Deveria trazer os eventos do usuário que tem varias guildas", (done) => {
    request
      .get("/events")
      .query({ idUser, guilds: [idGuild, faker.git.commitSha()] })
      .expect(200)
      .expect((response) => {
        const eventsList = response.body as [];

        for (const event of eventsList) {
          expect(event).toHaveProperty("idGuild");
        }
      })
      .end(done);
  });

  it("Deveria trazer os eventos do usuário que só tem uma guilda", (done) => {
    request
      .get("/events")
      .query({ idUser, guilds: [idGuild] })
      .expect(200)
      .expect((response) => {
        const eventsList = response.body as [];

        for (const event of eventsList) {
          expect(event).toHaveProperty("idGuild");
        }
      })
      .end(done);
  });

  it("Deveria falhar na validação de dados", (done) => {
    request
      .get("/events")
      .query({ idUser: "", guilds: 12345 })
      .expect(422)
      .end(done);
  });

  describe("/:eventId/participants", () => {
    it("Deveria retornar os participantes de um evento", (done) => {
      request
        .get(`/events/${eventId}/participants`)
        .expect(200)
        .expect((response) => {
          const participantsList = response.body as [];

          for (const participants of participantsList) {
            expect(participants).toHaveProperty("idUser");
          }
        })
        .end(done);
    });

    it("Deveria falhar retornando erro 404 ao tentar buscar os participantes de um evento", (done) => {
      request
        .get(`/events/${"invalidEvent"}/participants`)
        .expect(404)
        .end(done);
    });
  });
});
