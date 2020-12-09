// Creating map object
var myMap = L.map("map", {
  center: [39.5, -98.35],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var link = "static/data/tx_county.geojson";

var url = "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson?where=(Confirmed%20%3E%200)%20AND%20Province_State%20%3D%20'Texas'"

var choroplethLayer;

// Grab data with d3
d3.json(link).then(function (data) {

  // Create a new choropleth layer
  choroplethLayer = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "aland",

    // Set color scale
    //scale: ["#ffffb2", "#b10026"],
    scale: ["white", "black"],

    // Number of breaks in step range
    steps: 10,

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
      layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Population Staying Home:<br>" +
        "$" + feature.properties.MHI2016);
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
    div.innerHTML = "<h1>Number of Trips</h1>" +
      "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    // limits.forEach(function (limit, index) {
    //   labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    // });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});

var choroplethData;

// Grab the data with d3
d3.json(url).then(function (response) {

  console.log("here");
  choroplethData = response;

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  console.log(response);
  // Loop through data
  response.features.forEach(function (data) {
    console.log(data);
    var location = data.geometry;

    console.log(data.properties.Confirmed);

    // Check for location property
    if (location) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(data.properties.Confirmed));
    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
    // markers.addTo(myMap); <- This also works.
  });
});
