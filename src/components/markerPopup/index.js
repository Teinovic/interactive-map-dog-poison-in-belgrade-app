import {} from './styles/markerPopup'

export default function MarkerPopup({ children, ...restProps }) {
    return (
        <Container { ...restProps }>{ children }</Container>
    )
}

MarkerPopup.Span = function MarkerSpan({ children, ...restProps }) {
    return (
        <Span { ...restProps }>{ children }</Span>
    )
}