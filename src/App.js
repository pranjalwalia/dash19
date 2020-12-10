import React, { useState } from "react";
import "./App.css";

import { FormControl, MenuItem, Select } from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState();

  return (
    <div className="app">
      {/* header */}
      {/* title  + select dropdown field */}
      <div className="app__header">
        <h1>DashBoard Covid-19</h1>

        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value="abc"
            onChange={() => console.log(123)}
          >
            {/* loop through countries and create a dropdown for each, i.e. use component state */}
          </Select>
        </FormControl>
      </div>
      {/* infoBox */}
      {/* infoBox */}
      {/* infoBox */}

      {/* table */}
      {/* graph */}

      {/* map */}
    </div>
  );
}

export default App;
