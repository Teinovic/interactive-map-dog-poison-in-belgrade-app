import MarkerPopup from "../../components/markerPopup";

export default function MarkerPopupContainer() {
    return (
        <MarkerPopup>
            <MarkerPopup.Coord>1234</MarkerPopup.Coord>
            <MarkerPopup.PoisonInput />
            <MarkerPopup.ConfirmationButton>confirm</MarkerPopup.ConfirmationButton>
            <MarkerPopup.CancelButton>cancel</MarkerPopup.CancelButton>
        </MarkerPopup>
    )
}