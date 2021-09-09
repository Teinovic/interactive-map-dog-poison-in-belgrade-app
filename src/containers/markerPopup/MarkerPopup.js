import MarkerPopup from "../../components/markerPopup";
import React, {useState, useEffect} from "react";
import axios from "axios";

export default function MarkerPopupContainer(props) {
    console.log(props, 'props')

    const [dogPoisonCoordToDelete, setDogPoisonCoordToDelete] = useState('')

    useEffect(() => {
        if (dogPoisonCoordToDelete) {       
            axios.delete('http://127.0.0.1:8000/interactivemap/api/interactivemap/', {data: {
                coordinates: (dogPoisonCoordToDelete.join(', ')),
                type_of_poison: 'rat_poison',
                cleared: false}})
        }}, [dogPoisonCoordToDelete])

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
                onClick={() => {setDogPoisonCoordToDelete(props.currentMarkerCoord);
                                // props.setToggle(false)
                                }
                        } 
                
            >
                Delete
            </MarkerPopup.DeleteButton>
        </MarkerPopup>
    )
}