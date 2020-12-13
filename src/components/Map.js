import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { showDataonMap } from "../utils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "../Map.css";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

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
        {/* <Marker position={center}></Marker> */}
        {showDataonMap(countries, type, selectedCountry)}
        {selectedCountry !== "worldwide" && <Marker position={center}></Marker>}
      </MapContainer>
    </div>
  );
}

export default Map;
