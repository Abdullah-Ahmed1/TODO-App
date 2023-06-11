const request = require("supertest");
const app = require("../index");
const Todo = require("../models/todo.model");

describe("testing endpoints for todo controller", () => {
  describe("testing create todo endpoint", () => {
    test("should return status code of 201, if data is provided correctly", async () => {
      const response = await request(app).post("/create").send({
        task: "testing",
        completed: false,
        creationTime: new Date(),
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("testing view all todos endpoint", () => {
    test("should return status code of 200, everytime endpoint is called", async () => {
      const response = await request(app).get("/view")
      expect(response.statusCode).toBe(200);
    });
  });
  describe("testing delete todo endpoint", () => {
    test("should return status code of 404, if taskId is not provided", async () => {
      const response = await request(app).delete(`/delete/${null}`)
      expect(response.statusCode).toBe(404);
    });
    test("should return status code of 404, if task is not found against given taskId", async () => {
        const response = await request(app).delete(`/delete/646b888366119b3106864527`)
        expect(response.statusCode).toBe(404);
      });
      
  });
});
afterAll(async() => {
  await Todo.deleteMany({})
});