import { GET_TODOS } from '../types';
const todoReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
      };
    default:
      return state;
  }
};
export default todoReducer;
