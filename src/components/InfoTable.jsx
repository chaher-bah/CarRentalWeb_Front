import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import '../dist/InfoTableModule.css';

const InfoTable = ({ data, columns, operations }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: {},
    },
    useSortBy
  );

  return (
    <div className="info-table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <IconArrowDown />
                        : <IconArrowUp />
                      : ''}
                  </span>
                </th>
              ))}
              <th>Operations</th>
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
                  <select
                  style={{fontFamily:'Roboto,sansSerif',height:"-webkit-fill-available",backgroundColor:"bisque"}}
                    onChange={(e) => {
                      const selectedOperation = operations.find(op => op.name === e.target.value);
                      if (selectedOperation) {
                        selectedOperation.action(row.original.id);
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled style={{fontSize:"1.5rem"}}>sélectionner une opération</option>
                    {operations.map((op, index) => (
                      <option key={index} value={op.name} style={{backgroundColor:"#E4003A",alignText:"center",fontSize:"1.5rem"}}>{op.name}</option>
                    ))}
                  </select>
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
  operations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  })).isRequired,
};

export default InfoTable;