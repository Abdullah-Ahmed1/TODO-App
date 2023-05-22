const request = require("supertest");
const app = require("../index");
const { createTodo, getAllTodos } = require("../dao/todoDao");
jest.mock("../dao/todoDao");
describe("testing endpoints for todo controller", () => {
  describe("testing create todo endpoint", () => {
    test("should return status code of 201, if data is provided correctly", async () => {
      createTodo.mockImplementationOnce(() => {
        return null;
      });
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
      getAllTodos.mockImplementationOnce(() => {
        return {
          task: "testing",
          completed: false,
          creationTime: new Date(),
        };
      });
      const response = await request(app).get("/view").send({
        task: "testing",
        completed: false,
        creationTime: new Date(),
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
