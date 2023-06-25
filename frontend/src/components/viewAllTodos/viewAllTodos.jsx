import React from "react";
import axios from "axios";
import "./viewAllTodos.css";
import { PopUpMenu } from "./parts";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Unstable_Grid2";
import MuiCheckbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { todoService } from "../../services/todoService";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Checkbox({ icon, checkedIcon, checked, handleChange }) {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={handleChange}
          icon={icon}
          checkedIcon={checkedIcon}
          sx={{
            color: "rgba(143, 211,249,0.9)",
            "&.Mui-checked": { color: "rgba(143, 211,249,0.9)" },
          }}
        />
      }
    />
  );
}

export const ViewAllTodos = ({ todos, refreshTodos,newTodo}) => {
  const [todoTemp, setTodoTemp] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openSnackDelete, setOpenSnackDelete] = useState(false);
  const [openBackdropDelete, setOpenBackdropDelete] = useState(false);
  const [openBackdropComplete, setOpenBackdropComplete] = useState(false);
  const [deleteSeverity, setDeleteSeverity] = useState(null);
  const [msgDelete, setMsgDelete] = useState("null");

  const handleChange = (event, id) => {
    setOpenBackdropComplete(true);

    const todoComplete = todoService.completeTodo(event,id)
    todoComplete.then((res) => {
        refreshTodos();
        setOpenBackdropComplete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const handleTogglePopUp = () => {
    setOpenPopUp((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenPopUp(false);
    } else if (event.key === "Escape") {
      setOpenPopUp(false);
    }
  }
  const handleCloseSnackDelete = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackDelete(false);
  };

  function formatDateTime(date) {
    const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleDelete = (todoId) => {
    setTodoTemp(todoTemp.filter((item) => item._id !== todoId));
    setOpenBackdropDelete(true);
    const deleteTodo = todoService.deleteTodo(todoId);
    deleteTodo
      .then(() => {
        setMsgDelete("Todo Deleted Successfully");
        setDeleteSeverity("success");
        setOpenSnackDelete(true);
        setOpenPopUp(false);
        setOpenBackdropDelete(false);
      })
      .catch((err) => {
        setMsgDelete("Something went wrong");
        setDeleteSeverity("error");
        setOpenSnackDelete(true);
        setOpenBackdrop(false);
        console.log(err);
      });
  };
  useEffect(() => {
    setTodoTemp(todos && todos.reverse());
  }, [todos]);

  return (
    <>
      <Snackbar
        open={openSnackDelete}
        autoHideDuration={3000}
        onClose={handleCloseSnackDelete}
      >
        <Alert
          onClose={handleCloseSnackDelete}
          severity={deleteSeverity}
          sx={{ width: "100%" }}
        >
          {msgDelete}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdropComplete}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        className="scroller"
        elevation={3}
        sx={{
          backgroundColor: "rgba(255, 255, 255,0.7)",
          padding: "10px 20px",
          maxHeight: "320px",
          overflow: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
        }}
      >
        <Grid container flexDirection={"column"} sx={{ color: "black",margin:  0,padding : 0 }}>
          {todoTemp ? (
            todoTemp.length > 0 ? (
              todoTemp.map((item, index) => {
                return (
                  <Grid
                    data-testid="show-todos"
                    key={index}
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    sx={{ padding: "10px 0px",margin:0,backgroundColor: `${newTodo && index ==0? 'rgb(46, 125, 50,0.5)': 'transparent'}` }}
                  >
                    <Grid container alignItems={"center"}>
                      <Grid>
                        <Checkbox
                          checked={item.completed}
                          handleChange={(e) => handleChange(e, item._id)}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={
                            <CheckCircleOutlineIcon sx={{ color: "black" }} />
                          }
                        />
                      </Grid>
                      <Grid>
                        <Typography>{item.task}</Typography>
                      </Grid>
                      <Grid sx = {{marginLeft:"80px"}}>
                        <Typography>{item.completed ? `Completion Time: ${formatDateTime(new Date(item.completedTime))} `:`Creation Time: ${formatDateTime(new Date(item.creationTime))}`}</Typography>
                      </Grid>
                    </Grid>
                    <Grid>
                      <PopUpMenu
                        todoId={item._id}
                        openPopUp={openPopUp}
                        handleListKeyDown={handleListKeyDown}
                        handleClosePopUp={handleClosePopUp}
                        openBackDropDelete={openBackdropDelete}
                        handleDelete={handleDelete}
                        // openSnack={openSnack}
                        handleTogglePopUp={handleTogglePopUp}
                      />
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <h2>No Todos</h2>
            )
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Paper>
    </>
  );
};
