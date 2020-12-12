import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { showDataonMap } from "../utils";
import "../Map.css";

//! add in ChangeView.js
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map(props) {
  const { center, zoom, countries, type, selectedCountry } = props;

  return (
    <div className="map">
      <MapContainer
        className="markercluster-map"
        center={center}
        zoom={zoom}
        maxZoom={18}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetLeafletMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataonMap(countries, type)}
      </MapContainer>
    </div>
  );
}

export default Map;
