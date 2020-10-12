import { put, delay } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "../../axios-bookshelf";

export function* logoutSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("name");
  yield localStorage.removeItem("age");
  yield put(actions.logoutSucceed());
}

export function* checkAuthStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      const name = yield localStorage.getItem("name");
      const age = yield localStorage.getItem("age");
      yield put(actions.authSuccess(token, userId, name, age));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.logout());
    }
  }
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZHWkLrsJkESciXTO09ExEP1dHCPnq-ow";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZHWkLrsJkESciXTO09ExEP1dHCPnq-ow";
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);

    let userDetails = {
      name: null,
      age: null,
    };

    if (action.isSignUp) {
      userDetails = {
        name: action.name,
        age: action.age,
      };
      try {
        yield axios.put(
          "/bookshelf/" +
            response.data.localId +
            "/userDetails.json?auth=" +
            response.data.idToken,
          userDetails
        );
      } catch (error) {
        yield put(actions.authFail(error));
      }
    }

    try {
      const userDetailsResponse = yield axios.get(
        "/bookshelf/" +
          response.data.localId +
          "/userDetails.json?auth=" +
          response.data.idToken
      );
      userDetails = {
        name: userDetailsResponse.data.name,
        age: userDetailsResponse.data.age,
      };
    } catch (error) {
      yield put(actions.authFail(error));
    }

    yield localStorage.setItem("name", userDetails.name);
    yield localStorage.setItem("age", userDetails.age);
    yield put(
      actions.authSuccess(
        response.data.idToken,
        response.data.localId,
        userDetails.name,
        userDetails.age
      )
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}
