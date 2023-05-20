import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function Checkbox({ label, icon, checkedIcon }) {
  return (
    <FormControlLabel
      label={label}
      control={
        <MuiCheckbox defaultChecked icon={icon} checkedIcon={checkedIcon} />
      }
    />
  );
}

const ViewAllTodos = () => {
  return (
    <>
      <Paper elevation={3}  sx={{ width: "40%", backgroundColor:'rgba(255, 255, 255,0.7)',padding:"10px 20px"}}>
        <Grid container flexDirection={'column'} sx = {{color:"black"}}>
          <Grid container  justifyContent={'space-between'} alignItems={'center'} sx ={{padding:"10px 0px"}} >
            <Grid container   alignItems={'center'}>
            <Grid>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon />}
            />
            </Grid>
            <Grid>
              <h3>Running</h3>
            </Grid>
            </Grid>
            <Grid>
              <DragIndicatorIcon/>
            </Grid>
          </Grid>
          <Grid container  justifyContent={'space-between'} alignItems={'center'} sx ={{padding:"10px 0px"}} >
            <Grid container   alignItems={'center'}>
            <Grid>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon />}
            />
            </Grid>
            <Grid>
              <h3 style={{color:"black"}}>Running</h3>
            </Grid>
            </Grid>
            <Grid>
              <DragIndicatorIcon/>
            </Grid>
          </Grid>
          
        </Grid>
      </Paper>
    </>
  );
};

export default ViewAllTodos;
