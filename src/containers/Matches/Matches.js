import React, { useCallback, useEffect, useState } from "react";
import axios from "../../axios-bookshelf";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../store/actions";
import {
  MY_MATCHES,
  NO_MATCHES_BODY,
  NO_MATCHES_TITLE,
  SEND_MESSAGE,
  NOT_ENOUGH_BOOKS,
  NO_BOOKS_BODY,
} from "../../util/constants";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ChatIcon from "@material-ui/icons/Chat";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Card from "@material-ui/core/Card";
import AvatarImage from "../../components/Avatar/Avatar";
import BioDialog from "../../components/BioDialog/BioDialog";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { getFirstName } from "../../util/util";
import Chip from "@material-ui/core/Chip";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "500px",
  },
  cardDetails: {
    flex: 1,
  },
  content: {
    paddingTop: theme.spacing(2),
  },
  list: {
    alignItems: "center",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Matches = () => {
  const classes = useStyles();
  const [matchPercent, setMatchPercent] = useState(null);
  const [imageNumber, setImageNumber] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [showBio, setShowBio] = useState(false);
  const [name, setName] = useState(null);

  const loading = useSelector((state) => state.matches.loading);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const matchBookshelfData = useSelector(
    (state) => state.matches.matchBookshelfData
  );
  const matchNamesData = useSelector((state) => state.matches.matchNamesData);
  const bookshelf = useSelector((state) => state.bookshelf.bookshelf);

  const dispatch = useDispatch();

  const fetchMatchesHandler = useCallback(
    () => dispatch(actionTypes.fetchMatches(token, userId)),
    [dispatch, token, userId]
  );

  useEffect(() => {
    fetchMatchesHandler();
  }, [fetchMatchesHandler]);

  useEffect(() => {
    !showBio && setName(null);
  }, [showBio]);

  const handleBioOpen = (index, matchPercent) => {
    setName(matchNamesData[index].name);
    setImageNumber(index + 1);
    setMatchPercent(matchPercent);
    //TODO: Change displayedMatchData to matchBookshelfData[index] once restructured
    const displayedMatchData = matchBookshelfData[index].slice(
      0,
      matchBookshelfData[index].length - 1
    );
    setUserBooks(displayedMatchData);
    setShowBio(true);
  };

  let matchBookshelfDataList = null;
  if (!loading) {
    if (bookshelf.length >= 5) {
      matchBookshelfDataList =
        matchBookshelfData.length > 0 ? (
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  <strong>{MY_MATCHES}</strong>
                </Typography>
                <div className={classes.content}>
                  <List className={classes.list}>
                    {matchBookshelfData.map((value, key) => {
                      const matchPercent = value[value.length - 1];
                      return (
                        <React.Fragment key={key}>
                          <ListItem
                            key={key}
                            button
                            onClick={() => handleBioOpen(key, matchPercent)}
                          >
                            <ListItemAvatar>
                              <AvatarImage imageNumber={key + 1} />
                            </ListItemAvatar>
                            <ListItemText id={`match-percentage-item-${key}`}>
                              <Typography
                                component="h1"
                                variant="h5"
                                style={{ color: "#388e3c" }}
                              >
                                {`${getFirstName(matchNamesData[key].name)}, ${
                                  matchNamesData[key].age
                                }`}
                              </Typography>
                              <Chip
                                icon={<MenuBookOutlinedIcon />}
                                label={<strong>{matchPercent}%</strong>}
                                style={{ backgroundColor: "orange" }}
                              />
                            </ListItemText>

                            <ListItemSecondaryAction>
                              {window.screen.width > 500 ? (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  endIcon={<Icon>send</Icon>}
                                >
                                  {SEND_MESSAGE}
                                </Button>
                              ) : (
                                <ChatIcon variant="contained" color="primary" />
                              )}
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </React.Fragment>
                      );
                    })}
                  </List>
                </div>
              </CardContent>
            </div>
          </Card>
        ) : (
          <Alert severity="error">
            <AlertTitle>{NO_MATCHES_TITLE}</AlertTitle>
            {NO_MATCHES_BODY}
          </Alert>
        );
    } else {
      matchBookshelfDataList = (
        <Alert severity="error">
          <AlertTitle>{NOT_ENOUGH_BOOKS}</AlertTitle>
          {NO_BOOKS_BODY}
        </Alert>
      );
    }
  }

  return (
    <Aux>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {matchBookshelfDataList}
      <BioDialog
        name={name}
        imageToShow={imageNumber}
        score={matchPercent}
        books={userBooks}
        showBio={showBio}
        setShowBio={setShowBio}
      />
    </Aux>
  );
};

export default withErrorHandler(Matches, axios);
