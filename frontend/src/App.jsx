import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "./App.css";
import { ViewAllTodos } from "./components/viewAllTodos";
import { CreateTodo } from "./components/createTodo";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState(null);
  const [snackOpen,setSnackOpen] = useState(false)
  
  useEffect(() => {
    // refreshTodos()

    axios
    .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/view`)
    .then((res) => {
      setTodos(res.data.tasks);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const refreshTodos = async(id) => {
    //  return  setTodos(todos.filter((item)=>item._id !== id))
    try{
      const result  = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/view`)
      setTodos(result.data.tasks);
      setSnackOpen(true)
    }catch(err){
      console.log(err);
    }
    // axios
    //   .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/view`)
    //   .then((res) => {
    //     setTodos(res.data.tasks);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <Grid
      container
      data-testid="todo-home"
      flexDirection={"column"}
      sx={{ height: { xs: "118vh", lg: "97vh" } }}
      alignItems={"center"}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ marginBottom: "10px", marginTop: "100px" }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 56, height: 56, backgroundColor: "green" }}
        />
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={5} sx={{ marginBottom: "10px" }}>
        <CreateTodo refreshTodos={refreshTodos} />
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={5}>
        <ViewAllTodos todos={todos} snackOpen = {snackOpen} refreshTodos={refreshTodos} />
      </Grid>
    </Grid>
  );
}

export default App;
