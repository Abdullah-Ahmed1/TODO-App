import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import "./App.css";
import { ViewAllTodos } from "./components/viewAllTodos";
import { CreateTodo } from "./components/createTodo";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {
  const [todos, setTodos] = useState(null);
  const [openSnack,setOpenSnack] = useState(false)
  const [todo, setTodo] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleChangeTodo = (value)=>{
    setTodo(value)
  }
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  
  
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


  const handleSubmit = async () => {
    const data = {
      task: todo.trim(),
      completed: false,
      creationTime: new Date(),
    };
    try {
      setOpenBackdrop(true);
      setTodo("");
      await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/create`, data);
      setOpenSnack(true)
      await refreshTodos();
      setOpenBackdrop(false);
    } catch (err) {
      console.log(err);
    }
  };

  const refreshTodos = async(id) => {
    try{
      const result  = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/view`)
      setTodos(result.data.tasks);
      setSnackOpen(true)
    }catch(err){
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
            severity="success"
            sx={{ width: "100%" }}
          >
            Todo Created successfully
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
        <CreateTodo handleSubmit = {handleSubmit} todo = {todo} handleChangeTodo = {handleChangeTodo}  openBackdrop = {openBackdrop} />
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={5}>
        <ViewAllTodos todos={todos}  refreshTodos={refreshTodos} />
      </Grid>
    </Grid>
    </>
  );
}

export default App;
