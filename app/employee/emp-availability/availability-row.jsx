// TableRow.js

import React from 'react';
import AvbSelector from './availability-selector';
//import { convertTimeStamp } from '../../lib/utilities';

const TableRow = ({ rowData, options, onSelectChange }) => {
  const handleSelectChange = (e) => {
    onSelectChange(rowData.id, e.target.value);
  };

  return (
    <tr>
      <td>{rowData.day}</td> {/* Replace with actual data fields */}
      <td>
        <AvbSelector
          options={options}
          value={rowData.selectedOption}
          onChange={handleSelectChange}
        />
      </td>
    </tr>
  );
};

export default TableRow;
