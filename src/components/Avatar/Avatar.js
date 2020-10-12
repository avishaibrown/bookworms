import React from "react";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const AvatarImage = (props) => {
  const { imageNumber, large } = props;
  const classes = useStyles();

  return (
    <Avatar
      alt={`Avatar n°${imageNumber}`}
      src={`https://material-ui.com/static/images/avatar/${imageNumber}.jpg`}
      className={large && classes.large}
    />
  );
};

export default AvatarImage;
