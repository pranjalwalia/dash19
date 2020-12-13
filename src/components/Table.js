import React from "react";
import numeral from "numeral";

import "../Table.css";

function Table(props) {
  const { countries } = props;
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>
            <img src={country.countryInfo.flag} width="45px"></img>
          </td>
          <td>{country.country}</td>
          <td>{numeral(country.cases).format("0,")}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
