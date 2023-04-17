import React, { useEffect, useState } from "react";
import DataView from './DataView';
import MapView from './MapView';
import TractMapView from './TractMapView'
import TractDataView from './TractDataView'

import { bDataReq, bTractDataReq, tractDataReq } from "../utils";

const View = (props) => {
    const {showGranularView, fetchData, setGranularView} = props
    const [granularData, setGranularData] = useState([])
    const [tractData, setTractData] = useState([])
    const [tractFocus, setTractFocus] = useState(520800)
    const [bDataFips, setbDataFips] = useState(520800)

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
      console.log("Fetch businesses for tract"+bDataFips)
      bTractDataReq(setGranularData, setGranularView, bDataFips)
      // setGranularView(true)
      forceUpdate()
    }, [bDataFips])

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
                <TractDataView tractData = {tractData} setTractFocus = {setTractFocus}/>
              </div>
              <TractMapView tractData = {tractData} tractFocus = {tractFocus} setbDataFips = {setbDataFips}/>
          </div>
        )
    }
}

export default View;