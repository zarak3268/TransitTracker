import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import type { Route } from "../types/gtfs";
import { CheckBox } from "@mui/icons-material";

interface Props {
  routes: Route[];
}

const RoutesPanel = ({ routes }: Props) => {
  return (
    <Box
      sx={{
        height: "fit-content",
        width: "15vh",
        position: "absolute",
        top: 100,
        left: 0,
        marginLeft: "15px",
        zIndex: 1000,
        backgroundColor: "	rgb(128,128,128, 0.8)",
      }}
    >
      <h4 style={{ textAlign: "center" }}>Routes</h4>
      {routes.map((route) => (
        <FormControlLabel
          style={{
            margin: "2px",
          }}
          key={`route-checkbox-${route.route_id}`}
          control={
            <Checkbox
              sx={{
                color: `#${route.route_color}`,
                "&.Mui-checked": {
                  color: `#${route.route_color}`,
                },
              }}
            />
          }
          label={route.route_short_name}
        />
      ))}
    </Box>
  );
};

export default RoutesPanel;
