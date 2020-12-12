import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import "../Map.css";

function Map(props) {
  return (
    <div className="map">
      <MapContainer
        className="markercluster-map"
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetLeafletMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default Map;
