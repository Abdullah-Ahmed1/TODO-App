import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "./App.css";
import { ViewAllTodos } from "./components/viewAllTodos";
import { CreateTodo } from "./components/createTodo";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/view")
      .then((res) => {
        console.log(res.data.tasks);
        setTodos(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refreshTodos = () => {
    console.log("reaachedddddddd-------!!!>");
    axios
      .get("http://localhost:5000/view")
      .then((res) => {
        console.log(res.data.tasks);
        setTodos(res.data.tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid
      container
      flexDirection={"column"}
      sx={{ height: "97vh" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid sx={{ marginBottom: "10px" }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Grid>
      <Grid sx={{ width: "500px", marginBottom: "10px" }}>
        <CreateTodo refreshTodos={refreshTodos} />
      </Grid>
      <Grid sx={{ width: "500px" }}>
        <ViewAllTodos todos={todos} refreshTodos={refreshTodos} />
      </Grid>
    </Grid>
  );
}

export default App;
