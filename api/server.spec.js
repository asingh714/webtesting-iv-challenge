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
          name: "development"
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

  describe("POST /characters", () => {
    it("should return status code 201", async () => {
      let character = { name: "Daenerys Targaryen" }
      let response = await request(server).post("/characters").send(character)

      expect(response.status).toBe(201)
    });

    it.only("should return id when character is added", async () => {
      let character = { name: "Brandon Stark" }

      let response = await request(server).post("/characters").send(character)

      expect(response.body.id).not.toEqual(null);
    })
  });



});
