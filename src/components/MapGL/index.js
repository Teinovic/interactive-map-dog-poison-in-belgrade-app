import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react';
import MapGL, {Marker} from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import Coordinates from '../coordinates'
import axios from 'axios';

const MAPBOX_TOKEN =  'pk.eyJ1IjoibW9taXIiLCJhIjoiY2tzcWxmb3ZtMGR4cjJ2bzM0bjM5ZG5lNyJ9.QT_n1D2H-nL1RxhbcyycRA'

export default function Map({ children, ...restProps }) {
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
    
      

    useEffect(() => {
      if (dogPoisonCoord) {
        axios.post('http://127.0.0.1:8000/interactivemap/api/interactivemap/', {
          coordinates: (dogPoisonCoord[0][0], dogPoisonCoord[0][1]),
          type_of_poison: 'rat_poison',
          cleared: false
        })};
    }, [dogPoisonCoord])
    
    return (
        <MapGL
            ref={mapRef}       
            {...viewport}
            width="50vw"
            height="50vh"
            mapStyle="mapbox://styles/momir/cksreww3122s318o53of6nu8c"
            onViewportChange={setViewport}
            mapboxApiAccessToken={MAPBOX_TOKEN} 
            onClick={e => setDogPoisonCoord(coord => {
                console.log('dpcoord', dogPoisonCoord)
                return [e.lngLat, ...coord]
            })}
            onMouseMove={(e) => {
                return setCurrentCoord(e.lngLat[0].toFixed(4) + " " + e.lngLat[1].toFixed(4));
            }}
        >
            {dogPoisonCoord && 
            <Marker  
                longitude={dogPoisonCoord[0][0]} 
                latitude={dogPoisonCoord[0][1]} 
                offsetLeft={-20} 
                offsetTop={-10}
                onClick={() => alert(`hello`)}
            >
                <img src="pin.png" style={{width: 20, height: 33, cursor: 'pointer'}} />
            </Marker>}
            <Coordinates>
                {currentCoord}
                {/* {dogPoisonCoord} */}
              {JSON.stringify(dbState)}
            </Coordinates>
            {/* <Geocoder
                placeholder="Search here!"
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                position="top-left"
            /> */}
        </MapGL>
        )
}