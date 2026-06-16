import { useEffect, useRef, useState } from "react";
import { MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { type Route, type Stop } from "./types/gtfs";
import StopMarker from "./components/StopMarker";
import MapBounds from "./components/MapBounds";
import RoutesPanel from "./components/RoutesPanel";
import { Box } from "@mui/material";

function App() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/stops")
      .then((response) => response.json())
      .then((stops: Stop[]) => setStops(stops))
      .catch((error) => console.log(error));

    fetch("http://127.0.0.1:8000/routes")
      .then((response) => response.json())
      .then((routes: Route[]) => {
        console.log("Before:\n", routes);
        routes.sort((a, b) =>
          a.route_short_name.localeCompare(b.route_short_name, undefined, {
            numeric: true,
          }),
        );
        console.log("After: \n", routes);
        setRoutes(routes);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <RoutesPanel routes={routes} />
      <MapContainer
        center={[43.545736, -80.244644]}
        zoom={13}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stops.map((stop, idx) => (
          <StopMarker position={[stop.lat, stop.lon]} key={`marker-${idx}`}>
            <Popup>
              <h2>{stop.stop_name}</h2>
            </Popup>
          </StopMarker>
        ))}
        <MapBounds />
      </MapContainer>
    </>
  );
}

export default App;
