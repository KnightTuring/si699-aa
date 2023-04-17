import React, { useEffect, useState } from "react";
import DataView from './DataView';
import MapView from './MapView';
import TractMapView from './TractMapView'
import TractDataView from './TractDataView'

import { bDataReq, tractDataReq } from "../utils";

const View = (props) => {
    const {showGranularView, fetchData} = props
    const [granularData, setGranularData] = useState([])
    const [tractData, setTractData] = useState([])

    useEffect(() => {
      console.log("Refreshing business data")
        bDataReq(setGranularData)
    }, [fetchData])

    useEffect(() => {
      console.log("Refreshing tract data")
        tractDataReq(setTractData)
    }, [fetchData])



    if(showGranularView === true) {
        console.log("Showing granular view")
        return (
            <div className='main-disp-container'>
              <div className='container vertical-scrollable'>
                <DataView granularData = {granularData}/>
              </div>
              <MapView granularData = {granularData}/>
          </div>
        )
    } else {
      console.log("Showing tract view")
        return (
            <div className='main-disp-container'>
              <div className='container vertical-scrollable'>
                <TractDataView tractData = {tractData}/>
              </div>
              <TractMapView tractData = {tractData}/>
          </div>
        )
    }
}

export default View;