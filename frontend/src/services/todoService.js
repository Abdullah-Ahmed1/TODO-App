import axios from "axios";
export const todoService = {
  getTodo: async () => {
    try {
      const todos = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/view`
      );
      return todos.data.tasks;
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/create`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  },
  completeTodo: async (event, id) => {
    try {
      return await axios.put(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/complete/${id}`,
        {
          completed: event.target.checked,
        }
      );
    } catch (err) {
      return err;
    }
  },
  deleteTodo: async (id) => {
    try {
      return await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/delete/${id}`
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
