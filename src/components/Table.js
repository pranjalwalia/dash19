import React from "react";

import "../Table.css";

function Table(props) {
  const { countries } = props;
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>{country.cases}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
