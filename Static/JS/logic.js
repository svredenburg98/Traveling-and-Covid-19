// Creating map object
var myMap = L.map("map", {
  center: [31.57914161455925, -98.2404359954168],
  zoom: 6
});

// Adding tile layer
var baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var layerGroup = L.layerGroup().addTo(myMap);

markersM = [];

// Load in geojson data
var link = "static/data/tx_county.geojson";

//var url = "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson?where=(Confirmed%20%3E%200)%20AND%20Province_State%20%3D%20'Texas'"
var url = "/data"

var choroplethLayer;

var covidCases = [];
var popStayingHome = [];
var popNotHome = [];
var covidDeaths = [];
var trips = [];
var lat = [];
var long = [];


function optionChanged() {

  idChoice = d3.select("#selDataset").node().value;
  if (idChoice == "cases") {
    caseFunction();
  }
  if (idChoice == "deaths") {
    deathFunction();
  }
}
// Grab data with d3 - Choropleth Layer
d3.json(link).then(function (data) {

  // Create a new choropleth layer
  choroplethLayer = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "aland",

    // Set color scale
    //scale: ["#ffffb2", "#b10026"],
    scale: ["black", "black"],

    // Number of breaks in step range
    steps: 5,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 1.0
    },

    // Binding a pop-up to each layer
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<strong>County: <strong>" + feature.properties.name +
        "<br>-----------------------------<br>" +
        "<br>Population Staying Home:<br>" + popStayingHome +
        "<br>Population Away From Home:<br>" + popNotHome +
        "<br>-----------------------------<br>" +
        "<br>Covid Cases:<r>" + covidCases +
        "<br>Covid Deaths:<br>" + covidDeaths +
        "<br>-----------------------------<br>" +
        "<br><strong>Trips:<strong><br>" + trips);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var limits = choroplethLayer.options.limits;
    var colors = choroplethLayer.options.colors;
    var labels = [];

    // Add min & max to the html
    div.innerHTML = "<h1>Land Area</h1>" +
      "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    limits.forEach(function (limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  //legend.addTo(myMap);

});

// Grab the data with d3 - MarkerCluster Layer
d3.json(url).then(function (response) {

  // Create a new marker cluster group
  //var markers = L.markerClusterGroup();

  // Loop through data
  response.forEach(function (data) {

    // markers.addLayer(L.marker(
    //   L.latLng(
    //     [parseFloat(data.lat),
    //     parseFloat(data.long)])
    // ));

    covidCases = data.covid_cases;
    popStayingHome = data.pop_at_home;
    popNotHome = data.pop_not_at_home;
    trips = data.trips;
    covidDeaths = data.covid_deaths;
    lat = parseFloat(data.lat);
    long = parseFloat(data.long);

    // Add our marker cluster layer to the map
    //myMap.addLayer(markers);

  });
});
//Grab the data with d3 for COVID Cases Markers
function caseFunction() {
  d3.selectAll(".deathCircles").remove();

  d3.json(url).then(function (response) {
    // Create a new marker cluster group
    //var markers1 = L.markerClusterGroup();

    // Loop through data
    response.forEach(function (data) {
      //Add a new marker to the cluster group and bind a pop-up
      //markers.addLayer(L.marker([data.lat, data.long]).bindPopup(data.covid_deaths));
      // }
      // markers1.addLayer(L.marker(
      //   L.latLng(
      //     [parseFloat(data.lat),
      //     parseFloat(data.long)])
      // ));

      covidCases = data.covid_cases;
      popStayingHome = data.pop_at_home;
      popNotHome = data.pop_not_at_home;
      trips = data.trips;
      covidDeaths = data.covid_deaths;
      lat = parseFloat(data.lat);
      long = parseFloat(data.long);

      // Add our marker cluster layer to the map
      //myMap.addLayer(markers1);

      var circle1 = L.circle([lat, long], {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        radius: covidCases / 20,
        className: "caseCircles"
      }).addTo(myMap);
    });
  });
}
//Grab the data with d3 for COVID Death
function deathFunction() {
  d3.selectAll(".caseCircles").remove();

  d3.json(url).then(function (response) {
    // Create a new marker cluster group
    //var markers2 = L.markerClusterGroup();
    // Loop through data
    response.forEach(function (data) {

      // markers2.addLayer(L.marker(
      //   L.latLng(
      //     [parseFloat(data.lat),
      //     parseFloat(data.long)])
      // ));

      covidCases = data.covid_cases;
      popStayingHome = data.pop_at_home;
      popNotHome = data.pop_not_at_home;
      trips = data.trips;
      covidDeaths = data.covid_deaths;
      lat = parseFloat(data.lat);
      long = parseFloat(data.long);

      // Add our marker cluster layer to the map
      //myMap.addLayer(markers2);

      var circle = L.circle([lat, long], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: covidDeaths,
        className: "deathCircles"
      }).addTo(myMap);
    });

  });
}


