import React from "react";
import { SIMILARITY, VIEW_BIO } from "../../util/constants";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import AvatarImage from "../Avatar/Avatar";
import SimpleTable from "../Table/SimpleTable";

const styles = (theme) => ({
  root: {
    margin: 0,
    minWidth: 500,
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  image: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, imageToShow, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <div className={classes.image}>
        <AvatarImage imageNumber={imageToShow} large={true} />
      </div>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const BioDialog = (props) => {
  const { name, imageToShow, score, books, showBio, setShowBio } = props;

  const handleClose = () => {
    setShowBio(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="bio-dialog-title"
        open={showBio}
      >
        <DialogTitle
          id="bio-dialog-name"
          onClose={handleClose}
          imageToShow={imageToShow}
        >
          {name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography
            gutterBottom
            variant="h5"
            align="center"
            flexGrow="1"
            color="textPrimary"
          >
            {SIMILARITY}: <strong>{score}%</strong>
          </Typography>
          <SimpleTable books={books} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {VIEW_BIO}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BioDialog;
