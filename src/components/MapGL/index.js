import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react';
import MapGL, {Marker, Popup} from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import Coordinates from '../coordinates'
import axios from 'axios';
import MarkerPopupContainer from '../../containers/markerPopup/MarkerPopup';

const MAPBOX_TOKEN =  'pk.eyJ1IjoibW9taXIiLCJhIjoiY2tzcWxmb3ZtMGR4cjJ2bzM0bjM5ZG5lNyJ9.QT_n1D2H-nL1RxhbcyycRA'

export default function Map({ children, ...restProps }) {
    const [viewport, setViewport] = useState({
        latitude: 44.8125,
        longitude: 20.4612,
        zoom: 12,
        bearing: 0,
        pitch: 0
      });

      const [toggle, setToggle] = useState(true)
      const [dogPoisonCoord, setDogPoisonCoord] = useState('')
      const [dogPoisonCoordConfirmed, setDogPoisonCoordConfirmed] = useState('')
      const [currentCoord, setCurrentCoord] = useState('')
      const [currentMarkerCoord, setCurrentMarkerCoord] = useState('')
      const mapRef = useRef();
      const [typeOfPoison, setTypeOfPoison] = useState('')
      const [cleared, setCleared] = useState('')
      const [dbState, setDbState] = useState([])
      const [popup, togglePopup] = useState(false)

      let found = dbState.find(element => element.id === popup)

      const coordListElements = dbState.map(item => {
        let [coord1, coord2] = item.coordinates.split(',')
        coord1 = Number(coord1)
        coord2 = Number(coord2)

        return (
          <Marker  
            longitude={coord1} 
            latitude={coord2} 
            offsetLeft={-20} 
            offsetTop={-10}
            
          >
            <img 
              src="pin.png" style={{width: 20, height: 33, cursor: 'pointer'}}
              onClick={() => togglePopup(item.id)}   
            />
          </Marker>
          )
        }
      )

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
      
    
      async function fetchData() {
        const res = await fetch('http://127.0.0.1:8000/interactivemap/api/interactivemap/');
        const coordArray = await res.json();
        setDbState(coordArray)
        console.log(dbState)
      }
    
      useEffect(() => {
        fetchData()
      }, [])
    
      

    useEffect(() => {
      if (dogPoisonCoordConfirmed) {
        axios.post('http://127.0.0.1:8000/interactivemap/api/interactivemap/', {
          coordinates: (dogPoisonCoordConfirmed[0].join(', ')),
          type_of_poison: typeOfPoison ? typeOfPoison : 'unknown',
          cleared: cleared ? cleared : false
        })};
    }, [dogPoisonCoordConfirmed])
    
    return (
        <MapGL
            ref={mapRef}       
            {...viewport}
            width="70vw"
            height="70vh"
            mapStyle="mapbox://styles/momir/cksreww3122s318o53of6nu8c"
            onViewportChange={setViewport}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onClick={e => 
              {setDogPoisonCoord(coord => [e.lngLat, ...coord]);
              setCurrentMarkerCoord(e.lngLat);
              setToggle(true)}
          }
            onMouseMove={(e) => {
                return setCurrentCoord(e.lngLat[0].toFixed(4) + " " + e.lngLat[1].toFixed(4));
            }}
        >
            {coordListElements}
            {/* {console.log(Number(dbState[popup].coordinates.slice(0, 17)))} */}
            {popup && <Popup
                    longitude={Number(found.coordinates.slice(0, 17))}
                    latitude={Number(found.coordinates.slice(20))}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => togglePopup(false)}
                    anchor="top" >
                    <p>{found.coordinates}</p>
                    <p>{found.type_of_poison}</p>
                    <p>{found.cleared}</p>
                    
            </Popup>}
            {currentMarkerCoord && 
            <Marker  
                longitude={currentMarkerCoord[0]} 
                latitude={currentMarkerCoord[1]} 
                offsetLeft={-20} 
                offsetTop={-10}

            >
                {/* <img 
                  src="pin.png" style={{width: 20, height: 33, cursor: 'pointer'}}   
                /> */}
                <MarkerPopupContainer
                  visibility={toggle}
                  setToggle={setToggle} 
                  dogPoisonCoord={dogPoisonCoord}
                  setDogPoisonCoord={setDogPoisonCoord}
                  dogPoisonCoordConfirmed={dogPoisonCoordConfirmed}
                  setDogPoisonCoordConfirmed={setDogPoisonCoordConfirmed}
                  currentMarkerCoord={currentMarkerCoord}
                  setCurrentMarkerCoord={setCurrentMarkerCoord}
                  typeOfPoison={typeOfPoison}
                  setTypeOfPoison={setTypeOfPoison}
                  cleared={cleared}
                  setCleared={setCleared}
                />
            </Marker>}
            <Coordinates>
                {currentCoord}
                {/* {dogPoisonCoord} */}
              {/* {JSON.stringify(dbState)} */}
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