import * as React from "react";
import { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function PopUpMenu({ todoId, refreshTodos ,snackOpen}) {
  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnack,setOpenSnack] = useState(false)

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseSnack = (event, reason)=>{
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (event) => {
    console.log("reached-----")
    
    setOpenBackdrop(true);
    axios
      .delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}/delete/${todoId}`)
      .then(async () => { 
        //  debugger;
        // setOpenSnack(true);
        refreshTodos(todoId); 
        console.log("qweeeeeeeeeeeeeeeeeeee",openSnack)
        setOpen(false);
        setOpenBackdrop(false);
        // setOpenSnack(true);
        console.log("qweeeeeeeeeeeeeeeeeeee--->",openSnack)
      })
      .catch((err) => {
       
        setOpenBackdrop(false);
        console.log(err);
      });
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
    {
      console.log("-*-*-*----->",openSnack)
    }
     <Snackbar open={snackOpen}  autoHideDuration={100000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <DragIndicatorIcon />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper sx={{ backgroundColor: "white" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </>
  );
}
