import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination(props: any) {

  return (
    <TablePagination
      component="div"
      count={props.count}
      page={props.onPage}
      onPageChange={props.onHandleChangePage}
      rowsPerPage={props.rowsPerPage}
      onRowsPerPageChange={props.onHandleChangeRowsPerPage}
    />
  );
}
