import React from "react";
import "./viewAllTodos.css";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { PopUpMenu } from "./parts";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
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

export const ViewAllTodos = ({ todos, refreshTodos }) => {
  console.log("todo is  : ", todos);
  const [openBackdropComplete, setOpenBackdropComplete] = useState(false);
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [todoTemp, setTodoTemp] = useState(null);

  const [openBackdropDelete, setOpenBackdropDelete] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const handleChange = (event, id) => {
    setOpenBackdropComplete(true);
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BASE_URL}/complete/${id}`, {
        completed: event.target.checked,
      })
      .then((res) => {
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
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleDelete = (todoId) => {
    setTodoTemp(todoTemp.filter(item=> item._id !== todoId))
    console.log("reached-----");

    setOpenBackdropDelete(true);
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}/delete/${todoId}`)
      .then(async () => {
         setOpenSnack(true);
        // refreshTodos(todoId);
        setOpenPopUp(false);
        setOpenBackdropDelete(false);
      })
      .catch((err) => {
        setOpenBackdrop(false);
        console.log(err);
      });
  };
  useEffect(() => {
    setTodoTemp(todos);
  }, [todos]);

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
            This is a success message!
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
        <Grid container flexDirection={"column"} sx={{ color: "black" }}>
          {console.log("///-///-", todoTemp)}
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
                    sx={{ padding: "10px 0px" }}
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
                    </Grid>
                    <Grid>
                      <PopUpMenu
                        todoId={item._id}
                        openPopUp={openPopUp}
                        handleListKeyDown={handleListKeyDown}
                        handleClosePopUp={handleClosePopUp}
                        openBackDropDelete={openBackdropDelete}
                        handleDelete={handleDelete}
                        openSnack={openSnack}
                        handleTogglePopUp = {handleTogglePopUp}
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
