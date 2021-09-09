import { Container, Coord, Input, ConfirmationButton, CancelButton, DeleteButton } from './styles/markerPopup'

export default function MarkerPopup({ children, ...restProps }) {
    console.log(restProps)
    return (
        <Container { ...restProps }>{ children }</Container>
    )
}

MarkerPopup.Coord = function CoordText({ children, ...restProps }) {
    return (
        <Coord { ...restProps }>{ children }</Coord>
    )
}

MarkerPopup.PoisonInput = function InputField({ children, ...restProps }) {
    return (
        <Input { ...restProps }>{ children }</Input>
    )
}

MarkerPopup.ConfirmationButton = function Button({ children, ...restProps }) {
    return (
        <ConfirmationButton { ...restProps }>{ children }</ConfirmationButton>
    )
}

MarkerPopup.CancelButton = function Button({ children, ...restProps }) {
    return (
        <CancelButton { ...restProps }>{ children }</CancelButton>
    )
}

MarkerPopup.DeleteButton = function Button({ children, ...restProps }) {
    return (
        <DeleteButton { ...restProps }>{ children }</DeleteButton>
    )
}