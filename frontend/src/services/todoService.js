import axios from "axios";
import {config} from '../../config'
export const todoService = {
  getTodo: async () => {
    try {    
      const todos = await axios.get(
        `${config.baseUrl}/view`
      );
      return todos.data.tasks;
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (data) => {
    try {
      await axios.post(
        `${config.baseUrl}/create`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  },
  completeTodo: async (event, id) => {
    try {
      return await axios.put(
        `${config.baseUrl}/complete/${id}`,
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
