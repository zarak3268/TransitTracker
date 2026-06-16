import React, { useState, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import L, { type LatLngExpression } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface Props {
  position: LatLngExpression;
  children: ReactNode;
}

const StopMarker = ({ position, children }: Props) => {
  const [inBounds, setInBounds] = useState(true);
  const map = useMapEvents({
    moveend: () => setInBounds(map.getBounds().contains(position)),
    zoomend: () => setInBounds(map.getBounds().contains(position)),
  });
  const icon = L.divIcon({
    html: renderToString(
      <LocationOnIcon
        sx={{
          color: "#1976d2",
          fontSize: 32,
        }}
      />,
    ),
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
  return (
    inBounds && (
      <Marker position={position} icon={icon}>
        {children}
      </Marker>
    )
  );
};

export default StopMarker;
