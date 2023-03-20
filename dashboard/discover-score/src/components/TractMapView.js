import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import tract_polygon from "./tract_polygon.json"

export default function Home(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDL9xtKQu2M7bUivyEn0W9Y2XXW_2dvph0",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <TractMapView/>;
}

function renderRegions() {
  return tract_polygon.map(each_polygon => {
    let coordArr = []
    let region = each_polygon.geometry
    let coordinates = region.coordinates[0][0]
    let pop = each_polygon.properties.pop_population
    coordinates.map(coordinate => coordArr.push({lat: coordinate[1], lng: coordinate[0]}))
    var fcolor = "";
    switch(true) {
      case ( pop == 0 || pop === null): fcolor = '#d4d4d4'; break;
      case ( pop <= 1383 ): fcolor = '#F4EB89'; break;
	    case ( pop <= 2005): fcolor = '#C4CE7B'; break;
	    case ( pop <= 2560 ): fcolor = '#99B16E'; break;
	    case ( pop <= 3020 ): fcolor = '#749361'; break;
	    case ( pop <= 3612 ): fcolor = '#547553'; break;
	    case ( pop <= 4384 ): fcolor = '#395842'; break;
	    case ( pop <= 7688 ): fcolor = '#233B30'; break;
	    default: fcolor = '#d4d4d4'; break;
    }
    console.log("coords", coordArr)
    return (
      <Polygon
        path={coordArr}
        options={{
          fillColor: fcolor,
          strokeWeight: 1,
          strokeColor: 'white',
          fillOpacity: 0.7,
          strokeOpacity: 1,
          zIndex: 0
      }}
      />
    )
  });
}

const TractMapView = (props) => {
  const [center] = useState({lat: 42.37, lng: -83.11})

  useEffect(() => {
  })

  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
      {renderRegions()}
    </GoogleMap>
  );
}
