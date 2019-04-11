const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  describe("GET /characters", () => {
    it("should return status code 200", () => {
      return request(server)
        .get("/characters")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON", () => {
      return request(server)
        .get("/characters")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("should return return list of characters", () => {
      const expected = [
        {
          id: 1,
          name: "Jon Snow"
        },
        {
          id: 2,
          name: "Arya Stark"
        },
        {
          id: 3,
          name: "Brandon Stark"
        }
      ];

      return request(server)
        .get("/characters")
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });
});
