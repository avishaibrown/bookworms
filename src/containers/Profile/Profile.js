import React, { useCallback, useEffect } from "react";
import axios from "../../axios-bookshelf";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../store/actions";
import {
  MY_BOOKSHELF,
  MY_MESSAGES,
  NO_BOOKS_BODY,
  NO_BOOKS_TITLE,
  NO_IMAGE_AVAILABLE,
  YEAR_OLD,
  YEARS_OLD,
} from "../../util/constants";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import AvatarImage from "../../components/Avatar/Avatar";
import SimpleTable from "../../components/Table/SimpleTable";
import Card from "@material-ui/core/Card";
import Messages from "../../components/Messages/Messages";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  image: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  content: {
    paddingTop: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();

  const messagesData = [
    { name: "Eugene Kaplan", body: "This message was deleted." },
    { name: "Avraham Tatarka", body: "I'll be 20 mins" },
    {
      name: "Michoel Moshel",
      body: "Wish I could come, but I'm out of town this…",
    },
  ];

  const loading = useSelector((state) => state.bookshelf.loading);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.name);
  const age = useSelector((state) => state.auth.age);
  const bookshelf = useSelector((state) => state.bookshelf.bookshelf);

  const dispatch = useDispatch();

  const fetchBookshelfHandler = useCallback(
    () => dispatch(actionTypes.fetchBookshelf(token, userId)),
    [dispatch, token, userId]
  );

  useEffect(() => {
    fetchBookshelfHandler();
  }, [fetchBookshelfHandler]);

  let bookshelfComponent = null;
  if (!loading) {
    bookshelfComponent =
      bookshelf.length > 0 ? (
        <SimpleTable books={bookshelf} />
      ) : (
        <Alert severity="error" className={classes.alert}>
          <AlertTitle>{NO_BOOKS_TITLE}</AlertTitle>
          {NO_BOOKS_BODY}
        </Alert>
      );
  }

  return (
    <Aux>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={classes.mainFeaturedPost}>
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} alt={NO_IMAGE_AVAILABLE} />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <div className={classes.image}>
                <AvatarImage imageNumber={1} large={true} />
              </div>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {name}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {age === 1 ? `${age} ${YEAR_OLD}` : `${age} ${YEARS_OLD}`}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  <strong>{MY_BOOKSHELF}</strong>
                </Typography>
                <div className={classes.content}>{bookshelfComponent}</div>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  <strong>{MY_MESSAGES}</strong>
                </Typography>
                <div className={classes.content}>
                  <Messages messagesData={messagesData} />
                </div>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Aux>
  );
};

export default withErrorHandler(Profile, axios);
