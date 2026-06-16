from fastapi import FastAPI, Response, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

stops_df = pd.read_csv('schedule/stops.txt', sep=',')
routes_df = pd.read_csv('schedule/routes.txt', sep=',')

class Stop(BaseModel):
    stop_id: int
    stop_code: int | str | None = None
    stop_name: str | None
    stop_desc: str | None
    lat: float
    lon: float
    location_type: int | float | None
    parent_station: int | float | None
    wheelchair_boarding: int | float | None

class Route(BaseModel):
    route_id: int
    route_short_name: str
    route_long_name: str
    route_type: int
    route_color: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return "Hello World"

@app.get("/stops")
async def getStops() -> list[Stop]:
    stops = []
    for row in stops_df.itertuples(False):
        stops.append(Stop(
            stop_id=row.stop_id,
            stop_code=row.stop_code if not pd.isna(row.stop_code) else None,
            stop_name=row.stop_name if not pd.isna(row.stop_name) else None,
            stop_desc=row.stop_desc if not pd.isna(row.stop_desc) else None,
            lat=row.stop_lat,
            lon=row.stop_lon,
            location_type=row.location_type if not pd.isna(row.location_type) else None,
            parent_station=row.parent_station if not pd.isna(row.parent_station) else None,
            wheelchair_boarding=row.wheelchair_boarding if not pd.isna(row.wheelchair_boarding) else None,
        ))
    return stops

@app.get("/routes")
async def getRoutes() -> list[Route]:
    routes = []
    for row in routes_df.itertuples(False):
        routes.append(Route(
            route_id=row.route_id,
            route_short_name=row.route_short_name,
            route_long_name=row.route_long_name,
            route_type=row.route_type,
            route_color=row.route_color
        ))
    return routes
