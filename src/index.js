
/* global document */
import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { render } from 'react-dom';
import MapGL, {Marker} from 'react-map-gl';
import App from './App';
import Geocoder from "react-map-gl-geocoder";
import Coordinates from './components/coordinates';
import MarkerContainer from './components/marker';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibW9taXIiLCJhIjoiY2tzcWxmb3ZtMGR4cjJ2bzM0bjM5ZG5lNyJ9.QT_n1D2H-nL1RxhbcyycRA'; // Set your mapbox token here



function Root() {
  const [viewport, setViewport] = useState({
    latitude: 44.8125,
    longitude: 20.4612,
    zoom: 12,
    bearing: 0,
    pitch: 0
  });
  
  const [dogPoisonCoord, setDogPoisonCoord] = useState('')
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
  
  const [dbState, setDbState] = useState([])

  async function fetchData() {
    const res = await fetch('http://127.0.0.1:8000/interactivemap/api/interactivemap/');
    const coordArray = await res.json();
    console.log(coordArray)
    setDbState(coordArray)
    console.log(dbState)
  }

  useEffect(() => {
    fetchData()
  }, [])


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
          console.log(dogPoisonCoord)
          return [e.lngLat, ...coord]
        })}
        onMouseMove={(e) => {
          return setCurrentCoord(e.lngLat[0].toFixed(4) + " " + e.lngLat[1].toFixed(4));
        }}
      >
        {dogPoisonCoord ? 
        <Marker latitude={dogPoisonCoord[0][1]} longitude={dogPoisonCoord[0][0]} offsetLeft={-20} offsetTop={-10}>
          <div>HERE</div>
        </Marker> : console.log('wutface')}
        <Coordinates>
          {currentCoord}
          {dogPoisonCoord}
          {/* {JSON.stringify(dbState)} */}
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