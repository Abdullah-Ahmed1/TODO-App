import React from "react";
import './viewAllTodos.css'
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {PopUpMenu} from "./parts";
import Typography from '@mui/material/Typography';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

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

export const ViewAllTodos = ({ todos, refreshTodos,snackOpen }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleChange = (event, id) => {
    setOpenBackdrop(true);
    axios
      .put(`${import.meta.env.VITE_REACT_APP_BASE_URL}/complete/${id}`, {
        completed: event.target.checked,
      })
      .then((res) => {
        refreshTodos();
        setOpenBackdrop(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
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
          overflow: 'auto',
          overflowX: "hidden",
          scrollbarWidth: 'thin',

          
        }}
      >
        <Grid container flexDirection={"column"} sx={{ color: "black" }}>
          {todos ? (
            todos.length > 0 ? (
              todos.map((item, index) => {
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
                        <Typography> 
                        {item.task}
                        </Typography>
                       </Grid>
                    </Grid>
                    <Grid>
                      <PopUpMenu todoId={item._id} refreshTodos={refreshTodos} snackOpen ={snackOpen} />
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
