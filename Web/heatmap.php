<?php
session_start();
include("connect.php");
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CMOA Collection Heatmap</title>
    <style>
      /* to have the map be displayed as large as possible */
      html, body, #map-canvas {
        height: 100%;
        margin: 0px;
        padding: 0px
      }
    </style>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization"></script>
    <script>
var map, pointarray, heatmap;
 
// a shortened version of the data for Google's taxi example
var taxiData = [
  new google.maps.LatLng(-77.849459, 166.667795),
//Coordinates here
];
 
 
function initialize() {
  // the map's options
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(0,0),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
 
  // the map and where to place it
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
 
  var pointArray = new google.maps.MVCArray(taxiData);
 
  // what data for the heatmap and how to display it
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    radius: 25
  });
 
  // placing the heatmap on the map
  heatmap.setMap(map);
}
 
// as soon as the document is ready the map is initialized
google.maps.event.addDomListener(window, 'load', initialize);
 
    </script>
  </head>
 
  <body>
    <!-- this is where the map finally is drawn onto -->
    <div id="map-canvas"></div>
  </body>
</html>