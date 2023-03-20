// Initialize and add the map
function initMap() {
  // rough geographical center of Ann Arbor
  const ctr = {lat: 42.27684,lng: -83.73438};
  // The map, centered on Ann Arbor, at an appropriate zoom level
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: ctr,
  });

    // load the geojson data from QGIS into a data layer
    map.data.loadGeoJson('wash_pop.geojson');

    // conditionally sets the color of the tile based on the population feature added
    map.data.setStyle((feature) => {
    var pop = feature.getProperty('washpop_population');
    var fcolor = "";

    switch(true) {
    case ( pop == 0 || pop === null):
        fcolor = '#d4d4d4'; break;
    case ( pop <= 955 ): fcolor = '#F4EB89'; break;
	case ( pop <= 2369): fcolor = '#C4CE7B'; break;
	case ( pop <= 3025 ): fcolor = '#99B16E'; break;
	case ( pop <= 3660 ): fcolor = '#749361'; break;
	case ( pop <= 4808 ): fcolor = '#547553'; break;
	case ( pop <= 7371 ): fcolor = '#395842'; break;
	default: fcolor = '#d4d4d4'; break;
    }

    return {
 		fillColor: fcolor,
 		strokeWeight: 1,
 		strokeColor: 'white',
 		fillOpacity: 0.7,
 		strokeOpacity: 1,
 		zIndex: 0
	};
  });

   // creates the hover response, tempting the user to click
  map.data.addListener("mouseover", (event) => {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, { strokeWeight: 8 });
  });
  map.data.addListener("mouseout", (event) => {
    map.data.revertStyle();
  });

  // raises an info window when the user clicks on a tile, containing the census tract name and population
  var infowindow = new google.maps.InfoWindow();
  map.data.addListener("click", (event) => {
    var population = event.feature.getProperty('washpop_population');
    var tract_name = event.feature.getProperty('NAMELSAD')
    var latitude = parseFloat(event.feature.getProperty('INTPTLAT'))
    var longitude = parseFloat(event.feature.getProperty('INTPTLON'))
    //console.log(properties)
    var content = '<h1>'+ tract_name +'</h1>' + '<h2>Population: ' + population + '</h2>'
    infowindow.setContent(content)
    infowindow.open({map})
    infowindow.setPosition({lat:latitude, lng:longitude})
  });



    // access the button and message divs and add an event listener
  const message = document.querySelector('#message')
  const btn = document.querySelector('#show');
  // get the user's current location
  btn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  })
  // if successful, print the location as a message and plot a marker
  function onSuccess(position) {
    console.log(position)
    const x = position.coords.latitude
    const y = position.coords.longitude
    message.classList.add('success');
    message.textContent = `SI 699 Location: (${x},${y})`;

    const loc = {lat:x, lng:y};
    const marker = new google.maps.Marker({
        position: loc,
        map: map
    });
  }
  // error handling
  function onError() {
        message.classList.add('error');
        message.textContent = `Failed to get your location!`;
    }
};

window.initMap = initMap;