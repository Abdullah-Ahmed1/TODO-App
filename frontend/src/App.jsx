import "./App.css";
import React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import MuiAlert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Unstable_Grid2";
import { CreateTodo } from "./components/createTodo";
import { ViewAllTodos } from "./components/viewAllTodos";
import { todoService } from "./services/todoService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [todos, setTodos] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [todo, setTodo] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [severityCreated, setSeverityCreated] = useState(null);
  const [msgCreated, setMsgCreated] = useState("");

  const handleChangeTodo = (value) => {
    setTodo(value);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    const todos = todoService.getTodo();
    todos.then((data) => {
      setTodos(data);
    });
  }, []);

  const handleSubmit = async () => {
    const data = {
      task: todo.trim(),
      completed: false,
      creationTime: new Date(),
    };

    setOpenBackdrop(true);
    setTodo("");

    const createTodo = todoService.createTodo(data);
    createTodo
      .then(async () => {
        setMsgCreated("Todo Created successfully");
        setSeverityCreated("success");
        setOpenSnack(true);
        await refreshTodos();
        setOpenBackdrop(false);
      })
      .catch(() => {
        setMsgCreated("Something went wrong");
        setSeverityCreated("error");
        console.log(err);
      });
  };

  const refreshTodos = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/view`
      );
      setTodos(result.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={severityCreated}
          sx={{ width: "100%" }}
        >
          {msgCreated}
        </Alert>
      </Snackbar>
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
          <CreateTodo
            handleSubmit={handleSubmit}
            todo={todo}
            handleChangeTodo={handleChangeTodo}
            openBackdrop={openBackdrop}
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={5}>
          <ViewAllTodos todos={todos} refreshTodos={refreshTodos} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
