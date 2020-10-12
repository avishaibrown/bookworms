import React, { useState } from "react";
import { camelCase } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { AUTHOR, NEW_BOOK, CANCEL, SAVE, TITLE } from "../../util/constants";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "67%",
  },
  title: {
    padding: theme.spacing(2),
  },
  input: {
    padding: theme.spacing(2),
  },
  buttons: {
    paddingRight: theme.spacing(2),
  },
}));

const NewBook = (props) => {
  const classes = useStyles();
  const { onSubmit, onCancel } = props;
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit(title, author);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h2" variant="h5" className={classes.title}>
          {NEW_BOOK}
        </Typography>
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={12}>
            <Grid item xs={6} sm={6} className={classes.input}>
              <TextField
                id={camelCase(TITLE)}
                name={camelCase(TITLE)}
                label={TITLE}
                variant="outlined"
                fullWidth={true}
                required
                autoFocus
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6} className={classes.input}>
              <TextField
                id={camelCase(AUTHOR)}
                name={camelCase(AUTHOR)}
                label={AUTHOR}
                variant="outlined"
                fullWidth={true}
                required
                onChange={(event) => {
                  setAuthor(event.target.value);
                }}
              />
            </Grid>
            <Grid container justify={"flex-end"} className={classes.buttons}>
              <Button size="medium" onClick={onCancel}>
                {CANCEL}
              </Button>
              <Button type="submit" size="medium" color="primary">
                {SAVE}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewBook;
