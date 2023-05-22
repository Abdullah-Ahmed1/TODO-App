const request = require("supertest");
const app = require("../index");
const { createTodo, getAllTodos,removeTodo,searchTodo } = require("../dao/todoDao");
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
      const response = await request(app).get("/view")
      expect(response.statusCode).toBe(200);
    });
  });
  describe("testing delete todo endpoint", () => {
    test("should return status code of 400, if taskId is not provided", async () => {
      getAllTodos.mockImplementationOnce(() => {
        return {
          task: "testing",
          completed: false,
          creationTime: new Date(),
        };
      });
      const response = await request(app).delete(`/delete/${null}`)
      expect(response.statusCode).toBe(400);
    });
    test("should return status code of 400, if task is not found against given taskId", async () => {
        searchTodo.mockImplementationOnce(() => {
          return null
        });
        const response = await request(app).delete(`/delete/646b888366119b3106864527`)
        expect(response.statusCode).toBe(400);
      });
      
      test("should return status code of 200, if task is found against given taskId", async () => {
        searchTodo.mockImplementationOnce(() => {
          return {
            task: "testing",
            completed: false,
            creationTime: new Date(),
          }
        });
        const response = await request(app).delete(`/delete/646b888366119b3106864527`)
        expect(response.statusCode).toBe(200);
      });
      
  });
});
