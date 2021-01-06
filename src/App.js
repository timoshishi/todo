import React, { useContext, useEffect } from 'react';
import { Box, Typography, Grid, Input } from '@material-ui/core';
import TodoContext from './context/todo/todoContext';
import TodoTable from './components/TodoTable';
import Form from './components/Form';
const App = () => {
  const todoContext = useContext(TodoContext);
  const { todos, getTodos } = todoContext;

  useEffect(() => {
    getTodos();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <Grid container />
      <Box display='flex' justifyContent='center'>
        <Typography variant='h3'>Todo List</Typography>
      </Box>
      <Box display='flex' justifyContent='center'>
        <Typography variant='h5'>Why even try?</Typography>
      </Box>
      <Box display='flex' justifyContent='center'></Box>
      <Box>
        <Grid item m={8}>
          <Box display='flex' justifyContent='center' my={4}>
            {todos.length ? <TodoTable todos={todos} /> : null}
            <Form />
          </Box>
        </Grid>
        <Grid item m={4}></Grid>
      </Box>
    </div>
  );
};

export default App;
