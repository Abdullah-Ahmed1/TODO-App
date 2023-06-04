import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { ViewAllTodos } from "../viewAllTodos";
import { JSDOM } from "jsdom";

jest.mock("axios");

const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
describe("Tests for View All Todos component", () => {
  it('should display "No todos", if todo array is empty', async () => {
    await act(async () => {
      render(<ViewAllTodos todos={[]} />);
    });
    await waitFor(() => {
      expect(screen.getByText("No Todos")).toBeInTheDocument();
    });
  });

  it("should display todo content, if todo array is not empty", async () => {
    //   const mockResponse = {
    //     data: {
    //       tasks: ['Task 1', 'Task 2', 'Task 3'],
    //     },
    //   };
    //   axios.get.mockResolvedValue(mockResponse);

    await act(async () => {
      render(
        <ViewAllTodos
          todos={[{ task: "test1", completed: false, creationTime: "12/1/22" }]}
        />
      );
    });

    await waitFor(() => {
      const todoElement = screen.getByTestId("show-todos");
      expect(todoElement).toBeInTheDocument();
      expect(screen.getByText("test1")).toBeInTheDocument();
    });
  });
});
