import { Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

function Table({ needyData, onDelete }) {
  return (
    <>
    <TableContainer component={Paper} >
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'lightgray' }}>
            <TableCell ></TableCell>
            <TableCell sx={{ fontWeight: '700' }}>Needies</TableCell>
            <TableCell sx={{ fontWeight: '700' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: '700' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {needyData?.map((needy, i) => (
            <TableRow key={i}>
              <TableCell sx={{ fontWeight: '700', color :"brown" }}>{i+1}) </TableCell>
              <TableCell>{needy.name}</TableCell>
              <TableCell>{needy.amount}</TableCell>
              <TableCell>
                <button
                  className='btn btn-danger mx-2'
                  onClick={() => onDelete(needy.name)}> Remove </button>
                  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
    </>
  );
}

export default Table;
