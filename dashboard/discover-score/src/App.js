import React, {useState } from 'react';

import './App.css';
import View from './components/View'

function App() {

  const [granularView, setGranularView] = useState(false)

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
      <View showGranularView={granularView}/>
    </div>
  );
}

export default App;
