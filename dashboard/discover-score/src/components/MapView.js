import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { bDataReq } from "../utils";

export default function Home(props) {
  const { granularData } = props
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDL9xtKQu2M7bUivyEn0W9Y2XXW_2dvph0",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapView granularData={granularData}/>;
}

const MapView = (props) => {
  const { granularData } = props
  const [dataPoints, setDataPoints] = useState([])
  // const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [center, setCenter] = useState({lat: 44, lng: -80})

  // useEffect(() => {
  //   bDataReq(setDataPoints)
  //   if(granularData.length > 0) {
  //     setCenter({lat: granularData[0].lat, lng: granularData[0].lng})
  //   }
  // })

  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      {granularData.map((value, index) =>
        <MarkerF position={{lat: value.lat, lng:value.lng}} label={value.id} onClick={(e) => console.log("Clicked", e)}/>
      )}
    </GoogleMap>
  );
}
