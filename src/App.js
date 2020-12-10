import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import "./App.css";

import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  //! componentDidMount() alternative i.e. runs when component loads or state changes
  //! useEffect( () => , [countries])

  //! we just wanna fire once in the start and never again
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            id: country._id,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>DashBoard Covid-19</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide" key={country.id}>
                WorldWide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Cases" cases={1} total={2000} />
          <InfoBox title="Recovered" cases={12} total={1000} />
          <InfoBox title="Deaths" cases={123} total={100} />
        </div>

        <div className="app__map">
          <Map />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>live cases by country</h3>
          {/* table */}
          <h3>worldwide new cases</h3>
          {/* graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
