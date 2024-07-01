import React from 'react';
import { useTable, useSortBy } from 'react-table';
import {IconArrowUp,IconArrowDown} from '@tabler/icons-react';
import PropTypes from 'prop-types';
import '../dist/InfoTableModule.css';

const InfoTable = ({ data, columns ,operation,opr}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
      },
    },
    useSortBy // Hook for sorting functionality
  );
  // const handleDelete = (id) => {
  //   //  delete function
  //   // Replace with  API call)
  //   alert(`${operation} item with ID: ${id}`);
  // };

  return (
    <div className="info-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Render sort indicator */}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? <IconArrowDown/> : <IconArrowUp/>) : ''}
                  </span>
                </th>
              ))}
              <th>
                Operation
              </th>
            </tr>

          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
                <td>
                  <button onClick={()=>opr(row.original.id)}>{operation}</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

InfoTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  operation:PropTypes.string,
  opr: PropTypes.func.isRequired,

};

export default InfoTable;
