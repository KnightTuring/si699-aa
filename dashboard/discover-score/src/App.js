import React, {useEffect, useState } from 'react';

import './App.css';
import View from './components/View'

function App() {

  const [granularView, setGranularView] = useState(false)

  if(granularView === false) {
    return (
      <div className="App">
        <div className='container p-2'>
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="pills-home-tab" data-toggle="pill" type="button" role="tab" aria-controls="pills-home" aria-selected="false" onClick={() => setGranularView(false)}>Tract view</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="pills-profile-tab" data-toggle="pill" type="button" role="tab" aria-controls="pills-profile" aria-selected="true" onClick={() => setGranularView(true)}>Granular view</a>
            </li>
          </ul>
        </div>
        <View showGranularView={granularView}/>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <div className='container p-2'>
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a className="nav-link" id="pills-home-tab" data-toggle="pill" type="button" role="tab" aria-controls="pills-home" aria-selected="false" onClick={() => setGranularView(false)}>Tract view</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" id="pills-profile-tab" data-toggle="pill" type="button" role="tab" aria-controls="pills-profile" aria-selected="true" onClick={() => setGranularView(true)}>Granular view</a>
            </li>
          </ul>
        </div>
        <View showGranularView={granularView}/>
      </div>
    );
  }
}

export default App;
