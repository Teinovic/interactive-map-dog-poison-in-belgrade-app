
/* global document */
import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibW9taXIiLCJhIjoiY2tzcWxmb3ZtMGR4cjJ2bzM0bjM5ZG5lNyJ9.QT_n1D2H-nL1RxhbcyycRA'; // Set your mapbox token here

function Root() {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    />
  );
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));