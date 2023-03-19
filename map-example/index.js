// Initialize and add the map
function initMap() {

  // var data = [] Can copy lat, long, weight dicts here to make a heatmap (this part's commented out)

  // rough geographical center of Detroit
  const ctr = { lat: 42.37, lng: -83.11 };
  // The map, centered on Detroit
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: ctr,
  });
  // testing marker
  const marker = new google.maps.Marker({
    position: ctr,
    map: map,
  });

  /* let weight
  let heatData = [];

  for (var i = 0; i < data.length; i++) {
  var weighted = {};
  weight = data[i].weight;
  weighted.location = new google.maps.LatLng(
  data[i].lat,
  data[i].lon);
  weighted.weight = weight
  heatData.push(weighted)
  }

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatData,
  radius: 120,
  opacity: 0.5,
  //gradient: ['rgba(255,255,255,1)', 'rgba(213,237,211,1)', 'rgba(175,221,171,1)', 'rgba(130,202,123,1)', 'rgba(105,191,97,1)', 'rgba(84,182,75,1)', 'rgba(69,170,71,1)', 'rgba(56,159,67,1)', 'rgba(43,148,63,1)', 'rgba(25,134,58,1)', 'rgba(9,121,54,1)'],
});
//heatmap.setMap(map);

*/

    map.data.loadGeoJson('newermap.geojson');

    map.data.setStyle((feature) => {
        var pop = feature.getProperty('pop_population');
        var fcolor = "";
        switch(true) {
        case ( pop == 0 || pop === null):
            fcolor = '#d4d4d4'; break;
        case ( pop <= 1383 ): fcolor = '#F4EB89'; break;
	    case ( pop <= 2005): fcolor = '#C4CE7B'; break;
	    case ( pop <= 2560 ): fcolor = '#99B16E'; break;
	    case ( pop <= 3020 ): fcolor = '#749361'; break;
	    case ( pop <= 3612 ): fcolor = '#547553'; break;
	    case ( pop <= 4384 ): fcolor = '#395842'; break;
	    case ( pop <= 7688 ): fcolor = '#233B30'; break;
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


  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Example Window</h1>' +
    '<div id="bodyContent">' +
    "<p>Here's some example text.</p>" +
    "</div>" +
    "</div>";

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Example",
    position: {lat: 42.3,lng: -83.0}
  });

  // When the user clicks, set 'isColorful', changing the color of the letters.
  map.data.addListener("click", (event) => {
    //event.feature.setProperty("isColorful", true);
    infowindow.open({
        map,
    })

  });
  // When the user hovers, tempt them to click by outlining the letters.
  // Call revertStyle() to remove all overrides. This will use the style rules
  // defined in the function passed to setStyle()
  map.data.addListener("mouseover", (event) => {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, { strokeWeight: 8 });
  });
  map.data.addListener("mouseout", (event) => {
    map.data.revertStyle();
  });
};


window.initMap = initMap;