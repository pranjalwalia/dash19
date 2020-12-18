import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import "../static/Popup.css";

export const sortCasesDescending = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
};

export const formatCaseStats = (caseStatistics) => {
  return caseStatistics ? `+${numeral(caseStatistics).format("0.0a")}` : "+0";
};

const caseColorComposition = {
  cases: {
    scaleFactor: 800,
    inputOptions: { color: "#cc1034", fillColor: "#cc1034" },
  },
  recovered: {
    scaleFactor: 1200,
    inputOptions: { color: "#7dd71d", fillColor: "#7dd71d" },
  },
  deaths: {
    scaleFactor: 2000,
    inputOptions: { color: "#ff6c47", fillColor: "#ff6c47" },
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
          ? caseColorComposition[type].selected
          : caseColorComposition[type].hex
      }
      fillColor={caseColorComposition[type].hex}
      pathOptions={caseColorComposition[type].inputOptions}
      radius={
        Math.sqrt(country[type]) * caseColorComposition[type].scaleFactor * 0.4
      }
    >
      <Popup className="request-popup">
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
