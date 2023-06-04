// import { render, screen, waitFor, act } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { CreateTodo } from "../createTodo";
// import { JSDOM } from "jsdom";

// jest.mock("axios");
// const dom = new JSDOM("<!doctype html><html><body></body></html>");
// global.document = dom.window.document;
// describe("Tests for create todo component", () => {
 
//   test("check if CreateTodo render accordion", async () => {
//     await act(async () => {
//       render(
//         <CreateTodo/>
//       );
//     });
//     await waitFor(() => {
//       const todoElement = screen.getByTestId("accordion");
//       expect(todoElement).toBeInTheDocument();
//     });
//   });
// });
