import {
  GET_TODOS,
  // ADD_TODO,
  // UPDATE_TODO,
  // DELETE_TODO,
  SET_SELECTION,
  CLEAR_SELECTION,
} from '../types';

const todoReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
      };
    case SET_SELECTION:
      return {
        ...state,
        currentSelection: payload,
      };
    case CLEAR_SELECTION:
      return {
        ...state,
        currentSelection: {
          id: null,
          text: '',
          completed: false,
        },
      };
    default:
      return state;
  }
};
export default todoReducer;
