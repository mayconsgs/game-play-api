import faker from "faker";
import supertest from "supertest";
import app from "../../src/app";

const request = supertest(app);

describe("POST /user", () => {
  it("Deveria criar usuário e retornar token de autenticação com status 201", (done) => {
    request
      .post("/user")
      .send({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty("token");
      })
      .end(done);
  });
});
