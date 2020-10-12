import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SuccessSnackbar = (props) => {
  const { show, message } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    show && setOpen(true);
  }, [show]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <div className={classes.snackbar}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleClose}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SuccessSnackbar;
