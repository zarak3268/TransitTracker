export interface Stop {
  stop_id: number;
  stop_code: number | string | null;
  stop_name: string | null;
  stop_desc: string | null;
  lat: number;
  lon: number;
  location_type: number | null;
  parent_station: number | null;
  wheelchair_boarding: number | null;
}

export interface Route {
  route_id: number;
  route_short_name: string;
  route_long_name: string;
  route_type: number;
  route_color: string;
}
