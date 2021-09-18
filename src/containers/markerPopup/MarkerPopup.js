import MarkerPopup from "../../components/markerPopup";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { connect } from 'react-redux'

function MarkerPopupContainer(props) {

    const [dogPoisonCoordToDelete, setDogPoisonCoordToDelete] = useState('')

    const handlePoisonTypeInput = e => {
      props.setTypeOfPoison(e.target.value)
    }


    async function deleteCoordFromDB() {        
        const res = await fetch('http://127.0.0.1:8000/interactivemap/api/interactivemap/');
        const coordArray = await res.json();
        if (dogPoisonCoordToDelete){
            console.log(dogPoisonCoordToDelete, 'dogpoisoncoordtodelete')
            const found = await coordArray.find(element => element.coordinates === dogPoisonCoordToDelete)
            found && axios.delete(`http://127.0.0.1:8000/interactivemap/api/interactivemap/${found.id}`)
        }
    }
    useEffect(() => {
        deleteCoordFromDB()
    }, [dogPoisonCoordToDelete])

    const handleCleared = () => {
        props.setCleared(!props.cleared);
    };



    return (
        <MarkerPopup visibility={props.visibility}>
            <p>Coordinates:</p>
            <MarkerPopup.Img src="pin.png" style={{width: 20, height: 33, cursor: 'pointer'}}/>
            <MarkerPopup.Coord>
                {props.currentMarkerCoord[0].toFixed(4) + 'E, ' + props.currentMarkerCoord[1].toFixed(4) +'N'}
            </MarkerPopup.Coord>
            <MarkerPopup.PoisonInput value={props.typeOfPoison} onChange={handlePoisonTypeInput}/>
            <br />
            <p>
                Cleared? 
                <MarkerPopup.PoisonInput 
                    type="checkbox"
                    onChange={handleCleared}
                />
            </p>
            <MarkerPopup.ConfirmationButton
                onClick={() => {props.setDogPoisonCoordConfirmed(coord => {
                                console.log('dpcoord', props.dogPoisonCoord)
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

const mapStateToProps = (state) => {
    console.log(state, 'woohoo')

    return state
}

export default connect(mapStateToProps)(MarkerPopupContainer) 