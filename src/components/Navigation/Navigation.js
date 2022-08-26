import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  SIGN_IN,
  MY_MATCHES,
  MY_PROFILE,
  MY_BOOKSHELF,
  WEB_APP_NAME,
  SIGN_OUT,
} from "../../util/constants";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import PeopleIcon from "@material-ui/icons/People";
import { AccountCircle, AddCircleOutline } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#ff0000",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {WEB_APP_NAME}
          </Typography>
          {!isAuthenticated ? (
            <NavLink to="/auth" style={{ textDecoration: "none" }}>
              <Button variant="contained">{SIGN_IN}</Button>
            </NavLink>
          ) : (
            <NavLink to="/logout" style={{ textDecoration: "none" }}>
              <Button variant="contained">{SIGN_OUT}</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={"myBookshelf"} onClick={handleDrawerClose}>
            <ListItemIcon>
              <AddCircleOutline />
            </ListItemIcon>
            <NavLink to="/bookshelf" style={{ textDecoration: "none" }}>
              <ListItemText primary={MY_BOOKSHELF} />
            </NavLink>
          </ListItem>
          <ListItem button key={"myMatches"} onClick={handleDrawerClose}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <NavLink to="/matches" style={{ textDecoration: "none" }}>
              <ListItemText primary={MY_MATCHES} />
            </NavLink>
          </ListItem>
          <Divider />
          <ListItem button key={"myProfile"} onClick={handleDrawerClose}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <ListItemText primary={MY_PROFILE} />
            </NavLink>
            {isAuthenticated && (
              <Badge
                badgeContent={3}
                color="primary"
                style={{ paddingLeft: "25%" }}
                component={Link}
                to="/profile"
                overlap="rectangular"
              >
                <MailIcon />
              </Badge>
            )}
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}
