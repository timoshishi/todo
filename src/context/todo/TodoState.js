import React, { useReducer } from 'react';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import { GET_TODOS } from '../types';

const TodoState = (props) => {
  const initialState = {
    todos: [],
  };
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const url = 'http://localhost:3001/todo';

  const getTodos = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return dispatch({
        type: GET_TODOS,
        payload: data,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  // ADD A TODO
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

  // DELETE TODO
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

  //UPDATE TODO
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

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        currentSelection: state.currentSelection,
        getTodos,
        addTodo,
        deleteTodo,
        updateTodo,
      }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
