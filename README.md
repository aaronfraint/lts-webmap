# lts-webmap

Web mapping application that consumes vector tile data and FastAPI endpoints.

## Local development

Install the dependencies with `npm install`

Serve the source files with `npm start`

## Depolyment 

Build with `npm run build`

Webpack 5 was set up following an [excellent tutorial](https://www.taniarascia.com/how-to-use-webpack/) and a good amount of trial and error. The build command writes to the `/docs/` folder, which allows for hosting via GitHub Pages.

## To do
- [ ] break development and production configurations apart
- [ ] troubleshoot `turf` installation via `npm` - this currently is loaded via CDN

## Libraries

- `mapbox-gl` provides mapping functionality
- `mapbox-gl-draw` allows users to draw on the map
- `turf` provides geospatial operations in the browser
- `vue` is installed but not used at this point
- `deck-gl` is not yet installed, but will be used in the future
