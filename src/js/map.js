import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

mapboxgl.accessToken =
  "pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA";

const initMap = () => {
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    center: [-75.2273, 40.071],
    bounds: [
      [-76.09405517578125, 39.49211914385648],
      [-74.32525634765625, 40.614734298694216],
    ],
  });
};

const makeRegionalExtentControl = (map) => {
  // coordinates and zoom level for regional extent
  const dvrpcExtent = {
    center: [-75.142241, 40.0518322],
    zoom: 8.25,
  };

  const navigationControl = new mapboxgl.NavigationControl();

  // create custom button elements
  const button = document.createElement("button");
  const icon = document.createElement("img");

  button.type = "button";
  icon.id = "regional-extent-img";
  icon.alt = "DVRPC Alternative Logo";
  icon.src = "https://www.dvrpc.org/img/banner/new/bug-favicon.png";

  button.classList.add("mapboxgl-ctrl-icon");
  button.classList.add("mapboxgl-ctrl-dvrpc");

  button.setAttribute("aria-label", "Default DVRPC Extent");

  button.onclick = () =>
    map.flyTo({ center: dvrpcExtent.center, zoom: dvrpcExtent.zoom });

  button.appendChild(icon);

  // plug into mapbox fncs
  navigationControl._extent = button;
  navigationControl._container.appendChild(button);

  return navigationControl;
};

const makeMap = () => {
  const map = initMap();
  const control = makeRegionalExtentControl(map);

  map.addControl(control, "top-left");

  var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
  });
  map.addControl(draw);

  return map;
};

export default makeMap;