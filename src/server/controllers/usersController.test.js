const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");
const { login, registerUser } = require("./usersController");

jest.mock("../../database/models/User");
jest.mock("bcrypt");

describe("Given a Login function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then if the user doesnt exist it should throw an error with the code 404 and the message 'sorry, you are not invited to the party'", async () => {
      const req = {
        body: { username: "machinazo", password: "123" },
      };

      const next = jest.fn();
      const error = new Error("Username or password are wrong");

      User.find = jest.fn().mockRejectedValue(null);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
    test("Then if the user exists but the password isnt right it should return the error 'You are not who you say you are'", async () => {
      const req = {
        body: { username: "machinazo", password: "123" },
      };
      const user = req.body;

      const error = new Error("Username or password are wrong");

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(user);

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
    test("Then if the user exists and the password is right it should call the json method with the token ", async () => {
      const req = {
        body: { username: "machinazo", password: "123" },
      };
      const res = {
        json: jest.fn(),
      };
      const token = "I'm a token";
      const user = req.body;

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(user);

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jsonwebtoken.sign = jest.fn().mockReturnValue(token);

      await login(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
});

describe("Given a registerUSer middleware", () => {
  describe("When it recieves a request with an existing username", () => {
    test("Then it should call the next method with the error 'Sorry, username alredy taken'", async () => {
      const req = {
        body: { username: "machinazo", password: "123", name: "alejandro" },
      };
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);

      const error = new Error("Sorry, username alredy taken");

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it recieves a request with an non existent username", () => {
    test("Then it should call the json method of the response with the created user", async () => {
      const req = {
        body: { username: "machinazo", password: "123", name: "alejandro" },
      };

      const user = req.body;
      const res = {
        json: jest.fn(),
      };
      User.findOne = jest.fn().mockResolvedValue(false);

      User.create = jest.fn().mockResolvedValue(user);

      await registerUser(req, res);

      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
});
