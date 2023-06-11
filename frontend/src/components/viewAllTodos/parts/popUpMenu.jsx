import * as React from "react";
import { useState } from "react";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MuiAlert from "@mui/material/Alert";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function PopUpMenu({
  todoId,
  openPopUp,
  handleDelete,
  handleListKeyDown,
  openBackDropDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setMenuOpen(false);
  };

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  React.useEffect(() => {
    if (!openPopUp) {
      setMenuOpen(false);
    }
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
          aria-controls={menuOpen ? "composition-menu" : undefined}
          aria-expanded={menuOpen ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <DragIndicatorIcon />
        </IconButton>
        <Popper
          open={menuOpen}
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
                    autoFocusItem={menuOpen}
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
