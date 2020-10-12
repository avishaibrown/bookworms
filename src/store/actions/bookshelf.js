import * as actionTypes from "./actionTypes";

export const fetchBookshelf = (token, userId) => {
  return {
    type: actionTypes.FETCH_BOOKSHELF,
    token: token,
    userId: userId,
  };
};

export const fetchBookshelfStart = () => {
  return {
    type: actionTypes.FETCH_BOOKSHELF_START,
  };
};

export const fetchBookshelfSuccess = (bookshelf) => {
  return {
    type: actionTypes.FETCH_BOOKSHELF_SUCCESS,
    bookshelf: bookshelf,
  };
};

export const fetchBookshelfFail = (error) => {
  return {
    type: actionTypes.FETCH_BOOKSHELF_FAIL,
    error: error,
  };
};

export const addBook = (bookshelfData, token, userId) => {
  return {
    type: actionTypes.ADD_BOOK,
    bookshelfData: bookshelfData,
    token: token,
    userId: userId,
  };
};

export const addBookStart = () => {
  return {
    type: actionTypes.ADD_BOOK_START,
  };
};

export const addBookSuccess = (id, bookshelfData) => {
  return {
    type: actionTypes.ADD_BOOK_SUCCESS,
    bookId: id,
    bookshelfData: bookshelfData,
  };
};

export const addBookFail = (error) => {
  return {
    type: actionTypes.ADD_BOOK_FAIL,
    error: error,
  };
};

export const deleteBook = (bookshelfData, token, userId) => {
  return {
    type: actionTypes.DELETE_BOOK,
    bookshelfData: bookshelfData,
    token: token,
    userId: userId,
  };
};

export const deleteBookStart = () => {
  return {
    type: actionTypes.DELETE_BOOK_START,
  };
};

export const deleteBookSuccess = (ids, bookshelfData) => {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS,
    bookIds: ids,
    bookshelfData: bookshelfData,
  };
};

export const deleteBookFail = (error) => {
  return {
    type: actionTypes.DELETE_BOOK_FAIL,
    error: error,
  };
};
