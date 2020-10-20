import React, { useCallback, useEffect, useState } from "react";
import axios from "../../axios-bookshelf";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../store/actions";
import {
  ADD_NEW,
  FIND_MATCHES,
  BOOK_REMOVED,
  BOOK_ADDED,
  NO_BOOKS_TITLE,
  NO_BOOKS_BODY,
} from "../../util/constants";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Alert from "@material-ui/lab/Alert";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import SuccessSnackbar from "../../components/Snackbar/Snackbar";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import NewBook from "../../components/NewBook/NewBook";
import EnhancedTable from "../../components/Table/EnhancedTable";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";

const useStyles = makeStyles((theme) => ({
  bookshelf: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "lg",
  },
  alert: {
    marginBottom: theme.spacing(3),
  },
  snackbar: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Bookshelf = () => {
  const classes = useStyles();

  const [adding, setAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const loading = useSelector((state) => state.bookshelf.loading);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const added = useSelector((state) => state.bookshelf.added);
  const deleted = useSelector((state) => state.bookshelf.deleted);
  const bookshelf = useSelector((state) => state.bookshelf.bookshelf);

  const dispatch = useDispatch();

  const fetchBookshelfHandler = useCallback(
    () => dispatch(actionTypes.fetchBookshelf(token, userId)),
    [dispatch, token, userId]
  );

  const toggleIsAdding = () => {
    setAdding(!adding);
  };

  useEffect(() => {
    fetchBookshelfHandler();
  }, [fetchBookshelfHandler]);

  useEffect(() => {
    if (added) {
      fetchBookshelfHandler();
      toggleIsAdding();
      setSuccessMessage(BOOK_ADDED);
    } else if (deleted) {
      fetchBookshelfHandler();
      setSuccessMessage(BOOK_REMOVED);
    }
  }, [added, deleted]); // eslint-disable-line react-hooks/exhaustive-deps

  const addBookHandler = (title, author) => {
    const bookshelfData = { title: title, author: author };
    dispatch(actionTypes.addBook(bookshelfData, token, userId));
  };

  const deleteBookHandler = (selected) => {
    //TODO: delete based on bookId, not title
    let booksToDelete = [];
    for (let title in selected) {
      booksToDelete = booksToDelete.concat(
        bookshelf.filter((book) => book.title === selected[title])
      );
    }
    dispatch(actionTypes.deleteBook(booksToDelete, token, userId));
  };

  let bookshelfComponent = null;
  if (!loading) {
    bookshelfComponent =
      bookshelf.length > 0 ? (
        <EnhancedTable books={bookshelf} onDelete={deleteBookHandler} />
      ) : (
        <Alert severity="error" className={classes.alert}>
          <AlertTitle>{NO_BOOKS_TITLE}</AlertTitle>
          {NO_BOOKS_BODY}
        </Alert>
      );
  }

  return (
    <Aux>
      <div className={classes.bookshelf}>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {bookshelfComponent}
        {adding ? (
          <NewBook onSubmit={addBookHandler} onCancel={toggleIsAdding} />
        ) : (
          <Grid
            container
            spacing={2}
            direction={"row"}
            alignItems={"center"}
            justify={"space-evenly"}
          >
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                endIcon={<Icon color="primary">add_circle</Icon>}
                onClick={toggleIsAdding}
              >
                {ADD_NEW}
              </Button>
            </Grid>
            <Grid item>
              <NavLink to="/matches" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#43C130" }}
                  size="large"
                  endIcon={<GroupIcon />}
                >
                  {FIND_MATCHES}
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        )}
      </div>
      <SuccessSnackbar show={added || deleted} message={successMessage} />
    </Aux>
  );
};

export default withErrorHandler(Bookshelf, axios);
