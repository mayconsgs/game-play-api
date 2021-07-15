import faker from "faker";
import supertest from "supertest";
import app from "../../src/app";

const request = supertest(app);

describe("POST /event", () => {
  it("Deveria criar um evento e retornar seu id", (done) => {
    request
      .post("/event")
      .send({
        idGuild: faker.git.commitSha(),
        idOwner: faker.git.commitSha(),
        schedule: faker.date.future(),
        category: "ranked",
        description: faker.lorem.text(),
      })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty("id");
      })
      .end(done);
  });
});
