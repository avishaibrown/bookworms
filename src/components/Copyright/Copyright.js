import React from "react";
import Typography from "@material-ui/core/Typography";
import { COPYRIGHT } from "../../util/constants";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {COPYRIGHT}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
