const verifyToken = require("./verifyToken");

require("dotenv").config();

describe("given a verifyToken ", () => {
  describe("When it receives a response with a valid token", () => {
    test("Then it should call its next method", async () => {
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hY2hpbmF6byIsImlkIjoiNjIxNjgzZGUxZjM3MDM4MDNjNWRlNTRlIiwiaWF0IjoxNjQ1NzIxNDQ2fQ.Kcwc-EcZJPEHnnGiBY00OfvYaym0_HNjS9xj7KPhiDk"
          ),
      };

      const next = jest.fn();

      await verifyToken(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a response with a invalid token", () => {
    test("Then it should call its next method", async () => {
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer ejJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hY2hpbmF6byIsImlkIjoiNjIxNjgzZGUxZjM3MDM4MDNjNWRlNTRlIiwiaWF0IjoxNjQ1NzIxNDQ2fQ.Kcwc-EcZJPEHnnGiBY00OfvYaym0_HNjS9xj7KPhiDk"
          ),
      };
      const error = new Error("invalid token");

      const next = jest.fn();

      await verifyToken(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a response with a missing token", () => {
    test("Then it should call its next method", async () => {
      const req = {
        header: jest.fn().mockReturnValue(undefined),
      };
      const error = new Error("Token missing");
      const next = jest.fn();

      await verifyToken(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
