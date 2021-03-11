const layers = {
  countyOutline: {
    id: "county-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "county",
    paint: {
      "line-width": 2.5,
      "line-color": "#505a5e",
    },
    filter: ["==", "dvrpc", "Yes"],
  },
  muniOutline: {
    id: "municipality-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "municipalities",
    paint: {
      "line-width": 0.5,
      "line-color": "#4a5c64",
    },
  },
  links: {
    id: "links",
    type: "line",
    source: "lts_tool",
    "source-layer": "links",
    paint: {
      "line-width": 1,
      "line-color": "#FFFFFF",
      "line-dasharray": [2, 4],
    },
  },
  islandsHighlighted: {
    id: "islands-highlighted",
    type: "line",
    source: "lts_tool",
    "source-layer": "islands",
    paint: {
      "line-width": 20,
      "line-color": "yellow",
      "line-opacity": 0.8,
    },
    filter: ["in", "island_id", ""],
  },
  islands: {
    id: "islands",
    type: "line",
    source: "lts_tool",
    "source-layer": "islands",
    paint: {
      "line-color": ["get", "rgb"],
      "line-width": 10,
    },
  },
  islandsSelected: {
    id: "islands-selected",
    type: "line",
    source: "lts_tool",
    "source-layer": "islands",
    paint: {
      "line-color": ["get", "rgb"],
      "line-width": 8,
    },
    filter: ["in", "island_id", ""],
  },
  linksHighlighted: {
    id: "links-highlighted",
    type: "line",
    source: "lts_tool",
    "source-layer": "links",
    paint: {
      "line-width": 10,
      "line-color": "cyan",
      "line-opacity": 0.5,
    },
    filter: ["in", "gid", ""],
  },
};

const paint_props = {
  islands: {
    id: "islands",
    prop: "line-width",
    style: ["interpolate", ["exponential", 0.5], ["zoom"], 10, 0.75, 17, 4],
  },
};

export { layers, paint_props };
