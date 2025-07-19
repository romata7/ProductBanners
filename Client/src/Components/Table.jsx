import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

export const Table = ({ columns = [], data = [], rowKey = 'id' }) => {

  if (data.length === 0) {
    return (
      <div className="alert alert-info">
        No hay datos para mostrar
      </div>
    );
  }

  return (
    <BootstrapTable striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.field}
              style={{
                width: column.width || 'auto',
                textAlign: column.align || 'left'
              }}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item[rowKey]}>
            {columns.map((column) => (
              <td
                key={`${item[rowKey]}-${column.field}`}
                style={{ textAlign: column.align || 'left' }}
              >
                {column.format
                  ? column.format(item[column.field] || item)
                  : item[column.field]
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  );
};