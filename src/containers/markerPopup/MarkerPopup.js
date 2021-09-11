import MarkerPopup from "../../components/markerPopup";
import React, {useState, useEffect} from "react";
import axios from "axios";

export default function MarkerPopupContainer(props) {

    const [dogPoisonCoordToDelete, setDogPoisonCoordToDelete] = useState('')
    const [dbState, setDbState] = useState('')

    async function fetchData() {
        
        const res = await fetch('http://127.0.0.1:8000/interactivemap/api/interactivemap/');
        const coordArray = await res.json();
        console.log(coordArray)
        setDbState(coordArray)
        if (dogPoisonCoordToDelete){
            const found = dbState.find(element => element.coordinates === dogPoisonCoordToDelete)
            axios.delete(`http://127.0.0.1:8000/interactivemap/api/interactivemap/${found.id}`)
        }
    }
      useEffect(() => {
        fetchData()
      }, [dogPoisonCoordToDelete])


    // useEffect(() => {
    //     if (dogPoisonCoordToDelete) {       
    //         axios.delete(`http://127.0.0.1:8000/interactivemap/api/interactivemap/?coordinates=${dogPoisonCoordToDelete}`)
    //         }}, 
    //         [dogPoisonCoordToDelete])

    return (
        <MarkerPopup visibility={props.visibility}>
            <MarkerPopup.Coord>1234</MarkerPopup.Coord>
            <MarkerPopup.PoisonInput />
            <MarkerPopup.ConfirmationButton
                onClick={() => {props.setDogPoisonCoordConfirmed(coord => {
                    // console.log('dpcoord', props.dogPoisonCoord)
                                    return [props.dogPoisonCoord[0], ...coord]
                                }); 
                                    // props.setToggle(false)
                                }}
            >
                confirm
            </MarkerPopup.ConfirmationButton>
            <MarkerPopup.CancelButton
                onClick={() => {props.setDogPoisonCoord(coord => {
                                    coord.shift()
                                    return coord
                                    });              
                                props.setToggle(false)}
                }
            >
                cancel
            </MarkerPopup.CancelButton>
            <MarkerPopup.DeleteButton
                onClick={() => {setDogPoisonCoordToDelete(props.currentMarkerCoord.join(', '));
                                // props.setToggle(false)
                                console.log(dogPoisonCoordToDelete, 'wuuut')
                                }
                        } 
                
            >
                Delete
            </MarkerPopup.DeleteButton>
        </MarkerPopup>
    )
}