import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";

import "./static/App.css";
import { sortCasesDescending, formatCaseStats } from "./utils";

import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";

//! leaftlet CDN css
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("worldwide");
  const [currentCountryInfo, setCurrentCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [currentMapCenter, setCurrentMapCenter] = useState({
    lat: 41.5744,
    lng: 64.1833,
  }); //! somewhere in kazak
  const [currentMapZoom, setCurrentMapZoom] = useState(3);
  const [currentMapCountries, setCurrentMapCountries] = useState([]);
  const [currentCasesType, setCurrentCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCurrentCountry("worldwide");
        setCurrentCountryInfo(data);
      });
  }, []);

  /** remove this debug shit  **/

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
          const sortedData = sortCasesDescending(data);
          setTableData(sortedData);
          setCurrentMapCountries(data);
          setCountries(countries); //! contains only the country codes
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCurrentCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCurrentCountry(countryCode);
        setCurrentCountryInfo(data);

        if (data.countryInfo) {
          setCurrentMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setCurrentMapZoom(4);
        } else {
          setCurrentMapCenter([41.5744, 64.1833]);
          setCurrentMapZoom(3);
        }
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1 style={{ color: "red", fontFamily: "courier", fontSize: 30 }}>
            DashBoard Covid-19
          </h1>
          <FormControl className="app__dropdown">
            {/* <TextField
              select
              label="Select"
              value={country}
              onChange={onCountryChange}
            > */}
            <Select
              // native
              variant="outlined"
              value={currentCountry}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide" key={currentCountry.id}>
                WorldWide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.id}>
                  {country.name}
                </MenuItem>
              ))}
              {/* </TextField> */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isRed
            active={currentCasesType === "cases"}
            onClick={(e) => {
              setCurrentCasesType("cases");
            }}
            title="Cases"
            cases={formatCaseStats(currentCountryInfo.todayCases)}
            total={formatCaseStats(currentCountryInfo.cases)}
          />
          <InfoBox
            active={currentCasesType === "recovered"}
            onClick={(event) => setCurrentCasesType("recovered")}
            title="Recovered"
            cases={formatCaseStats(currentCountryInfo.todayRecovered)}
            total={formatCaseStats(currentCountryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={currentCasesType === "deaths"}
            onClick={(e) => setCurrentCasesType("deaths")}
            title="Deaths"
            cases={formatCaseStats(currentCountryInfo.todayDeaths)}
            total={formatCaseStats(currentCountryInfo.deaths)}
          />
        </div>

        <div className="app__map">
          {/* <MapTest center={mapCenter} zoom={mapZoom} /> */}
          <Map
            type={currentCasesType}
            countries={currentMapCountries}
            selectedCountry={currentCountry}
            center={currentMapCenter}
            zoom={currentMapZoom}
          />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3 align="center">Live Cases by Country</h3>
          <Table countries={tableData} />
          <br />
          <h3 align="center">
            Global New {currentCasesType.toString().toUpperCase()}
          </h3>
          <LineGraph type={currentCasesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
