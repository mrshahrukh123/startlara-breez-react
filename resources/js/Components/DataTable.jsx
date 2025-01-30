import React from 'react';
import DataTable from 'react-data-table-component';

const CustomDataTable = ({ columns, data, pagination, progressPending, paginationServer, paginationTotalRows, paginationPerPage, onChangePage, onChangeRowsPerPage }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination={pagination}
      progressPending={progressPending}
      paginationServer={paginationServer}
      paginationTotalRows={paginationTotalRows}
      paginationPerPage={paginationPerPage}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      highlightOnHover
      responsive
    />
  );
};

export default CustomDataTable;
