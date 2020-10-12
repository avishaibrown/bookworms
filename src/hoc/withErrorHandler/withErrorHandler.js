import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Aux from "../Auxiliary/Auxiliary";
import useHttpErrorHandler from "../../hooks/http-error-handler";
import { ERROR_MESSAGE } from "../../util/constants";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Dialog open={!!error} onClose={clearError}>
          <DialogTitle>{error ? ERROR_MESSAGE : null}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {error ? error.message : null}
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
