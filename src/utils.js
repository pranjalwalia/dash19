import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
};

export const prettyPrintStat = (stat) => {
  return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
};

const casesTypeColors = {
  cases: {
    multiplier: 800,
    option: { color: "#cc1034", fillColor: "#cc1034" },
  },
  recovered: {
    multiplier: 1200,
    option: { color: "#7dd71d", fillColor: "#7dd71d" },
  },
  deaths: {
    multiplier: 2000,
    option: { color: "#ff6c47", fillColor: "#ff6c47" },
  },
};

//! draw circles on map with interactive tool-tips
export const showDataonMap = (data, type = "cases", selectedCountry) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={
        country.countryInfo.iso2 === selectedCountry
          ? casesTypeColors[type].selected
          : casesTypeColors[type].hex
      }
      fillColor={casesTypeColors[type].hex}
      pathOptions={casesTypeColors[type].option}
      radius={Math.sqrt(country[type]) * casesTypeColors[type].multiplier * 0.4}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

/*export const showDataOnMap = (data, casesType, selectedCountry) =>
  data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={
        country.countryInfo.iso2 === selectedCountry
          ? casesTypeColors[casesType].selected
          : casesTypeColors[casesType].hex
      }
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-cases">
            Cases: {numeral(country.cases).format("0.0a")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0.0a")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0.0a")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));*/
