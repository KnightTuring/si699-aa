import React, { useEffect, useState } from 'react';

import './App.css';
import DataView from './components/DataView'
import MapView from './components/MapView';
import { bDataReq } from './utils';
function App() {
  const [granularData, setGranularData] = useState([])

  useEffect(() => {
    bDataReq(setGranularData)
  })

  return (
    <div className="App">
      <div className='container p-2'>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a class="nav-link" id="pills-home-tab" data-toggle="pill" type="button" role="tab" aria-controls="pills-home" aria-selected="false">Tract view</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" id="pills-profile-tab" data-toggle="pill" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">Granular view</a>
          </li>
        </ul>
      </div>
      <div className='main-disp-container'>
          <div className='container vertical-scrollable'>
            <DataView granularData = {granularData}/>
          </div>
          <MapView granularData = {granularData}/>
      </div>
    </div>
  );
}

export default App;
