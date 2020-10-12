import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AvatarImage from "../Avatar/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const Messages = (props) => {
  const { messagesData } = props;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {messagesData.map((message, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
              <AvatarImage imageNumber={index + 1} />
            </ListItemAvatar>
            <ListItemText
              primary={message.name}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {message.body}
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Messages;
