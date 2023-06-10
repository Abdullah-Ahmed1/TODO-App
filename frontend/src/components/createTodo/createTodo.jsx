import React from "react";
import { InputAccordion } from "./parts";

export const CreateTodo = ({
  todo,
  refreshTodos,
  handleSubmit,
  openBackdrop,
  handleChangeTodo,
}) => {
  return (
    <>
      <InputAccordion
        todo={todo}
        data-testid="accordion"
        refreshTodos={refreshTodos}
        handleSubmit={handleSubmit}
        openBackdrop={openBackdrop}
        handleChangeTodo={handleChangeTodo}
      />
    </>
  );
};
