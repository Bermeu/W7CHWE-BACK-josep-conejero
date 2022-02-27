require("dotenv").config();

const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");

const connectToDataBase = require("../../database");
const User = require("../../database/models/User");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
  await User.create({
    name: "alejandro",
    username: "machinazo",
    password: "$2b$10$tqqi/uVD3T0TSHf7op08ie.e5uwaLqw9BsOUJpiAjh58l141M/44W",
    admin: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given /login/ endpoint", () => {
  describe("When it receives a POST request and a wrong user", () => {
    test("then it should response with a error and the status code 404 ", async () => {
      const user = { username: "wrong" };
      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(404);

      expect(body).toHaveProperty("error");
    });
  });
  describe("When it receives a POST request with the right user and a wrong password", () => {
    test("then it should response with a error and the status code 403 ", async () => {
      const user = { username: "machinazo", password: "contrasena1233" };

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(403);

      expect(body).toHaveProperty("error");
    });
  });
  describe("When it receives a POST request with the right user and a right password", () => {
    test("then it should response status 200 and a token ", async () => {
      const user = { username: "machinazo", password: "contrasena1234" };

      const { body } = await request(app)
        .post("/users/login")
        .send(user)
        .expect(200);

      expect(body).toHaveProperty("token");
    });
  });
});
