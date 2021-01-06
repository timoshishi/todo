import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  TableCell,
  TableRow,
  Input,
  Typography,
} from '@material-ui/core';
import { Delete, Edit, Publish } from '@material-ui/icons';
import TodoContext from '../context/todo/todoContext';

const Row = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodoContext);

  const [editing, setEditing] = useState(false);
  const [complete, setComplete] = useState(todo.completed);
  const [todoText, setTodoText] = useState(todo.text);

  return (
    <TableRow key={todo.id}>
      <TableCell>
        {!editing ? (
          <Typography variant='body1'>{todoText}</Typography>
        ) : (
          <Input
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            style={{ width: '100%' }}
          />
        )}
      </TableCell>
      <TableCell
        align='center'
        onClick={() => {
          if (editing) {
            setComplete(!complete);
          }
        }}>
        {complete ? '✔️' : '❌'}
      </TableCell>
      <TableCell align='right' style={{ width: '50px' }}>
        <IconButton
          color={editing ? 'primary' : 'inherit'}
          onClick={() => {
            if (editing) {
              console.log('doing');
              updateTodo({ text: todoText, completed: complete, id: todo.id });
            }
            setEditing(!editing);
          }}>
          {!editing ? <Edit /> : <Publish />}
        </IconButton>
      </TableCell>
      <TableCell align='left' style={{ width: '50px' }}>
        <IconButton color='secondary' onClick={() => deleteTodo(todo.id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default Row;
