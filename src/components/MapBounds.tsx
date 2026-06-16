import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

const MapBounds = () => {
  const map = useMapEvents({
    moveend: () => console.log(map.getBounds()),
    zoomend: () => console.log(map.getBounds()),
  });
  return null;
};

export default MapBounds;
