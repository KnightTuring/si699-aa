import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function Home(props) {
  const { granularData } = props
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDL9xtKQu2M7bUivyEn0W9Y2XXW_2dvph0",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <TractMapView granularData={granularData}/>;
}

const TractMapView = (props) => {
  const { granularData } = props
  const [dataPoints, setDataPoints] = useState([])
  // const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [center, setCenter] = useState({lat: 44, lng: -80})

  useEffect(() => {
  })

  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
    </GoogleMap>
  );
}
