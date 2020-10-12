import * as actionTypes from "./../actions/actionTypes";
import { updateObject } from "../../util/util";

const initialState = {
  bookshelf: [],
  loading: false,
  added: false,
  deleted: false,
};

const fetchBookshelfStart = (state, action) => {
  return updateObject(state, { loading: true, added: false, deleted: false });
};

const fetchBookshelfSuccess = (state, action) => {
  const displayedBookshelf = action.bookshelf.reverse();
  return updateObject(state, { bookshelf: displayedBookshelf, loading: false });
};

const fetchBookshelfFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const addBookStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const addBookSuccess = (state, action) => {
  const newBook = updateObject(action.bookshelfData, {
    id: action.bookId,
  });
  return updateObject(state, {
    loading: false,
    added: true,
    bookshelf: state.bookshelf.concat(newBook),
  });
};

const addBookFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const deleteBookStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteBookSuccess = (state, action) => {
  let newBookshelf = [];
  for (let id in state.bookshelf) {
    newBookshelf = newBookshelf.concat(
      state.bookshelf.filter((book) => {
        return book.id !== action.bookIds[id];
      })
    );
  }
  return updateObject(state, {
    loading: false,
    deleted: true,
    bookshelf: newBookshelf,
  });
};

const deleteBookFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKSHELF_START:
      return fetchBookshelfStart(state, action);
    case actionTypes.FETCH_BOOKSHELF_SUCCESS:
      return fetchBookshelfSuccess(state, action);
    case actionTypes.FETCH_BOOKSHELF_FAIL:
      return fetchBookshelfFail(state, action);
    case actionTypes.ADD_BOOK_START:
      return addBookStart(state, action);
    case actionTypes.ADD_BOOK_SUCCESS:
      return addBookSuccess(state, action);
    case actionTypes.ADD_BOOK_FAIL:
      return addBookFail(state, action);
    case actionTypes.DELETE_BOOK_START:
      return deleteBookStart(state, action);
    case actionTypes.DELETE_BOOK_SUCCESS:
      return deleteBookSuccess(state, action);
    case actionTypes.DELETE_BOOK_FAIL:
      return deleteBookFail(state, action);
    default:
      return state;
  }
};

export default reducer;
