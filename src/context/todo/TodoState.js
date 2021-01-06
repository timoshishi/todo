import React, { useReducer } from 'react';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import {
  GET_TODOS,
  // ADD_TODO,
  // UPDATE_TODO,
  // DELETE_TODO,
  SET_SELECTION,
  CLEAR_SELECTION,
} from '../types';

const TodoState = (props) => {
  const initialState = {
    todos: [],
    currentSelection: {
      id: null,
      text: '',
      completed: false,
    },
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const url = 'http://localhost:3001/todo';

  //GET ALL TODOS
  const getTodos = async () => {
    try {
      const res = await fetch(url);
      const todos = await res.json();
      dispatch({
        type: GET_TODOS,
        payload: todos,
      });
    } catch (err) {
      console.log('@ addTodo TodoState.js', err.message);
    }
  };

  // ADD A TODO TO STATE
  const addTodo = async (todo) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      };
      await fetch(url, options);
      return getTodos();
    } catch (err) {
      console.log('@ addTodo TodoState.js', err.message, err.stack);
    }
  };

  // DELETE TODO ON SERVER
  const deleteTodo = async (id) => {
    try {
      const options = {
        method: 'DELETE',
      };
      await fetch(`${url}/${id}`, options);
      return getTodos();
    } catch (err) {
      console.log('@ addTodo TodoState.js', err.message, err.stack);
    }
  };

  //UPDATE TODO IN LOCAL STATE
  const updateTodo = async (todo) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todo),
    };
    try {
      await fetch(`${url}/${todo.id}`, options);
      return getTodos();
    } catch (err) {
      console.log('@ updateTodo TodoState.js', err.message, err.stack);
    }
  };

  //SET CURRENT SELECTION FOR THE MODAL
  const setSelection = (id) => {
    const todo = state.todos.find((item) => item.id === Number(id));
    dispatch({
      type: SET_SELECTION,
      payload: todo,
    });
  };
  //CLEAR CURRENT SELECTION FOR THE MODAL
  const clearSelection = () => {
    dispatch({
      type: CLEAR_SELECTION,
      payload: null,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        currentSelection: state.currentSelection,
        getTodos,
        addTodo,
        deleteTodo,
        setSelection,
        clearSelection,
        updateTodo,
      }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
