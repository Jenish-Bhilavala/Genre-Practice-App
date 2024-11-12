const { User } = require("../../models/user");
const request = require("supertest");

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await server.close();
  });

  let token;

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "Dummy" });

    expect(res.status).toBe(401);
  });

  //   it("should return 200 if provided token is valid", async () => {
  //     token = new User().generateAuthToken();
  //     const res = await request(server)
  //       .post("/api/genres")
  //       .set("x-auth-token", token)
  //       .send({ name: "Dummy" });

  //     expect(res.status).toBe(201);
  //   });
});
