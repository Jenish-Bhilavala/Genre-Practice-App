const request = require("supertest");
const { User } = require("../../models/user");
const { Genre } = require("../../models/genre");
const { default: mongoose } = require("mongoose");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await server.close();
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((g) => g.name === "Love")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return gernre if valid id is passed", async () => {
      const res = await request(server).get(
        "/api/genres/672a1b96613189d1399f6aea"
      );

      expect(res.status).toBe(200);
    });
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get(
        "/api/genres/672a1b96613189d1399f6aed"
      );

      expect(res.status).toBe(404);
    });
    it("should return 404 if the no genre with the given id exist", async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get("/api/genres/" + id);

      expect(res.status).toBe(404);
    });
  });

  describe("POST", () => {
    it("should return 401 if clint is not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is invalid", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: "Du" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre name is more than 50 character", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join("a");

      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name }); //if name and key is same just put key

      expect(res.status).toBe(400);
    });

    // it("should save the genre if it is valid", async () => {
    //   const token = new User().generateAuthToken();

    //   const res = await request(server)
    //     .post("/api/genres")
    //     .set("x-auth-token", token)
    //     .send({ name: "drama" });

    //   const genre = await Genre.find({ name: "drama" });
    //   expect(genre).not.toBeNull();
    // });

    // it("should return the genre if it is valid", async () => {
    //   const token = new User().generateAuthToken();

    //   const res = await request(server)
    //     .post("/api/genres")
    //     .set("x-auth-token", token)
    //     .send({ name: "drama" });

    //   expect(res.body).toHaveProperty("_id");
    //   expect(res.body).toHaveProperty("name", "drama");
    // });
  });
});
