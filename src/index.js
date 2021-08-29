
/* global document */
import * as React from 'react';
import { useState, useRef, forwardRef,useCallback } from 'react';
import { render } from 'react-dom';
import MapGL, {Marker, LngLat} from 'react-map-gl';
import App from './App';
import Geocoder from "react-map-gl-geocoder";
import Coordinates from './components/coordinates';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibW9taXIiLCJhIjoiY2tzcWxmb3ZtMGR4cjJ2bzM0bjM5ZG5lNyJ9.QT_n1D2H-nL1RxhbcyycRA'; // Set your mapbox token here



function Root() {
  const [viewport, setViewport] = useState({
    latitude: 44.8125,
    longitude: 20.4612,
    zoom: 12,
    bearing: 0,
    pitch: 0
  });
  
  const [dogPoisonCoord, setDogPoisonCoord] = useState([])
  const [currentCoord, setCurrentCoord] = useState('')
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "100vh" }}>
      <App />
      <MapGL
        ref={mapRef}       
        {...viewport}
        width="50vw"
        height="50vh"
        mapStyle="mapbox://styles/momir/cksreww3122s318o53of6nu8c"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN} 
        onClick={e => setDogPoisonCoord(coord => {
          console.log('clicked')
          return [e.lngLat, ...coord]
        })}
        onMouseMove={(e) => {
          return setCurrentCoord(e.lngLat[0].toFixed(4) + " " + e.lngLat[1].toFixed(4));
        }}
      >
        <Coordinates>
          {currentCoord}
          {dogPoisonCoord}
        </Coordinates>
        <Geocoder
          placeholder="Search here!"
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </MapGL>
    </div>
  );
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));