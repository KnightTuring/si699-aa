import React, { useEffect, useState } from "react";
import DataView from './DataView';
import MapView from './MapView';
import TractMapView from './TractMapView'
import TractDataView from './TractDataView'

import { bDataReq } from "../utils";

const View = (props) => {
    const {showGranularView} = {props}
    const [granularData, setGranularData] = useState([])

    useEffect(() => {
        bDataReq(setGranularData)
    })

    if(showGranularView === false) {
        return (
            <div className='main-disp-container'>
              <div className='container vertical-scrollable'>
                <DataView granularData = {granularData}/>
              </div>
              <MapView granularData = {granularData}/>
          </div>
        )
    } else {
        return (
            <div className='main-disp-container'>
              <div className='container vertical-scrollable'>
                <TractDataView granularData = {granularData}/>
              </div>
              <TractMapView granularData = {granularData}/>
          </div>
        )
    }
}

export default View;