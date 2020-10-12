import { put } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "../../axios-bookshelf";
import { isEqual } from "lodash";

export function* fetchMatchesSaga(action) {
  yield put(actions.fetchMatchesStart());
  try {
    const response = yield axios.get("/bookshelf.json?auth=" + action.token);
    let fetchedBookshelfData = yield [];
    let fetchedOtherUsersData = yield [];
    let fetchedOtherUsersNameData = yield [];

    for (let key in response.data) {
      if (key === action.userId) {
        for (let item in response.data[key]) {
          item !== "userDetails" &&
            fetchedBookshelfData.push(response.data[key][item]);
        }
      } else {
        for (let item in response.data[key]) {
          if (item === "userDetails") {
            fetchedOtherUsersNameData.push(response.data[key][item]);
            delete response.data[key][item];
          }
        }
        fetchedOtherUsersData.push(Object.values(response.data[key]));
      }
    }

    //find percentage match for each user
    for (let user in fetchedOtherUsersData) {
      let matchPercent = 0;
      for (let book in fetchedBookshelfData) {
        fetchedOtherUsersData[user].some(function (bookToMatch) {
          return isEqual(bookToMatch, fetchedBookshelfData[book]);
        }) && matchPercent++;
      }

      if (matchPercent > 0)
        matchPercent = Math.round(
          (matchPercent / fetchedBookshelfData.length) * 100
        );

      fetchedOtherUsersData[user].push(matchPercent);
      fetchedOtherUsersNameData[user].matchPercent = matchPercent;
    }

    yield put(
      actions.fetchMatchesSuccess(
        fetchedOtherUsersData,
        fetchedOtherUsersNameData
      )
    );
  } catch (error) {
    yield put(actions.fetchMatchesFail(error));
  }
}
