import "./css/main.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import logo from "./img/DVRPC-logo.png";

const logoSpot = document.querySelector("#mpo-logo");
const img = document.createElement("img");
img.src = logo;
logoSpot.append(img);

console.log("test123");

// import Vue from "vue";
// import mapboxgl from "mapbox-gl";
// import MapboxDraw from "@mapbox/mapbox-gl-draw";

// console.log("F yeah");

// const heading = document.createElement("h1");
// heading.textContent = "This is from index.js";

// const app = document.querySelector("#root");
// app.prepend(heading);

// var vueapp = new Vue({
//   el: "#vueapp",
//   data: {
//     message: "This comes from __VUE123456",
//   },
// });

// vueapp.message = "this shit is dynamic";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA";
// var map = new mapboxgl.Map({
//   container: "map", // container ID
//   style: "mapbox://styles/mapbox/dark-v10", // style URL
//   center: [-74.5, 40], // starting position [lng, lat]
//   zoom: 9, // starting zoom
// });
// var Draw = new MapboxDraw({
//   displayControlsDefault: false,
//   controls: {
//     polygon: true,
//     trash: true,
//   },
// });
// map.addControl(Draw, "top-right");

import makeMap from "./js/map.js";
import sources from "./js/mapSources.js";
import { layers, paint_props } from "./js/mapLayers.js";
import handleModal from "./js/modal.js";
// add additional imports here (popups, forms, etc)

const modal = document.getElementById("modal");
const modalToggle = document.getElementById("modal-toggle");
const closeModal = document.getElementById("close-modal");
// get additional elements here (forms, etc)

// map
const map = makeMap();

map.on("load", () => {
  var base_layers = map.getStyle().layers;
  var firstSymbolId;
  for (var i = 0; i < base_layers.length; i++) {
    if (base_layers[i].type === "symbol") {
      firstSymbolId = base_layers[i].id;
      break;
    }
  }

  for (const source in sources) map.addSource(source, sources[source]);
  for (const layer in layers) map.addLayer(layers[layer], firstSymbolId);
  for (const p in paint_props)
    map.setPaintProperty(
      paint_props[p].id,
      paint_props[p].prop,
      paint_props[p].style
    );

  // add map events here (click, mousemove, etc)
  map.on("draw.create", function (e) {
    // Spinner.show();

    var userPolygon = e.features[0];

    // generate bounding box from polygon the user drew
    var polygonBoundingBox = turf.bbox(userPolygon);

    var southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
    var northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];

    var northEastPointPixel = map.project(northEast);
    var southWestPointPixel = map.project(southWest);

    var features = map.queryRenderedFeatures(
      [southWestPointPixel, northEastPointPixel],
      { layers: ["links"] }
    );

    let id_values = [];
    var filter = features.reduce(
      function (memo, feature) {
        if (turf.booleanWithin(turf.centroid(feature), userPolygon)) {
          // only add the property, if the feature intersects with the polygon drawn by the user

          id_values.push(feature.properties.gid);
          memo.push(feature.properties.gid);
        }
        return memo;
      },
      ["in", "gid"]
    );

    map.setFilter("links-highlighted", filter);

    // let url = "http://127.0.0.1:8000/island-merge/?";
    let url = "https://lts-fastapi-c8pjh.ondigitalocean.app/island-merge/?";
    for (var i = 0; i < id_values.length; i++) {
      if (i > 0) {
        url += "&";
      }
      url += "q=" + id_values[i];
    }

    fetch(url).then(function (response) {
      response.text().then(function (text) {
        let data = JSON.parse(text);
        var island_filter = data.id_list.reduce(
          function (memo, feature) {
            memo.push(feature);
            return memo;
          },
          ["in", "island_id"]
        );
        // alert(island_filter);
        map.setFilter("islands-highlighted", island_filter);
        map.setFilter("islands-selected", island_filter);

        // Spinner.hide();
      });
    });
  });
});

// modal
handleModal(modal, modalToggle, closeModal);
