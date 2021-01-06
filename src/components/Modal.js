import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TodoContext from '../context/todo/todoContext';
import {
  Typography,
  TextareaAutosize,
  Button,
  Box,
  Checkbox,
  FormLabel,
} from '@material-ui/core';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ open, handleClose, currentSelection }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const todoContext = useContext(TodoContext);

  const { deleteTodo, updateTodo, clearSelection, addTodo } = todoContext;

  const [todoData, setTodoData] = useState({ ...currentSelection });
  const [checked, setChecked] = useState(currentSelection.complete);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSelection.id) {
      updateTodo(todoData);
      clearSelection();
      handleClose();
    } else {
      addTodo(todoData);
      clearSelection();
      handleClose();
    }
  };

  console.log('todoData.text', todoData);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'>
        <form
          style={modalStyle}
          className={classes.paper}
          onSubmit={handleSubmit}>
          {currentSelection && (
            <Box
              display='flex'
              flexDirection='column'
              alignContent='center'
              justifyContent='center'>
              <Typography
                variant='h5'
                id='simple-modal-title'
                textalign='center'>
                Todo
              </Typography>
              <TextareaAutosize
                aria-label='minimum height'
                rows={3}
                // placeholder='add your todo'
                label='todo'
                value={todoData.text}
                onChange={(e) =>
                  setTodoData({ ...todoData, text: e.target.value })
                }
              />
              <br />
              <Box>
                <FormLabel>Mark as complete</FormLabel>
                <Checkbox
                  label='Mark Complete'
                  value={checked}
                  checked={checked}
                  onClick={() => {
                    setChecked(!checked);
                    setTodoData({ ...todoData, complete: checked });
                  }}
                />
              </Box>
              <Box>
                {currentSelection.id ? (
                  <Button
                    color='secondary'
                    onClick={() => {
                      deleteTodo(currentSelection.id);
                      handleClose();
                    }}>
                    Delete Todo
                  </Button>
                ) : null}
                <Button type='submit'>
                  {currentSelection.id ? 'Update Todo' : 'Add Todo'}
                </Button>
              </Box>
            </Box>
          )}
        </form>
      </Modal>
    </div>
  );
}
