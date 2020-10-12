import { put } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "../../axios-bookshelf";

export function* fetchBookshelfSaga(action) {
  yield put(actions.fetchBookshelfStart());
  try {
    const response = yield axios.get(
      "/bookshelf/" + action.userId + ".json?auth=" + action.token
    );
    const fetchedBookshelf = yield [];
    for (let key in response.data) {
      key !== "userDetails" &&
        fetchedBookshelf.push({
          ...response.data[key],
          id: key,
        });
    }
    yield put(actions.fetchBookshelfSuccess(fetchedBookshelf));
  } catch (error) {
    yield put(actions.fetchBookshelfFail(error));
  }
}

export function* addBookSaga(action) {
  yield put(actions.addBookStart());
  try {
    const response = yield axios.post(
      "/bookshelf/" + action.userId + ".json?auth=" + action.token,
      action.bookshelfData
    );
    yield put(actions.addBookSuccess(response.data.name, action.bookshelfData));
  } catch (error) {
    yield put(actions.addBookFail(error));
  }
}

export function* deleteBookSaga(action) {
  yield put(actions.deleteBookStart());
  for (let book in action.bookshelfData) {
    const bookId = action.bookshelfData[book].id;
    try {
      yield axios.delete(
        "/bookshelf/" +
          action.userId +
          "/" +
          bookId +
          ".json?auth=" +
          action.token
      );
    } catch (error) {
      yield put(actions.deleteBookFail(error));
    }
  }
  let bookIds = [];
  for (let book in action.bookshelfData) {
    bookIds = bookIds.concat(action.bookshelfData[book].id);
  }
  yield put(actions.deleteBookSuccess(bookIds, action.bookshelfData));
}
