const User = require("../../database/models/User");
const adminValidation = require("./adminValidation");

describe("Given a adminValidation middleware", () => {
  describe("When it receives a request of an username that is not admin", () => {
    test("Then it should call its next method with an error Sorry, you don't have privilegies to do this ", async () => {
      const req = {
        id: "hola",
      };
      const next = jest.fn();
      const error = new Error("Sorry, you don't have privilegies to do this");
      User.findById = jest.fn().mockResolvedValue({ admin: undefined });

      await adminValidation(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request of an username that is admin", () => {
    test("Then it should call its next method", async () => {
      const req = {
        id: "admin",
      };
      const next = jest.fn();
      User.findById = jest.fn().mockResolvedValue({ admin: true });

      await adminValidation(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
