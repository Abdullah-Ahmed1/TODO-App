import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PopUpMenu from "./parts/popUpMenu";

function Checkbox({ icon, checkedIcon }) {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          defaultChecked
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

export const ViewAllTodos = ({ todos }) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "rgba(255, 255, 255,0.7)",
          padding: "10px 20px",
        }}
      >
        <Grid container flexDirection={"column"} sx={{ color: "black" }}>
          {todos.map((item) => {
            return (
              <Grid
                key={item._id}
                container
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ padding: "10px 0px" }}
              >
                <Grid container alignItems={"center"}>
                  <Grid>
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={
                        <CheckCircleOutlineIcon sx={{ color: "black" }} />
                      }
                    />
                  </Grid>
                  <Grid>
                    <h3>{item.task}</h3>
                    
                  </Grid>
                </Grid>
                <Grid>
                  {/* <DragIndicatorIcon/> */}
                  <PopUpMenu />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};
