import * as actionTypes from "./actionTypes";

export const fetchMatches = (token, userId) => {
  return {
    type: actionTypes.FETCH_MATCHES,
    token: token,
    userId: userId,
  };
};

export const fetchMatchesStart = () => {
  return {
    type: actionTypes.FETCH_MATCHES_START,
  };
};

export const fetchMatchesSuccess = (matchBookshelfData, matchNamesData) => {
  return {
    type: actionTypes.FETCH_MATCHES_SUCCESS,
    matchBookshelfData: matchBookshelfData,
    matchNamesData: matchNamesData,
  };
};

export const fetchMatchesFail = (error) => {
  return {
    type: actionTypes.FETCH_MATCHES_FAIL,
    error: error,
  };
};
