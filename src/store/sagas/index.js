import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  authUserSaga,
  checkAuthStateSaga,
  checkAuthTimeoutSaga,
  logoutSaga,
} from "./auth";
import { fetchBookshelfSaga, addBookSaga, deleteBookSaga } from "./bookshelf";
import { fetchMatchesSaga } from "./matches";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga),
  ]);
}

export function* watchBookshelf() {
  yield takeEvery(actionTypes.FETCH_BOOKSHELF, fetchBookshelfSaga);
  yield takeLatest(actionTypes.ADD_BOOK, addBookSaga);
  yield takeLatest(actionTypes.DELETE_BOOK, deleteBookSaga);
}

export function* watchMatches() {
  yield takeEvery(actionTypes.FETCH_MATCHES, fetchMatchesSaga);
}
