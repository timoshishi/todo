import React, { useContext, useState } from 'react';
import TodoContext from '../context/todo/todoContext';
import {
  Typography,
  Button,
  Box,
  Checkbox,
  FormLabel,
  Input,
  Paper,
} from '@material-ui/core';

const Form = (props) => {
  const todoContext = useContext(TodoContext);

  const { addTodo } = todoContext;

  const [todoData, setTodoData] = useState('');
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoData('');
    setChecked(false);
    addTodo({ text: todoData, completed: checked });
  };

  return (
    <Box component={Paper} mx={2} style={{ maxHeight: '300px' }}>
      <Box display='flex' justifyContent='center' my={1}>
        <Typography variant='h5'>Add A Todo</Typography>
      </Box>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '1rem',
          marginTop: '2rem',
          width: '300px',
        }}>
        <Input
          placeholder='add your todo'
          label='todo'
          value={todoData}
          onChange={(e) => setTodoData(e.target.value)}
          style={{ width: '100%' }}
          required
        />
        <br />
        <Box my={4}>
          <FormLabel>Mark as complete</FormLabel>
          <Checkbox
            label='Mark Complete'
            value={checked}
            checked={checked}
            onClick={() => {
              setChecked(!checked);
            }}
          />
        </Box>

        <Button type='submit' variant='outlined'>
          Add Todo
        </Button>
      </form>
    </Box>
  );
};

Form.propTypes = {};

export default Form;
