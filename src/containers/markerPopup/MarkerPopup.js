import MarkerPopup from "../../components/markerPopup";
import React, {useEffect} from "react";
import axios from "axios";

export default function MarkerPopupContainer(props) {
    // console.log(props, 'props')
    let display = 'block'

    useEffect(() => {
        if (props.dogPoisonCoordConfirmed) {
          axios.post('http://127.0.0.1:8000/interactivemap/api/interactivemap/', {
            coordinates: (props.dogPoisonCoordConfirmed[0].join(', ')),
            type_of_poison: 'rat_poison',
            cleared: false
          })};
      }, [props.dogPoisonCoordConfirmed])

    return (
        <MarkerPopup style={{display: display}}>
            <MarkerPopup.Coord>1234</MarkerPopup.Coord>
            <MarkerPopup.PoisonInput />
            <MarkerPopup.ConfirmationButton
                onClick={() => props.setDogPoisonCoordConfirmed(coord => {
                    // console.log('dpcoord', props.dogPoisonCoord)
                    return [props.dogPoisonCoord[0], ...coord]
                })}
            >
                confirm
            </MarkerPopup.ConfirmationButton>
            <MarkerPopup.CancelButton
                onClick={() => {props.setDogPoisonCoord(coord => {
                                    coord.shift()
                                    return coord
                                    });              
                                return display = 'none'}
                }
            >
                cancel
            </MarkerPopup.CancelButton>
        </MarkerPopup>
    )
}