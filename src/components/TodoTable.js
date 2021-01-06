import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './Row';
import { Typography } from '@material-ui/core';
import TodoContext from '../context/todo/todoContext';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: '75vw',
  },
});
export default function BasicTable() {
  const { todos } = useContext(TodoContext);
  useEffect(() => {}, [todos]);
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.table} mx={2}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>THINGS TO DO</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>Completed</Typography>
            </TableCell>
            <TableCell align='right'></TableCell>
            <TableCell align='left'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.length &&
            todos.map((todo) => <Row todo={todo} key={todo.id} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
