import MarkerPopup from "../../components/markerPopup";
import React, {useState, useEffect} from "react";
import axios from "axios";

export default function MarkerPopupContainer(props) {
    console.log(props, 'props')
    
    const [dogPoisonCoordConfirmed, setDogPoisonCoordConfirmed] = useState('')

    useEffect(() => {
        if (dogPoisonCoordConfirmed) {
          axios.post('http://127.0.0.1:8000/interactivemap/api/interactivemap/', {
            coordinates: (dogPoisonCoordConfirmed[0].join(', ')),
            type_of_poison: 'rat_poison',
            cleared: false
          })};
      }, [dogPoisonCoordConfirmed])

    return (
        <MarkerPopup>
            <MarkerPopup.Coord>1234</MarkerPopup.Coord>
            <MarkerPopup.PoisonInput />
            <MarkerPopup.ConfirmationButton
                onClick={e => setDogPoisonCoordConfirmed(coord => {
                    console.log('dpcoord', props.dogPoisonCoord)
                    return [props.dogPoisonCoord[0], ...coord]
                })}
            >
                confirm
            </MarkerPopup.ConfirmationButton>
            <MarkerPopup.CancelButton>cancel</MarkerPopup.CancelButton>
        </MarkerPopup>
    )
}