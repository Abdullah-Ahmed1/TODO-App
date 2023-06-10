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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function PopUpMenu({
  todoId,
  openBackDropDelete,
  handleDelete,
  openPopUp,
  handleTogglePopUp,
  handleClosePopUp,
  handleListKeyDown,
}) {

  
  const anchorRef = React.useRef(null);

  // const handleCloseSnack = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpenSnack(false);
  // };

  const prevOpen = React.useRef(openPopUp);
  React.useEffect(() => {
    if (prevOpen.current === true && openPopUp === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openPopUp;
  }, [openPopUp]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDropDelete}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={openPopUp ? "composition-menu" : undefined}
          aria-expanded={openPopUp ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleTogglePopUp}
        >
          <DragIndicatorIcon />
        </IconButton>
        <Popper
          open={openPopUp}
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
                <ClickAwayListener onClickAway={handleClosePopUp}>
                  <MenuList
                    autoFocusItem={openPopUp}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={() => handleDelete(todoId)}>
                      Delete
                    </MenuItem>
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
