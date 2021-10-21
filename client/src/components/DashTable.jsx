import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, pose, flows, joes, otherdata) {
  return {
    name, pose, flows, joes, otherdata,
  };
}

const rows = [
  createData('Downward Dog', 159, 6.0, 24, 4.0),
  createData('sravasana', 237, 9.0, 37, 4.3),
  createData('percolanyasa', 262, 16.0, 24, 6.0),
  createData('ohcoolatta', 305, 3.7, 67, 4.3),
  createData('dragon drop', 356, 16.0, 49, 3.9),
];

function DashTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Pose</TableCell>
            <TableCell align="right">Flow&nbsp;(g)</TableCell>
            <TableCell align="right">Duration&nbsp;(g)</TableCell>
            <TableCell align="right">Yoga&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DashTable;
