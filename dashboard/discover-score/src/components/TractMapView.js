import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Polygon, MarkerF, InfoBoxF } from "@react-google-maps/api";
import tract_polygon from "./tract_polygon.json"



export default function Home(props) {
  const { tractFocus, setbDataFips } = props
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDL9xtKQu2M7bUivyEn0W9Y2XXW_2dvph0",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <TractMapView tractFocus = {tractFocus} setbDataFips = {setbDataFips}/>;
}





const TractMapView = (props) => {
  const { tractFocus, setbDataFips } = props

  const [center, setCenter] = useState({lat: 42.37, lng: -83.11})

  let fipsToCenterMapping = {}



  function renderTractPolygons() {
    return tract_polygon.map(each_polygon => {
      let coordArr = []
      let region = each_polygon.geometry
      let fips = each_polygon.properties.TRACTCE
      let coordinates = region.coordinates[0][0]
      let pop = each_polygon.properties.pop_population
      coordinates.map(coordinate => coordArr.push({lat: coordinate[1], lng: coordinate[0]}))
      var fcolor = "";
      switch(true) {
        case ( pop === 0 || pop === null): fcolor = '#d4d4d4'; break;
        case ( pop <= 1383 ): fcolor = '#F4EB89'; break;
        case ( pop <= 2005): fcolor = '#C4CE7B'; break;
        case ( pop <= 2560 ): fcolor = '#99B16E'; break;
        case ( pop <= 3020 ): fcolor = '#749361'; break;
        case ( pop <= 3612 ): fcolor = '#547553'; break;
        case ( pop <= 4384 ): fcolor = '#395842'; break;
        case ( pop <= 7688 ): fcolor = '#233B30'; break;
        default: fcolor = '#d4d4d4'; break;
      }
      // console.log('FIPS', fips)
      // console.log("coords", coordArr)
      return (
        <Polygon
          path={coordArr}
          options={{fillColor: fcolor,
          strokeWeight: 3,
          strokeColor: 'white',
          fillOpacity: 0.7,
          strokeOpacity: 1,
          zIndex: 0,}}
          onClick={(e) => setbDataFips(parseInt(fips))}
        />
      )
    });
  }

  function renderTractPolygonLabels() {
    return tract_polygon.map(each_polygon => {
      let coordArr = []
      let region = each_polygon.geometry
      let coordinates = region.coordinates[0][0]
      let fips = each_polygon.properties.TRACTCE
      coordinates.map(coordinate => coordArr.push({lat: coordinate[1], lng: coordinate[0]}))
      let bounds = new window.google.maps.LatLngBounds();
      for(var i=0; i<coordArr.length; i++) {
        bounds.extend(coordArr[i])
      }
      // get center of polygon
      let polygonCenter = bounds.getCenter().toJSON()
      fipsToCenterMapping[fips] = polygonCenter
      // console.log("FIPStoCenter", fipsToCenterMapping)
      // console.log("Polygon center", polygonCenter)
      var fcolor = "";
      return (
        <MarkerF
          icon={" "}
          position={{ lat: polygonCenter.lat, lng: polygonCenter.lng }}
          label={ fips }
        />
        // <InfoBoxF
        //   position={{ lat: polygonCenter.lat, lng: polygonCenter.lng }}
        //   content = {fips}
        // />
      )
    });
  }
  useEffect(() => {
    // console.log("FIPSTOCENTER", fipsToCenterMapping)
    let centerVal = fipsToCenterMapping[tractFocus]
    console.log("CenterVal: ", centerVal)
    setCenter({lat: centerVal.lat, lng: centerVal.lng})
  }, [tractFocus])

  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      {renderTractPolygons()}
      {renderTractPolygonLabels()}
    </GoogleMap>
  );
}
