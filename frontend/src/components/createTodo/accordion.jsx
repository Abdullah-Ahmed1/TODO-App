import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
export function InputAccordion({ refreshTodos }) {
  const [todo, setTodo] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleSubmit = async () => {
    const data = {
      task: todo.trim(),
      completed: false,
      creationTime: new Date(),
    };
    try {
      setOpenBackdrop(true);
      setTodo("");
      await axios.post("http://localhost:5000/create", data);
      refreshTodos();
      setOpenBackdrop(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Accordion sx={{ backgroundColor: "rgba(255, 255, 255,0.3)" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container>
            <MenuIcon sx={{ marginRight: "15px" }} />
            <Typography>Todo Today</Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent={"space-between"}>
            <Grid sx={{ width: "80%" }}>
              <TextField
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                id="standard-basic"
                variant="standard"
                fullWidth
                placeholder="Add Todo here"
              />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={todo == "" ? true : false}
                size="small"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
