import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { popup } from "leaflet";

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

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16 ,52)",
    half_op: "rgba(204, 16 , 52 ,0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125 , 215 , 29)",
    half_op: "rgba(125 , 215 , 29 , 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251 , 68, 67)",
    half_op: "rgba(251 , 68 , 67 , 0.5)",
    multiplier: 2000,
  },
};

//! draw circles on map with interactive tool-tips
export const showDataonMap = (data, type = "cases") =>
  data.map((country) => (
    <Circle
      fillOpacity={0.4}
      color={casesTypeColors[type].hex}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillColor={casesTypeColors[type].hex}
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
