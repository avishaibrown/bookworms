import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  AGE,
  AGE_INVALID,
  EMAIL,
  EMAIL_EXISTS,
  EMAIL_INVALID,
  EMAIL_NOT_FOUND,
  INVALID_PASSWORD,
  NAME,
  NAME_INVALID,
  PASSWORD,
  PASSWORD_INVALID,
  SIGN_IN,
  SIGN_UP,
  SWITCH_TO_SIGN_IN,
  SWITCH_TO_SIGN_UP,
  TOO_MANY_ATTEMPTS_TRY_LATER,
} from "../../util/constants";
import { checkValidity, updateObject } from "../../util/util";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    marginTop: theme.spacing(3),
    color: theme.palette.error.main,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(16),
  },
}));

export default function Auth() {
  const classes = useStyles();

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const authRedirectPath = useSelector((state) => state.auth.authRedirectPath);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: {
      value: "",
      validations: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    age: {
      value: "",
      validations: {
        required: true,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      value: "",
      validations: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      value: "",
      validations: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
  });

  const dispatch = useDispatch();
  const onAuth = (name, age, email, password, isSignUp) =>
    dispatch(actions.auth(name, age, email, password, isSignUp));
  const onSetAuthRedirectPath = useCallback(
    () => dispatch(actions.setAuthRedirectPath("/")),
    [dispatch]
  );

  useEffect(() => {
    if (authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [authRedirectPath, onSetAuthRedirectPath]);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleChange = (event) => {
    const updatedControls = updateObject(authForm, {
      [event.target.name]: updateObject(authForm[event.target.name], {
        value: event.target.value,
        touched: false,
      }),
    });
    setAuthForm(updatedControls);
  };

  const handleBlur = (event) => {
    const updatedControls = updateObject(authForm, {
      [event.target.name]: updateObject(authForm[event.target.name], {
        valid: checkValidity(
          event.target.value,
          authForm[event.target.name].validations
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  useEffect(() => {
    isSignUp
      ? setIsFormValid(
          authForm.name.valid &&
            authForm.age.valid &&
            authForm.email.valid &&
            authForm.password.valid
        )
      : setIsFormValid(authForm.email.valid && authForm.password.valid);
  }, [
    authForm.name.valid,
    authForm.age.valid,
    authForm.email.valid,
    authForm.password.valid,
    isSignUp,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    isFormValid &&
      onAuth(
        authForm.name.value,
        authForm.age.value,
        authForm.email.value,
        authForm.password.value,
        isSignUp
      );
  };

  let errorMessage = (error) => {
    switch (error.message) {
      case "EMAIL_NOT_FOUND":
        return EMAIL_NOT_FOUND;
      case "INVALID_PASSWORD":
        return INVALID_PASSWORD;
      case "EMAIL_EXISTS":
        return EMAIL_EXISTS;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        return TOO_MANY_ATTEMPTS_TRY_LATER;
      default:
        return null;
    }
  };

  let renderEmailAndPassword = (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label={EMAIL}
        name="email"
        autoComplete="email"
        autoFocus={!isSignUp}
        onBlur={handleBlur}
        onChange={handleChange}
        error={
          authForm.email.valid === false && authForm.email.touched === true
        }
        helperText={
          authForm.email.valid === false &&
          authForm.email.touched === true &&
          EMAIL_INVALID
        }
        disabled={loading}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label={PASSWORD}
        type="password"
        id="password"
        autoComplete="current-password"
        onBlur={handleBlur}
        onChange={handleChange}
        error={
          authForm.password.valid === false &&
          authForm.password.touched === true
        }
        helperText={
          authForm.password.valid === false &&
          authForm.password.touched === true &&
          PASSWORD_INVALID
        }
        disabled={loading}
      />
    </>
  );

  let renderNameAndAge = (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="name"
        label={NAME}
        name="name"
        autoComplete="name"
        autoFocus={isSignUp}
        onBlur={handleBlur}
        onChange={handleChange}
        error={authForm.name.valid === false && authForm.name.touched === true}
        helperText={
          authForm.name.valid === false &&
          authForm.name.touched === true &&
          NAME_INVALID
        }
        disabled={loading}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="age"
        label={AGE}
        name="age"
        autoComplete="age"
        onBlur={handleBlur}
        onChange={handleChange}
        error={authForm.age.valid === false && authForm.age.touched === true}
        helperText={
          authForm.age.valid === false &&
          authForm.age.touched === true &&
          AGE_INVALID
        }
        disabled={loading}
      />
    </>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? SIGN_UP : SIGN_IN}
        </Typography>
        {isAuthenticated && <Redirect to={authRedirectPath} />}
        {error && <div className={classes.error}>{errorMessage(error)}</div>}
        <form className={classes.form} onSubmit={handleSubmit}>
          {isSignUp ? renderNameAndAge : null}
          {renderEmailAndPassword}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : isSignUp ? (
              SIGN_UP
            ) : (
              SIGN_IN
            )}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={toggleSignUp}
                disabled={loading}
              >
                {isSignUp ? SWITCH_TO_SIGN_IN : SWITCH_TO_SIGN_UP}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
