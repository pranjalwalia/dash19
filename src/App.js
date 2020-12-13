import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";

import "./App.css";
import { sortData, prettyPrintStat } from "./utils";

import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
// import MapTest from "./components/MapTest";

//! leaftlet CDN css
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 41.5744, lng: 64.1833 }); //! somewhere in kazak
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountry("worldwide");
        setCountryInfo(data);
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
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries); //! contains only the country codes
        });
    };
    getCountriesData();
  }, []);

  //! causes zoom issues
  // useEffect(() => {
  //   if (country === "worldwide") {
  //     setMapZoom(2);
  //   } else {
  //     setMapZoom(4);
  //   }
  // }, [mapCenter, country]);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        // setMapZoom(3);

        if (data.countryInfo) {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        } else {
          setMapCenter([41.5744, 64.1833]);
          setMapZoom(3);
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
              {/* </TextField> */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => {
              setCasesType("cases");
            }}
            title="Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(event) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <div className="app__map">
          {/* <MapTest center={mapCenter} zoom={mapZoom} /> */}
          <Map
            type={casesType}
            countries={mapCountries}
            selectedCountry={country}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3 align="center">Live Cases by Country</h3>
          <Table countries={tableData} />
          <br />
          <h3 align="center">WorldWide New {casesType}</h3>
          <LineGraph type={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
