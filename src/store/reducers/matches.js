import * as actionTypes from "./../actions/actionTypes";
import { updateObject } from "../../util/util";

const initialState = {
  loading: false,
  matchBookshelfData: [],
  matchNamesData: [],
};

const fetchMatchesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchMatchesSuccess = (state, action) => {
  //sort incoming data by matchPercent descending and prune all users with matchPercent of 0
  const sortedMatchData = action.matchBookshelfData
    .sort((a, b) => parseFloat(b[b.length - 1]) - parseFloat(a[a.length - 1]))
    .filter((user) => user[user.length - 1] > 0);
  const sortedMatchNamesData = action.matchNamesData
    .sort((a, b) => parseFloat(b.matchPercent) - parseFloat(a.matchPercent))
    .filter((user) => user.matchPercent > 0);
  return updateObject(state, {
    matchBookshelfData: sortedMatchData,
    matchNamesData: sortedMatchNamesData,
    loading: false,
  });
};

const fetchMatchesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MATCHES_START:
      return fetchMatchesStart(state, action);
    case actionTypes.FETCH_MATCHES_SUCCESS:
      return fetchMatchesSuccess(state, action);
    case actionTypes.FETCH_MATCHES_FAIL:
      return fetchMatchesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
